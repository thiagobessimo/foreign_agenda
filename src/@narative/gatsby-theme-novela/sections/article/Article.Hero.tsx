import React from 'react'
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect'

import Headings from '@components/Headings';
import Heading from '@components/Headings'
import IntersectionObserver from '@components/IntersectionObserver'
import Section from '@components/Section'
import ScrollIndicator from '@components/ScrollIndicator'
import ThemeButton from '@components/ThemeButton'

import mediaqueries from '@styles/media'
import { IArticle, IAuthor, ITag } from '@types';

import ArticleAuthors from './Article.Authors';
import ArticleTags from './Article.Tags';

// Based on a condition will animate or not. A workaround for media queries
const inlineAnimate = (cond: boolean) => (obj: any) => (cond ? obj : {})

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
    <IntersectionObserver
      render={({
        boundingClientRect: { height },
        visiblePercentage,
      }: {
        boundingClientRect: { height: number }
        visiblePercentage: number
      }) => {
        // If it's mobile don't animate since it's janky and doesn't add much value
        const canAnimate = inlineAnimate(height > 0 && !isMobile)
        const headerOffset = canAnimate({
          transform: `translateY(${(100 - visiblePercentage) * 1.33}px)`,
          opacity: 1 - ((100 - visiblePercentage) / 100) * 1.66,
        })

        return (
          <Hero>
            <HeroContent>
              <Section>
                <Header style={headerOffset}>
                  <HeroSubtitleTags hasCoTAgs={hasCoTAgs}>
                    <ArticleTags tags={tags} />
                  </HeroSubtitleTags>
                  <HeroTitle>{article.title}</HeroTitle>
                  <HeroExcerpt>{article.excerpt}</HeroExcerpt>
                  <HeroSubtitleAuthors hasCoAUthors={hasCoAUthors}>
                    <ArticleAuthors authors={authors} /> &nbsp;· {article.date} · {article.timeToRead} min read ·&nbsp;<ThemeButton />
                  </HeroSubtitleAuthors>
                </Header>
              </Section>
            </HeroContent>
            <Image
              id="ArticleImage__Hero"
              className={hasHeroImage ? "" : "no-hero"}
              >
              <Image src={article.hero.full} />
            </Image>
            <Image id="ArticleImage__Hero">
            </Image>
          </Hero>
        )
      }}
    />
  )
}

export default ArticleHero

const Hero = styled.div`
  position: relative;
  z-index: 5;
  min-height: 600px;
  height: calc(100vh - 100px);
  width: 100vw;
  display: flex;
  overflow: hidden;

  ${mediaqueries.tablet`
    min-height: 100vh;
  `}
`

const HeroContent = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  top: -100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${mediaqueries.tablet`
    min-height: 100vh;
    margin-top: 10px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background: ${p => p.theme.colors.background};
  `}
`

const Header = styled.header`
  max-width: 680px;
  margin: 0 auto;

  ${mediaqueries.tablet`
    max-width: 480px;
  `}
`

const HeroTitle = styled(Heading.h1)`
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 68px;
  font-weight: 800;
  line-height: 1.2;
  padding: 0xp;
  color: ${p => p.theme.colors.articleText};

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
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 24px;
  font-weight: 600;
  line-height: 1.618;
  padding: 10px 0px;
  color: ${p => p.theme.colors.articleText};

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
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 32px;
  font-weight: 400;
  line-height: 1.618;
  padding: 0px 0px 5px;
  color: ${p => p.theme.colors.primary};

  ${p => mediaqueries.phablet`
    font-size: 18px;
    font-weight: 400;
    flex-direction: column;

    ${p.hasCoTAgs &&
      `
        &::before {
          content:'';
          position: absolute;
        }
    `}
  `}
`;

const HeroSubtitleAuthors = styled.div<{ hasCoAUthors: boolean }>`
  position: relative;
  display: flex;
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 18px;
  font-weight: 600;
  line-height: 1.618;
  padding: 5px 0px 0px;
  color: ${p => p.theme.colors.primary};

  ${p => mediaqueries.phablet`
    font-size: 16px;
    flex-direction: column;

    ${p.hasCoAUthors &&
      `
        &::before {
          content:'';
          position: absolute;
        }
    `}
  `}
`;

const Image = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    right: -40%;
    overflow: visible;
}

  & > div {
    top: 50%;
    transform: translateY(-50%);
    overflow: visible;
    height: 100%;

    img {
      object-position: left center !important;
    }
  }

  ${mediaqueries.tablet`
    display: none;
  `}
`