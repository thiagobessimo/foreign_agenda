import React from 'react';
import styled from '@emotion/styled';

import Icons from '@icons';
import mediaqueries from '@styles/media';
import { useColorMode } from "theme-ui";

interface SocialLinksProps {
  links: {
    name: string;
    url: string;
  }[];
  fill: string;
}

const icons = {
  behance: Icons.Behance,
  dribbble: Icons.Dribbble,
  linkedin: Icons.LinkedIn,
  twitter: Icons.Twitter,
  facebook: Icons.Facebook,
  instagram: Icons.Instagram,
  devto: Icons.DevTo,
  github: Icons.Github,
  stackoverflow: Icons.Stackoverflow,
  youtube: Icons.YouTube,
  medium: Icons.Medium,
  notion: Icons.Notion,
  unsplash: Icons.Unsplash,
  patreon: Icons.Patreon,
  paypal: Icons.Paypal,
  digitalocean: Icons.DigitalOcean,
  tripadvisor: Icons.TripAdvisor,
  buymeacoffee: Icons.Buymeacoffee,
  mailto: Icons.Mailto,
  url: Icons.Url
};

const getHostname = url => {
  return new URL(url.toLowerCase()).hostname.replace(/www|com|net|\.so|org|[.-]/g, '').split('.')[0];
};

const getServicename = url => {
  return url.toLowerCase().split(':')[0];
};

const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
}) => {

  const [colorMode] = useColorMode();
  // const fill = colorMode === "dark" ? "#fdfdfd" : "#000510";
  function fill(input) {
      var inputMap = {
        "light": "#000510",
        "dark": "#fdfdfd",
        "sky": "#2080ff",
        "ocean": "#fdfdfd"
      };

      return inputMap[input];
  }

  if (!links) return null;

  return (
    <>
      {links.map(option => {
        const name = option.name || getHostname(option.url) || getServicename(option.url);
        const Icon = icons[name] ? icons[name] : icons['url'];
        if (!Icon) {
          throw new Error(
            `unsupported social link name=${name} / url=${option.url}`,
          );
        }
        return (
          <SocialIconContainer
            key={option.url}
            target="_blank"
            rel="noopener nofollow"
            data-a11y="false"
            aria-label={`Link to ${option.url}`}
            href={option.url}
          >
            <Icon fill={fill(colorMode)}  />
            <Hidden>Link to ${option.url}</Hidden>
          </SocialIconContainer>
        );
      })}
    </>
  );
};

export default SocialLinks;

const SocialIconContainer = styled.a`
  position: relative;
  margin: 0px 20px;
  text-decoration: none;
  max-width: 16px;

  &:hover {
    svg {
      &:hover * {
        fill: ${p => p.theme.colors.primary};
        opacity: 0.6;
      }
      * {
        transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9);
      }
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  ${mediaqueries.tablet`
    margin: 0 2.2rem;
  `};
`;

const Hidden = styled.span`
  width: 0px;
  height: 0px;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  display: inline-block;
`;
