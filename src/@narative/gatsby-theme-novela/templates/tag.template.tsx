import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";

import TagHero from "../sections/tag/tag.Hero";
import TagArticles from "../sections/tag/tag.Articles";

import { Template } from "@types";

const ArticlesPage: Template = ({ location, pageContext }) => {
  const tag = pageContext.additionalContext.tag;
  const articles = pageContext.group;

  return (
    <Layout>
      <SEO
        pathname={location.pathname}
        title={tag.name}
        // description={tag.bio}
      />
      <Section narrow>
        <TagHero tag={tag} />
        <TagArticles articles={articles} />
        <TagPaginator>
          <Paginator {...pageContext} />
        </TagPaginator>
      </Section>
    </Layout>
  );
}

export default ArticlesPage;

const TagPaginator = styled.div`
  text-align: center;
`;
