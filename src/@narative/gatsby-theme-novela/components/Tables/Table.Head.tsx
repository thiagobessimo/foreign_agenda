import styled from "@emotion/styled";

const Head = styled.thead`
  text-align: left;
  border-collapse: collapse;
  position: relative;
  font-family: ${p => p.theme.fonts.sansSerif};
  font-weight: 800;
  line-height: 1.618;
  color: ${p => p.theme.colors.primary};
  transition: ${p => p.theme.colorModeTransition};
`;

export default Head;
