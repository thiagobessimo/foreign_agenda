import React from 'react';
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";
import { IAuthor } from "@types";

import ThemeButton from "@components/ThemeButton";
import GridButtons from "@components/GridButtons";
import Image from "@components/Image";
import SocialLinks from "@components/SocialLinks";

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
        <ControlContainer>
          <ThemeButton />
          <GridButtons />
        </ControlContainer>
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
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 84px;
  font-weight: 800;
  line-height: 1.2;
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
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 18px;
  font-weight: 400;
  line-height: 1.618;
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