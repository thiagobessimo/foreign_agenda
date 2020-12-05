import React from "react";

import Layout from "gatsby-theme-breve/src/components/Layout";
import Section from "gatsby-theme-breve/src/components/Section";
import SEO from "gatsby-theme-breve/src/components/SEO";
import Headings from "gatsby-theme-breve/src/components/Headings";

function NotFoundPage() {
  return (
    <Layout>
      <SEO />
      <Section>
        <div style={{ marginTop: "100px" }}>
          <Headings.h1>404: Page Not Found</Headings.h1>
        </div>
      </Section>
    </Layout>
  );
}

export default NotFoundPage;
