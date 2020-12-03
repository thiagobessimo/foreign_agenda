import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Paragraph = styled.p`
  font-family: ${p => p.theme.fonts.serif};
  font-size: 20px;
  font-weight: 300;
  line-height: 2;
  letter-spacing: 0.2px;
  color: ${p => p.theme.colors.articleText};
  transition: ${p => p.theme.colorModeTransition};
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  max-width: 680px;

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
