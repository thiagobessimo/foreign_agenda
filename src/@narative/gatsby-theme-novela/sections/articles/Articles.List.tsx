import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link, navigate } from "gatsby";

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle } from '@types';

import { GridLayoutContext } from './Articles.List.Context';

/**
 * Tiles
 * [LONG], [SHORT], [SHORT]
 * [MEDIUM], [MEDIUM], [MEDIUM]
 * [MEDIUM], [MEDIUM], [MEDIUM]
 *
 * or ------------
 *
 * Rows
 * [LONG]
 * [LONG]
 * [LONG]
 */

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
}

interface ArticlesListItemProps {
  article: IArticle[];
  narrow?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails,
}) => {
  if (!articles) return null;

  const hasOnlyOneArticle = articles.length === 1;
  const { gridLayout = 'tiles', hasSetGridLayout, getGridLayout } = useContext(
    GridLayoutContext,
  );

  /**
   * We're taking the flat array of articles [{}, {}, {}...]
   * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
   * This makes it simpler to create the grid we want
   */
  const articlePairs = articles.reduce((result, value, index, array) => {
    if (index % 3 === 0) {
      result.push(array.slice(index, index + 3));
    }
    return result;
  }, []);

  useEffect(() => getGridLayout(), []);

  return (
    <ArticlesListContainer
      style={{ opacity: hasSetGridLayout ? 1 : 0 }}
      alwaysShowAllDetails={alwaysShowAllDetails}
    >
      {articlePairs.map((ap, index) => {
        const isHead = index == 0;
        const isRest = index !== 0;

        return (
          <List
            key={index}
            gridLayout={gridLayout}
            hasOnlyOneArticle={hasOnlyOneArticle}
            reverse={isHead}
          >
            <Col1>
              <ListItem article={ap[0]} narrow={isHead} />
              <ListItem article={ap[3]} narrow={isRest} />
            </Col1>
            <Col2>
              <ListItem article={ap[1]} narrow={isRest} />
              <ListItem article={ap[4]} narrow={isRest} />
            </Col2>
            <Col3>
              <ListItem article={ap[2]} narrow={isRest} />
              <ListItem article={ap[5]} narrow={isRest} />
            </Col3>
          </List>
        );
      })}
    </ArticlesListContainer>
  );
};

export default ArticlesList;

const ListItem: React.FC<ArticlesListItemProps> = ({ article, narrow }) => {
  if (!article) return null;

  const { gridLayout } = useContext(GridLayoutContext);
  const hasOverflow = narrow && article.title.length > 80;
  const imageSource = narrow ? article.hero.narrow : article.hero.regular;
  const hasHeroImage =
    imageSource &&
    Object.keys(imageSource).length !== 0 &&
    imageSource.constructor === Object;

  const navigateToTag = (e: React.SyntheticEvent<any>, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
        <ListContainer>
          <ArticleLink to={article.slug} data-a11y="false">
            <Item gridLayout={gridLayout}>
              <ImageContainer narrow={narrow} gridLayout={gridLayout}>
                {hasHeroImage ? <Image src={imageSource} /> : <ImagePlaceholder />}
              </ImageContainer>
                <div>
                  <MetaData>
                    {article.tag}
                  </MetaData>
                  <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
                    {article.title}
                  </Title>
                  <Excerpt
                    narrow={narrow}
                    hasOverflow={hasOverflow}
                    gridLayout={gridLayout}
                  >
                    {article.excerpt}
                  </Excerpt>
                  <MetaData>
                    {article.date} · {article.author}
                  </MetaData>
                </div>
              </Item>
            </ArticleLink>
          </ListContainer>
  );
};

const Col1 = styled.div`
  display: grid;
`;

const Col2 = styled.div`
  display: grid;
`;

const Col3 = styled.div`
  display: grid;
`;

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.desktop`
    -webkit-line-clamp: 4;
  `}

  ${mediaqueries.tablet`
    -webkit-line-clamp: 4;
  `}

  ${mediaqueries.phablet`
    -webkit-line-clamp: 4;
  `}
`;

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  ${p => p.alwaysShowAllDetails && showDetails}
`;

const wide = '50%';
const narrow = '1fr';

