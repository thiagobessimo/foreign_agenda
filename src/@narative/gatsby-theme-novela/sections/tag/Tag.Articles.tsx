import React from 'react';
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";
import { IArticle } from "@types";

import ArticlesList from "../articles/Articles.List";

interface TagArticlesProps {
  articles: IArticle[];
}

const TagArticles: React.FC<TagArticlesProps> = ({ articles }) => {
  return (
      <div>
        <TagArticlesContainer>
          <ArticlesList articles={articles} alwaysShowAllDetails />
        </TagArticlesContainer>
      </div>
  );
};

export default TagArticles;

const TagArticlesContainer = styled.div`
  background: ${p => p.theme.colors.card} 0%,
  border-radius: 0px;
  border: 1px solid ${p => p.theme.colors.primary};
  padding: 0px 45px 20px;
  position: relative;
  z-index: 1;

  ${mediaqueries.desktop_medium`
    padding: 0px;
    border: 0px;
  `}

  ${mediaqueries.desktop`
    padding: 0px;
    border: 0px;
    background: transparent;
  `}
  ${mediaqueries.phone`
    padding: 0px;
    border: 0px;
    background: transparent;
  `}
`;
