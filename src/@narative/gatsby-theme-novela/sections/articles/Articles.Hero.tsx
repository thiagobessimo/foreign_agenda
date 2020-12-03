import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import ThemeButton from "@components/ThemeButton";
import GridButtons from "@components/GridButtons";
import Section from '@components/Section';
import Bio from "@components/Bio";

import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              heading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const ArticlesHero: React.FC<IAuthor> = ({ authors }) => {

  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  const featuredAuthor = authors.find(author => author.featured);

  if (!featuredAuthor) {
    throw new Error(`
      No featured Author found.
      Please ensure you have at least featured Author.
  `);
  }

  return (
    <Section relative id="Articles__Hero">
      {/* <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: hero.heading }} />
      </HeadingContainer> */}
      <SubheadingContainer>
        <Bio author={featuredAuthor} />
        <ControlContainer>
          <ThemeButton />
          <GridButtons />
        </ControlContainer>
      </SubheadingContainer>
    </Section>
  );
};

export default ArticlesHero;

const HeadingContainer = styled.div`
  padding: 50px 0px;

  ${mediaqueries.desktop`
    width: 80%;
  `}

  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 800;
  font-size: 68px;
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 84px
  `}

  ${mediaqueries.phablet`
    font-size: 68px;
  `}
`;

const SubheadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 0px ;

  ${mediaqueries.desktop`
    margin-bottom: 0px;
  `};

  ${mediaqueries.tablet`
    margin-bottom: 0px;
  `};

  ${mediaqueries.phablet`
    display: none;
  `};
`;

const ControlContainer = styled.div`
  display: flex;
  width: 175px;
  margin:0px 0px 0px 0px;
  justify-content: space-between;
  align-items: center;

  ${mediaqueries.tablet`
    display: none;
  `};
`;
