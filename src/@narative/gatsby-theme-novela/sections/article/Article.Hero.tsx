import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle, IAuthor, ITag } from '@types';

import ArticleAuthors from './Article.Authors';
import ArticleTags from './Article.Tags';

interface ArticleHeroProps {
  article: IArticle;
  authors: IAuthor[];
  tags: ITag[];
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article, authors, tags }) => {
  const hasCoAUthors = authors.length > 1;
  const hasCoTAgs = tags.length > 1;
  const hasHeroImage =
    article.hero &&
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;
  const heroImageClass = !hasHeroImage ? "no-hero" : "";

  return (
    <Hero>
      <Header>
        <HeroSubtitleTags hasCoTAgs={hasCoTAgs}>
          <ArticleTags tags={tags} />
        </HeroSubtitleTags>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroExcerpt>{article.excerpt}</HeroExcerpt>
        <div>
          <HeroSubtitleAuthors hasCoAUthors={hasCoAUthors}>
            <ArticleAuthors authors={authors} /> {article.date} · {article.timeToRead} min read
          </HeroSubtitleAuthors>
        </div>
      </Header>
      <HeroImage id="ArticleImage__Hero">
      </HeroImage>
      {/* <HeroImage
        id="ArticleImage__Hero"
        className={hasHeroImage ? "" : "no-hero"}
      >
        <Image src={article.hero.full} />
      </HeroImage> */}
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  ${p => mediaqueries.phablet`
    &::before {
      content: "";
      width: 100%;
      height: 20px;
      background: ${p.theme.colors.primary};
      position: absolute;
      left: 0;
      top: 0;
      transition: ${p.theme.colorModeTransition};
    }

    &::after {
      content: "";
      width: 100%;
      height: 10px;
      background: ${p.theme.colors.background};
      position: absolute;
      left: 0;
      top: 10px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      transition: ${p.theme.colorModeTransition};
    }
  `}
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin:150px auto 200px;
  padding-left: 0px;
  max-width: 800px;

  ${mediaqueries.desktop`
    padding-left: 0px;
    max-width: calc(507px + 53px);
    margin: 100px auto 70px;
  `}

  ${mediaqueries.tablet`
    padding-left: 0;
    margin: 100px auto 70px;
    max-width: 480px;
  `}

  ${mediaqueries.phablet`
    margin: 170px auto 180px;
    padding: 0 40px;
  `}

  @media screen and (max-height: 700px) {
    margin: 100px auto;
  }
`;

const HeroHeading = styled(Headings.h1)`
  font-size: 68px;
  font-family: ${p => p.theme.fonts.sansSerif};
  padding: 0xp 0px 25px;
  font-weight: 800;
  line-height: 1.2;

  ${mediaqueries.desktop`
    font-size: 54px;
  `}
  ${mediaqueries.tablet`
    font-size: 42px;
  `}
  ${mediaqueries.phablet`
    font-size: 42px;
  `}
  ${mediaqueries.phone`
    font-size: 42px;
  `}
`;

const HeroExcerpt = styled(Headings.h1)`
  font-size: 24px;
  font-family: ${p => p.theme.fonts.sansSerif};
  padding: 25px 0px;
  font-weight: 400;
  line-height: 1.2;

  ${mediaqueries.desktop`
    font-size: 24px;
  `}
  ${mediaqueries.tablet`
    font-size: 24px;
  `}
  ${mediaqueries.phablet`
    font-size: 24px;
  `}
  ${mediaqueries.phone`
    font-size: 18px;
  `}
`;

const HeroSubtitleTags = styled.div<{ hasCoTAgs: boolean }>`
  position: relative;
  display: flex;
  font-size: 24px;
  font-weight: 400;
  padding: 0px 0px 10px;
  color: ${p => p.theme.colors.primary};

  ${p => mediaqueries.phablet`
    font-size: 18px;
    font-weight: 400;
    flex-direction: column;

    ${p.hasCoTAgs &&
      `
        &::before {
          content: '';
          position: absolute;
        }
    `}


    strong {
      display: block;
      font-weight: 600;
      margin-bottom: 5px;
    }
  `}
`;

const HeroSubtitleAuthors = styled.div<{ hasCoAUthors: boolean }>`
  position: relative;
  display: flex;
  font-size: 18px;
  font-weight: 800;
  padding: 10px 0px 0px;
  color: ${p => p.theme.colors.primary};

  ${p => mediaqueries.phablet`
    font-size: 16px;
    flex-direction: column;

    ${p.hasCoAUthors &&
      `
        &::before {
          content: '';
          position: absolute;
        }
    `}


    strong {
      display: block;
      font-weight: 400;
      margin-bottom: 5px;
    }
  `}
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 800px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 100px;
  box-shadow: 0 30px 60px -10px #00000000,
    0 18px 36px -18px #00000000;

  ${mediaqueries.tablet`
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto;
    width: calc(100vw - 40px);
    height: 220px;

    & > div {
      height: 220px;
    }
`}
`;
