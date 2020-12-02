import React from "react";
import styled from "@emotion/styled";
import { Link, graphql } from "gatsby";
import { useColorMode } from "theme-ui";

import Logo from "@components/Logo";
import Section from "@components/Section";
import ThemeButton from "@components/ThemeButton";

import mediaqueries from "@styles/media";

const headerLinks = [
  { to: '/tags/foreign-policy', text: 'Foreign Policy' },
  { to: '/tags/international-security', text: "Int'l Security" },
  { to: '/tags/data-visualisation', text: 'Data Viz' },
  { to: '/tags/china', text: 'China 中国' },
]

const NavigationHeader: React.FC<{}> = () => {

  const [colorMode] = useColorMode();
  function fill(input) {
      var inputMap = {
        "light": "#000510",
        "dark": "#fdfdfd",
        "sky": "#2080ff",
        "ocean": "#fdfdfd"
      };

      return inputMap[input];
  }

  return (
    <Section>
      <HeaderContainer>
        <Left>
          <Logo fill={fill(colorMode)} />
        </Left>
        <Center>
        </Center>
        <Right>
          <Menu>
            {headerLinks.map(link => {
              return (
                <HeaderLink
                  key={link.to}
                  to={link.to}
                >
                  {link.text}
                </HeaderLink>
              )
            })}
            <NavControls>
              <ThemeButton />
            </NavControls>
          </Menu>
        </Right>
      </HeaderContainer>
    </Section>
  );
};

export default NavigationHeader;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  padding: 40px 0px 40px;

  ${mediaqueries.tablet`
  flex-direction: column;
  padding: 40px 0px 10px;
  `}

  ${mediaqueries.phablet`
  padding: 40px 0px 10px;
  `}
`;

const Left = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0px;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `}
`;

const Center = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0px;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `}
`;

const Right = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 50px;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `}
`;

const NavControls = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `}
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `}
`

const HeaderLink = styled(Link)`
  position: relative;
  font-weight: 600;
  font-size: 18px;
  text-align: left;
  color: ${(p) => p.theme.colors.primary};
  transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9);

  &:hover {
    opacity: 0.6;
  }

  &:not(:last-child) {
    margin-right: 40px;
  }

  ${mediaqueries.desktop`
    &:not(:last-child) {
      margin-right: 25px;
    }
  `};

  ${mediaqueries.tablet`
    font-weight: 600;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    &:hover {
      opacity: 1;
    }

    &:not(:last-child) {
      margin: 0 auto 30px;
    }
  `}

  ${mediaqueries.phablet`
    width: 100%;
  `}
`;
