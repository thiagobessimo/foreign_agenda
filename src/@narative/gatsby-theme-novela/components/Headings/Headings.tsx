import styled from "@emotion/styled";
import { css } from "@emotion/core";

import mediaqueries from "@styles/media";

/**
 * Example:
 * <Heading.h1>Lorem Ipsum</Heading.h1>
 */

const commonStyles = p => css`
  font-weight: bold;
  color: ${p.theme.colors.primary};
  font-family: ${p => p.theme.fonts.sansSerif};
  font-size: 18px;
  font-weight: 400;
  line-height: 1.618;
`;

const h1 = styled.h1`
  word-break: keep-all;
  font-size: 54px;
  line-height: 1.15;
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 54px;
    line-height: 1.2;
  `};

  ${mediaqueries.phablet`
    font-size: 42px;
    line-height: 1.3;
  `};
`;

const h2 = styled.h2`
  word-break: keep-all;
  font-size: 42px;
  line-height: 1.333;
  ${commonStyles};

  ${mediaqueries.desktop`
    font-size: 42px;
  `};

  ${mediaqueries.tablet`
    font-size: 32px;
    line-height: 1.45;
  `};

  ${mediaqueries.phablet`
    font-size: 32px;
  `};
`;

const h3 = styled.h3`
  word-break: keep-all;
  font-size: 32px;
  line-height: 1.45;
  ${commonStyles};

  ${mediaqueries.tablet`
    font-size: 24px;
  `};

  ${mediaqueries.phablet`
    font-size: 24px;
  `};
`;

const h4 = styled.h4`
  word-break: keep-all;
  font-size: 24px;
  line-height: 1.45;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 18px;
  `};
`;

const h5 = styled.h5`
  word-break: keep-all;
  font-size: 18px;
  line-height: 1.45;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 14px;
  `};
`;

const h6 = styled.h6`
  word-break: keep-all;
  font-size: 10px;
  line-height: 1.45;
  ${commonStyles};

  ${mediaqueries.phablet`
    font-size: 10px;
  `};
`;

export default {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};
