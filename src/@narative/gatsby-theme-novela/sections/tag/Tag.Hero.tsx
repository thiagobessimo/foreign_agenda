import React, { useContext } from 'react';
import styled from "@emotion/styled";

import Icons from '@icons';
import mediaqueries from "@styles/media";
import { ITag } from "@types";

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

interface TagHeroProps {
  tag: ITag;
}

const TagHero: React.FC<TagHeroProps> = ({ tag }) => {
  return (
  <HeroContainer>
    <Hero>
      <Heading>{tag.name}</Heading>
    </Hero>
    <GridButtons />
  </HeroContainer>
  );
};

export default TagHero;

const HeroContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 0px 0px ;

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

const Hero = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  max-height: 10%;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  margin: 0px 0px ;
  bottom: -32px;
  left: -4.5px;
`;

const Heading = styled.h1`
  font-size: 84px;
  font-weight: 800;
  justify-content: left;
  font-family: ${p => p.theme.fonts.sansSerif};
  color: ${p => p.theme.colors.primary};
  margin-bottom: 5px;

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

const GridControlsContainer = styled.div`
  display: flex;
  width: 100px;
  margin:0px 0px 0px 0px;
  justify-content: space-between;
  align-items: right;

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
