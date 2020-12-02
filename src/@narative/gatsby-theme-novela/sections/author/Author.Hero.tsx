import React, { useContext } from 'react';
import styled from "@emotion/styled";

import Icons from '@icons';
import mediaqueries from "@styles/media";
import { IAuthor } from "@types";

import Image from "@components/Image";
import SocialLinks from "@components/SocialLinks";

import { GridLayoutContext } from "../articles/Articles.List.Context";

const GridButtons: React.FC = () => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext,
  );

  const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles';
  return(
        <GridControlsContainer>
          <GridButton
            onClick={() => setGridLayout('tiles')}
            active={tilesIsActive}
            data-a11y="false"
            title="Show articles in Tile grid"
            aria-label="Show articles in Tile grid"
          >
            <Icons.Tiles />
          </GridButton>
          <GridButton
            onClick={() => setGridLayout('rows')}
            active={!tilesIsActive}
            data-a11y="false"
            title="Show articles in Row grid"
            aria-label="Show articles in Row grid"
          >
            <Icons.Rows />
          </GridButton>
        </GridControlsContainer>
  )
};

interface AuthorHeroProps {
  author: IAuthor;
}

const AuthorHero: React.FC<AuthorHeroProps> = ({ author }) => {
  return (
    <Hero>
      <HeroImage>
        <RoundedImage src={author.avatar.large} />
      </HeroImage>
      <Heading>{author.name}</Heading>
      <Social>
        <SocialLinks links={author.social} />
      </Social>
      <BioContainer>
        <Subheading> {author.bio} </Subheading>
        <GridButtons />
      </BioContainer>
    </Hero>
  );
};

export default AuthorHero;

const Hero = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  margin: 75px auto 25px;

  ${mediaqueries.desktop`
    margin: 50px auto 0px;
  `}

  ${mediaqueries.tablet`
    margin: 50px auto 0px;
  `}

  ${mediaqueries.phablet`
    margin: 50px auto 0px;
  `}
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  height: 180px;
  width: 180px;
  margin-bottom: 20px;
  border-radius: 50%;
  overflow: hidden;
  border: 1.5px solid ${p => p.theme.colors.primary};
  box-shadow: 0px 15px 30px #00000000;
  max-width: 1200px;

  ${mediaqueries.tablet`
    width: 146px;
    height: 146px;
  `}

  ${mediaqueries.phablet`
    width: 136px;
    height: 136px;
    margin-bottom: 25px;
  `}
`;

const RoundedImage = styled(Image)`
  border-radius: 50%;
  height: 100%;
  width: 100%;
`;

const Heading = styled.h1`
  font-size: 84px;
  font-weight: 800;
  font-family: ${p => p.theme.fonts.sansSerif};
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.tablet`
    font-size: 32px;
    font-weight: 800;
    margin: 0px 5px 15px;
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
    font-weight: 800;
    margin: 0px 5px 15px;
  `}
`;

const Subheading = styled.p`
  max-width: 500px;
  color: ${p => p.theme.colors.grey};
  font-size: 18px;
  font-family: ${p => p.theme.fonts.sansSerif};
  line-height: 1.4;
  text-align: left;

  ${mediaqueries.tablet`
    font-size: 16px;
    font-weight: 400;
  `};

  ${mediaqueries.phablet`
    font-size: 16px;
    font-weight: 400;
  `};
`;

const Social = styled.div`
  display: flex;
  align-items: left;
  margin-top: 5px;

  ${mediaqueries.tablet`
    margin: 10px 10% 20px 10%;
    transform: scale(1.2);
  `}

  ${mediaqueries.phablet`
    margin: 10px 10% 20px 10%;
    transform: scale(1.2);
  `}
`;

const BioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 0px;

  ${mediaqueries.desktop`
    margin: 0px 5px 15px;
  `};

  ${mediaqueries.tablet`
    margin: 0px 5px 15px;
  `};

  ${mediaqueries.phablet`
    margin: 0px 5px 15px;
  `};
`;

const GridControlsContainer = styled.div`
  display: flex;
  width: 100px;
  margin:0px 0px 0px 0px;
  justify-content: space-between;
  align-items: center;

  ${mediaqueries.tablet`
    display: none;
  `};
`;

const GridButton = styled.button<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: transparent;
  transition: opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);

  &:hover {
    opacity: 0.6;
  }

  &:not(:last-child) {
    margin-right: 30px;
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg {
    opacity: ${p => (p.active ? 1 : 0.25)};
    transition: opacity 0.2s;

    path {
      fill: ${p => p.theme.colors.primary};
    }
  }
`;