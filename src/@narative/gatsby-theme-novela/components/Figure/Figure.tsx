import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

export const Figure = styled.figure`
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 18px;
  font-weight: 400;
  line-height: 1.618;
  color: ${(p) => p.theme.colors.articleText};
  transition: ${(p) => p.theme.colorModeTransition};
  margin: 0 auto 35px;
  width: 100%;
  max-width: 680px;

  b {
    font-weight: var(--system-font-bold);
  }

  ${mediaqueries.desktop`
  max-width: 680px;
`}

  ${mediaqueries.tablet`
  max-width: 486px;
  margin: 0 auto 25px;
`};

  ${mediaqueries.phablet`
  padding: 0 20px;
`};

  * {
    margin: auto;
  }
`;

export default Figure;
