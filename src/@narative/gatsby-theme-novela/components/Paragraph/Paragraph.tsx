import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Paragraph = styled.p`
  line-height: 1.8;
  font-size: 18px;
  color: ${p => p.theme.colors.articleText};
  font-family: ${p => p.theme.fonts.sansSerif};
  transition: ${p => p.theme.colorModeTransition};
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  max-width: 800px;

  b {
    font-weight: 800;
  }

  ${mediaqueries.desktop`
    max-width: calc(507px + 53px);
  `}

  ${mediaqueries.tablet`
    max-width: 480px;
  `};

  ${mediaqueries.phablet`
    padding: 0px 40px;
  `};

  ${mediaqueries.phone`
    padding: 0px 40px;
  `};
`;

export default Paragraph;
