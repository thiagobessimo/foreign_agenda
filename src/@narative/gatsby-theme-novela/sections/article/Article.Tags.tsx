import React, { useState } from "react";
import styled from "@emotion/styled";
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from "gatsby";

import mediaqueries from "@styles/media";
import { ITag } from "@types";

/**
 * When generating the tag names we're also checking to see how long the
 * number of tags are. If it's only 2 tags we'll show the fullnames.
 * Otherwise it'll only preview the first names of each tag.
 */
function generateTagNames(tags: ITag[]) {
  return tags
    .map(tag => {
      return tag.name;
    })
    .join("");
}

interface TagsProps {
  tags: ITag[]
}

const CoTags: React.FC<TagsProps> = ({ tags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const names = generateTagNames(tags);

  return (
    <CoTagsContainer onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
      <NameContainer>{names}</NameContainer>

      {isOpen && (
        <OutsideClickHandler onOutsideClick={() => setIsOpen(!isOpen)}>
          <CoTagsListOpen>
            {tags.map(tag => (
              <CoTagsListItemOpen key={tag.name}>
                <TagLink
                  as={tag.tagsPage ? Link : "div"}
                  to={tag.slug}
                >
                  <TagNameOpen>{tag.name}</TagNameOpen>
                </TagLink>
              </CoTagsListItemOpen>
            ))}
          </CoTagsListOpen>
        </OutsideClickHandler>
      )}
    </CoTagsContainer>
  );
};

/**
 * Novela supports multiple tags and therefore we need to ensure
 * we render the right UI when there are varying amount of tags.
 */
const ArticleTags: React.FC<TagsProps> = ({ tags }) => {
  const hasCoTags = tags.length > 1;

  // Special dropdown UI for multiple tags
  if (hasCoTags) {
    return <CoTags tags={tags} />;
  } else {
    return (
      <TagLink
        as={tags[0].tagsPage ? Link : "div"}
        to={tags[0].slug}
      >
        <strong>{tags[0].name}</strong>
        <HideOnMobile>,&nbsp;</HideOnMobile>
      </TagLink>
    );
  }
};

export default ArticleTags;

const TagLink = styled.div`
  display: flex;
  align-items: center;
  color: inherit;

  strong {
    transition: ${p => p.theme.colorModeTransition} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);
  }

  &:hover strong {
    color: ${p => p.theme.colors.primary};
  }
`;

const CoTagsListOpen = styled.ul`
  position: absolute;
  z-index: 2;
  left: -21px;
  right: -21px;
  top: -19px;
  padding: 10px;
  background: ${p => p.theme.colors.background};
  border: 1px solid ${p => p.theme.colors.primary};
  border-radius: 0px;
  cursor: pointer;
  list-style: none;
  transform: translateY(-2px);
`;

const CoTagsListItemOpen = styled.li`
  a {
    width: 100%;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const NameContainer = styled.strong`
  position: relative;
  max-width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 800;
  cursor: pointer;

  &::before {
    color: ${p => p.theme.colors.primary};
    transition: color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);
  }

  &:hover::before {
    color: ${p => p.theme.colors.secondary};
  }

  ${mediaqueries.desktop`
    font-weight: 800;
  `}

  ${mediaqueries.tablet`
    font-weight: 800;
  `}

  ${mediaqueries.phablet`
    font-weight: 800;
  `}

  ${mediaqueries.phone`
    font-weight: 800;
  `}
`;

const TagNameOpen = styled.strong`
  position: relative;
  cursor: pointer;
  color: ${p => p.theme.colors.secondary};
  font-weight: 800;
    ${mediaqueries.desktop`
    font-weight: 800;
  `}

  ${mediaqueries.phablet`
    font-weight: 800;
  `}
`;

const CoTagsContainer = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 800;
  color: ${p => p.theme.colors.primary};
  cursor: pointer;
  margin-right: 15px;
  transition: color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);

  &::before {
    content: "";
    position: absolute;
    left: -10px;
    right: -10px;
    top: -10px;
    bottom: -10px;
    background: ${p => p.theme.colors.background};
    border: 1px solid ${p => p.theme.colors.secondary};
    color: ${p => p.theme.colors.primary};
    border-radius: 0px;
    z-index: 0;
    transition: color 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);
    cursor: pointer;
    opacity: 0;
  }

  &:hover::before {
    color: ${p => p.theme.colors.primary};
    opacity: 1;
  }

  ${mediaqueries.phablet`
    font-size: 16px;
    align-items: center;
    font-weight: 800;
  `}
`;

const HideOnMobile = styled.span`
  ${mediaqueries.phablet`
    display: none;
  `}
`;
