import React from "react";
import Layout from "@components/Layout";
import styled from "@emotion/styled";
import { Link } from "gatsby";

const ErrorPage = () => {
  return (
    <Layout>
      <ErrorContainer>
        <ErrorTitle>404 Page Not Found</ErrorTitle>
        <BacktoPage as={Link} to={"/"}>
          ← Back to our site
        </BacktoPage>
      </ErrorContainer>
    </Layout>
  );
};

const ErrorContainer = styled.div`
  margin: 100px auto 100px;
  position: relative;
  z-index: 3;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 30px;
  background: ${(p) => p.theme.colors.card};
  max-width: 400px;
`;

const ErrorTitle = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${(p) => p.theme.colors.primary};
`;

const BacktoPage = styled.a`
  color: ${(p) => p.theme.colors.grey};
  margin-top: 20px;
  text-align: center;
`;

export default ErrorPage;
