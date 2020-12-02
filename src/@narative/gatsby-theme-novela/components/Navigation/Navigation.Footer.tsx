import React from "react";
import styled from "@emotion/styled";
import { graphql, useStaticQuery, Link } from "gatsby";

import Section from "@components/Section";
import SocialLinks from "@components/SocialLinks";
import Substack from "@components/Substack";

import mediaqueries from "@styles/media";

const footerLinks = [
  { to: '/privacy', text: 'Privacy' },
  { to: '/contact', text: 'Contact' },
]

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            siteUrl
            name
            social {
              url
              name
            }
            footer {
              copyright
            }
          }
        }
      }
    }
    allMdx(
      sort: { fields: frontmatter___date, order: ASC }
      filter: { frontmatter: { date: { ne: null } } }
    ) {
      edges {
        node {
          frontmatter {
            date
          }
        }
      }
    }
  }
`;

const Footer: React.FC<{}> = () => {
  const results = useStaticQuery(siteQuery);
  const { name, social } = results.allSite.edges[0].node.siteMetadata;

  const copyrightDate = (() => {
    const { edges } = results.allMdx;
    const years = [0, edges.length - 1].map((edge) =>
      new Date(edges[edge].node.frontmatter.date).getFullYear()
    );
    return years[0] === years[1] ? `${years[0]}` : `${years[0]}–${years[1]}`;
  })();

  return (
    <>
      <FooterGradient />
      <Section narrow>
        <SubstackDivider>Newsletter</SubstackDivider>
        <FooterContainer>
          <Left>
            <SubstackContainer>
              <Substack />
            </SubstackContainer>
          </Left>
          <Center>
           <SocialIconsFooter>
              <SocialLinks links={social} />
            </SocialIconsFooter>
          </Center>
          {/* <CopyrightContainer>
            © {copyrightDate} {name}
          </CopyrightContainer> */}
          <Right>
            <Menu>
              {footerLinks.map(link => {
                return (
                  <FooterLink
                    key={link.to}
                    to={link.to}
                  >
                    {link.text}
                  </FooterLink>
                )
              })}
            </Menu>
          </Right>
        </FooterContainer>
      </Section>
    </>
  );
};

export default Footer;

const FooterContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.colors.grey};

  ${mediaqueries.tablet`
  flex-direction: column;
  // padding-bottom: 100px;
  `}

  ${mediaqueries.phablet`
  // padding-bottom: 50px;
  `}
`;

const FooterGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 590px;
  z-index: 0;
  pointer-events: none;
  background: ${(p) => p.theme.colors.gradient};
  transition: ${(p) => p.theme.colorModeTransition};
`;

const SubstackDivider = styled.h3`
  position: relative;
  opacity: 1;
  margin: 50px auto 0px;
  align-items: left;
  text-align: left;
  font-size: 18px;
  font-weight: 800;
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.tablet`
    margin-bottom: 0px;
  `}

  &::after {
    content: '';
    position: absolute;
    background: ${p => p.theme.colors.horizontalRule};
    width: ${(1020 / 1140) * 100}%;
    height: 1px;
    right: 0;
    top: 11px;

    ${mediaqueries.desktop`
      width: ${(970 / 1140) * 100}%;
    `}

    ${mediaqueries.tablet`
      width: ${(820 / 1140) * 100}%;
    `}

    ${mediaqueries.phone`
      width: ${(720 / 1140) * 100}%;
    `}
  }
`;

const Left = styled.div`
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

const Center = styled.div`
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

const SocialIconsFooter = styled.div`
  display: flex;
  align-items: center;
  margin: 0px;

  ${mediaqueries.tablet`
    margin: 0 auto;
  `}
`;

const CopyrightContainer = styled.div`
  display: flex;
  align-items: right;
  font-weight: 600;
  font-size: 18px;
  color: ${(p) => p.theme.colors.primary};

  ${mediaqueries.tablet`
    display: none;
  `}
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 50px;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `}
`

const FooterLink = styled(Link)`
  position: relative;
  font-weight: 600;
  font-size: 18px;
  text-align: left;
  font-family: ${p => p.theme.fonts.sansSerif};
  color: ${(p) => p.theme.colors.primary};
  transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9);

  &:hover {
    opacity: 0.6;
  }

  &:not(:last-child) {
    margin-right: 60px;
  }

  ${mediaqueries.desktop`
    &:not(:last-child) {
      margin-right: 25px;
    }
  `};

  ${mediaqueries.tablet`
    opacity: 1;
    font-weight: 600;
    font-size: 24px;

    &:hover {
      opacity: 1;
    }

    &:not(:last-child) {
      margin: 0 auto 35px;
    }
  `}
`;

const SubstackContainer = styled.div`
  position: relative;
  left: -10px;
  top: 10px;
  text-align: center;
  width: ${(900 / 1140) * 100}%;
  transition: background 0.2s linear;

  ${mediaqueries.tablet`
    left: -25px;
  `}

  ${mediaqueries.phone`
    left: -25px;
  `}
`;