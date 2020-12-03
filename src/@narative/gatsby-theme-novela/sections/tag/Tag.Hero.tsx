import React from 'react';
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";
import { ITag } from "@types";

import ThemeButton from "@components/ThemeButton";
import GridButtons from "@components/GridButtons";

interface TagHeroProps {
  tag: ITag;
}

const TagHero: React.FC<TagHeroProps> = ({ tag }) => {
  return (
  <HeroContainer>
    <Hero>
      <Heading>{tag.name}</Heading>
    </Hero>
    <ControlContainer>
      <ThemeButton />
      <GridButtons />
    </ControlContainer>
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
  bottom: -24px;
  left: -4.5px;
`;

const Heading = styled.h1`
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 84px;
  font-weight: 800;
  line-height: 1.2;
  justify-content: left;
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