const listTile = p => css`
  position: relative;
  display: grid;
  justify-content: space-around;
  grid-template-columns: ${p.reverse
    ? `${wide} ${narrow} ${narrow}`
    : `${narrow} ${narrow} ${narrow}`};
  grid-template-rows: 105%;
  grid-column-gap: 30px;
  margin: 0px 0px 0px 0px;

  &:not(:last-child) {
    margin-bottom: 0px;
  }

  ${mediaqueries.desktop_medium`
    grid-template-columns: 1fr 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    max-height: 120%;
    grid-template-rows: 1fr;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}

    ${mediaqueries.phablet`
    grid-template-columns: 1fr;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const listItemRow = p => css`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 30% 1fr;
  grid-column-gap: 50px;
  align-items: center;
  margin: 0px 0px 0px 0px;

  ${mediaqueries.desktop`
    grid-column-gap: 24px;
    grid-template-columns: 30% 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}
`;

const listItemTile = p => css`
  position: relative;

  ${mediaqueries.tablet`
    margin: 0px 0px 20px;
  `}

  @media (max-width: 540px) {
    background: ${p.theme.colors.card};
  }

  ${mediaqueries.phablet`
    margin: 0px 0px 20px;
    box-shadow: 0px 20px 40px #00000000;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  `}
`;

// If only 1 article, dont create 2 rows.
const listRow = p => css`
  display: grid;
  grid-template-rows: ${p.hasOnlyOneArticle ? '1fr' : '1fr 1fr'};
`;

const List = styled.div<{
  reverse: boolean;
  gridLayout: string;
  hasOnlyOneArticle: boolean;
}>`
  ${p => (p.gridLayout === 'tiles' ? listTile : listRow)}
`;

const Item = styled.div<{ gridLayout: string }>`
  ${p => (p.gridLayout === 'rows' ? listItemRow : listItemTile)}
`;

const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  position: relative;
  height: ${p => (p.gridLayout === 'tiles' ? '280px' : '200px')};
  box-shadow: 0 30px 60px -10px #00052000,
    0 18px 36px -18px #00052000;
  margin-bottom: ${p => (p.gridLayout === 'tiles' ? '10px' : '0px')};
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  ${mediaqueries.desktop`
    height: 175px;
    margin-bottom: 0px;
  `}

  ${mediaqueries.tablet`
    height: 200px;
    margin-bottom: 0px;
  `}

  ${mediaqueries.phablet`
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  `}
`;

const Title = styled(Headings.h2)`
  font-size: 24px;
  font-weight: 800;
  line-height: 1.2;
  color: ${p => p.theme.colors.primary};
  font-family: ${p => p.theme.fonts.sansSerif};
  padding: ${p =>
    p.hasOverflow && p.gridLayout === 'tiles' ? '5px' : '5px'} 0px;
  transition: color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);
  ${limitToTwoLines};

  ${mediaqueries.desktop`
    display: -webkit-box;
    font-weight: 800;
    font-size: 24px;
    max-width: 100%;
  `}

  ${mediaqueries.tablet`
    padding: 0px 0px 5px;
    font-weight: 800;
    font-size: 24px;
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    padding: 0px 20px 5px;
    font-weight: 800;
    font-size: 24px;
    max-width: 100%;
  `}
`;

const Excerpt = styled(Headings.h2)<{
  gridLayout: string;
}>`
  ${limitToTwoLines};
  font-weight: 400;
  font-size: 18px;
  padding-top: 5px;
  color: ${p => p.theme.colors.secondary};
  max-width: ${p => (p.gridLayout === 'tiles' ? '100%' : '80%')};
  transition: color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);

  ${mediaqueries.desktop`
    display: -webkit-box;
    font-weight: 400;
    font-size: 16px;
    max-width: 100%;
  `}

  ${mediaqueries.tablet`
    padding: 5px 0px 0px;
    font-weight: 400;
    font-size: 14px;
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    padding: 5px 20px 0px;
    font-weight: 400;
    font-size: 14px;
    max-width: 100%;
  `}
`;

const MetaData = styled(Headings.h2)`
  font-weight: 400;
  font-size: 16px;
  padding-top: 10px;
  color: ${p => p.theme.colors.secondary};
  transition: color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);

  ${mediaqueries.desktop`
    display: -webkit-box;
    font-weight: 400;
    font-size: 14px;
    max-width: 100%;
  `}

  ${mediaqueries.tablet`
    padding: 10px 0px;
    font-weight: 400;
    font-size: 14px;
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    padding: 10px 20px;
    font-weight: 400;
    font-size: 14px;
    max-width: 100%;
  `}
`;

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  transition: color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${ImageContainer}, &:focus ${ImageContainer} {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.27),
      0 18px 36px -18px rgba(0, 0, 0, 0.3);
  }

  &:hover h2,
  &:focus h2 {
    color: ${p => p.theme.colors.primary};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -2%;
    top: -2%;
    width: 104%;
    height: 104%;
    border: 1px solid ${p => p.theme.colors.primary};
    background: rgba(255, 255, 255, 0.01);
  }

  ${mediaqueries.tablet`
    margin-bottom: 10px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  `}

  ${mediaqueries.phablet`
    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;

const ListContainer = styled.div`
  position: relative;
  margin: 50px 0px 20px 0px;
`