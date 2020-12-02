import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Blockquote = styled.blockquote`
  transition: ${p => p.theme.colorModeTransition};
  margin: 50px auto 75px;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.sansSerif};
  font-style: bold;

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};

  & > p {
    font-family: ${p => p.theme.fonts.sansSerif};
    max-width: 800px !important;
    padding-left: 200px;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 32px;
    line-height: 1.32;
    font-weight: bold;

    ${mediaqueries.tablet`
      font-size: 24px;
      padding: 0 180px;
    `};

    ${mediaqueries.phablet`
      font-size: 24px;
      padding: 0 20px 0 40px;
    `};
  }
`;

export default Blockquote;
