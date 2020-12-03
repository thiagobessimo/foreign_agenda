import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Link } from "gatsby";

import Headings from "@components/Headings";
import Image from "@components/Image";

import mediaqueries from "@styles/media";

import { IArticle } from "@types";

interface ArticlesNextProps {
  articles: IArticle[]
}

/**
 * Sits at the bottom of our Article page. Shows the next 2 on desktop and the
 * next 1 on mobile!
 *
 *  [..............], [.........]
 *  [.....LONG.....], [..SHORT..]
 *  [..............], [.........]
 *
 * This does NOT use Articles.List because there's a special case of only have 1 article
 * as the next one suggested article, which requires special styling we didn't want to
 * mix into the generic list component.
 */
const ArticlesNext: React.FC<ArticlesNextProps> = ({ articles }) => {
  if (!articles) return null;
  const numberOfArticles = articles.length;
  return (
    <Grid numberOfArticles={numberOfArticles}>
      <GridItem article={articles[0]} />
      <GridItem article={articles[1]} narrow />
    </Grid>
  );
};

export default ArticlesNext;

interface GridItemProps {
  article: IArticle;
  narrow?: boolean;
}

const GridItem: React.FC<GridItemProps> = ({ article, narrow }) => {
  if (!article) return null;

  const hasOverflow = narrow && article.title.length > 80;
  const imageSource = narrow ? article.hero.narrow : article.hero.regular;

  return (
    <ArticleLink to={article.slug} data-a11y="false">
        <ImageContainer>
          <Image src={imageSource} />
        </ImageContainer>
          <div>
            <MetaData>
              {article.tag}
            </MetaData>
            <Title dark hasOverflow={hasOverflow}>
              {article.title}
            </Title>
            <Excerpt
              narrow={narrow}
              hasOverflow={hasOverflow}
            >
              {article.excerpt}
            </Excerpt>
            <MetaData>
              {article.date} · {article.author}
            </MetaData>
          </div>
    </ArticleLink>
  );
};

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

const wide = "1fr";

const Grid = styled.div<{ numberOfArticles: number }>`
  position: relative;
  display: grid;
  ${p => {
    if (p.numberOfArticles === 1) {
      return `
      grid-template-columns: 1fr;
      grid-template-rows: 105%;
      grid-column-gap: 30px;
      margin: 0px 0px 0px 0px;
    `;
    } else {
      return `
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 30px;
      margin: 0px 0px 0px 0px;
      `;
    }
  }}
  column-gap: 30px;
  margin: 0px;
  max-width: ${p => (p.numberOfArticles === 1 ? "680px" : "100%")};

  ${mediaqueries.desktop`
    grid-template-columns: 1fr 1fr;
  `}

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    max-height: 120%;
    grid-template-rows: 1fr;
    grid-row-gap: 30px;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  `}

    ${mediaqueries.phablet`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-row-gap: 30px;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  `}

    ${mediaqueries.phone`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-row-gap: 30px;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  `}
`;

const ImageContainer = styled.div`
  position: relative;
  height: 250px;
  box-shadow: 0 30px 60px -10px #00052000,
    0 18px 36px -18px #00052000;
  margin-bottom: ${p => (p.gridLayout === 'tiles' ? '10px' : 0)};
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
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 24px;
  font-weight: 800;
  line-height: 1.618;
  color: ${p => p.theme.colors.primary};
  padding: ${p =>
    p.hasOverflow && p.gridLayout === 'tiles' ? '0px' : '0px'} 0px 5px;
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
}>`
  ${limitToTwoLines};
  font-weight: 400;
  font-size: 18px;
  padding: 0px;
  color: ${p => p.theme.colors.secondary};
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
  padding: 5px 0px;
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
    margin-bottom: 25px;
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