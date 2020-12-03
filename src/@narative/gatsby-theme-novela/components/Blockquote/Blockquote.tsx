import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Blockquote = styled.blockquote`
  transition: ${p => p.theme.colorModeTransition};
  margin: 50px auto 75px;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 32px;
  font-weight: 800;
  line-height: 1.618;

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};

  & > p {
    font-family: ${p => p.theme.fonts.sansSerif};
    font-size: 32px;
    font-weight: 800;
    line-height: 1.618;
    max-width: 680px !important;
    padding-left: 200px;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;

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
