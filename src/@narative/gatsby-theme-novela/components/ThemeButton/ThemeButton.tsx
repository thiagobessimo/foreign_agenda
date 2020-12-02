import { useColorMode } from 'theme-ui';
import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const modes = ['light', 'dark', 'sky', 'ocean']

const DarkModeToggle: React.FC<{}> = () => {
  const [setMode] = useColorMode();
  const isDark = (setMode === `light` || setMode === `sky`);

  return (
    <IconWrapper
      isDark={isDark}
      data-a11y="false"
    >
      <MoonOrSun isDark={isDark} />
      <MoonMask isDark={isDark} />
    </IconWrapper>
  );
};

const ThemeButton: React.FC<{}> = () => {
  const [mode, setMode] = useColorMode()
  const isDark = (setMode === `light` || setMode === `sky`);
  const cycleMode = e => {
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }

  return (
          <ButtonWrapper>
            <Button
              onClick={cycleMode}>
                {mode}
                <DarkModeToggle />
            </Button>
          </ButtonWrapper>
  )
}

export default ThemeButton;

const Button = styled.div`
  display: flex;
  position: relative;
  font-weight: 600;
  font-size: 18px;
  font-family: ${p => p.theme.fonts.sansSerif};
  color: ${(p) => p.theme.colors.primary};
  transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9);
  align-items: center;
  justify-content: space-between;
  width: 95px;
  height: 25px;
  margin: 0px 0px;

  ${mediaqueries.tablet`
    display: inline-flex;
    transform: scale(1.4);
    justify-content: center;
    margin-left: 20px;
    width: 50px;
  `}
`;

const ButtonWrapper = styled.button`
    &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: 0;
    top: -30%;
    width: 100%;
    height: 160%;
  }

  &:hover {
    opacity: 0.6;
    transition: opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);
  }
`;

const IconWrapper = styled.button<{ isDark: boolean }>`
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
  margin: 0px 0px;

  ${mediaqueries.tablet`
    display: inline-flex;
    transform: scale(0.708);
    margin-left: 10px;
  `}
`;

const MoonOrSun = styled.div<{ isDark: boolean }>`
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: ${p => (p.isDark ? "4px" : "2px")} solid
    ${p => p.theme.colors.primary};
  background: ${p => p.theme.colors.primary};
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? "visible" : "hidden")};

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 ${p => p.theme.colors.primary},
      0 23px 0 ${p => p.theme.colors.primary},
      23px 0 0 ${p => p.theme.colors.primary},
      -23px 0 0 ${p => p.theme.colors.primary},
      15px 15px 0 ${p => p.theme.colors.primary},
      -15px 15px 0 ${p => p.theme.colors.primary},
      15px -15px 0 ${p => p.theme.colors.primary},
      -15px -15px 0 ${p => p.theme.colors.primary};
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;

    ${p => mediaqueries.tablet`
      transform: scale(${p.isDark ? 0.92 : 0});
    `}
  }
`;

const MoonMask = styled.div<{ isDark: boolean }>`
  position: absolute;
  right: 0px;
  top: -8px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 0;
  background: ${p => p.theme.colors.background};
  transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
  opacity: ${p => (p.isDark ? 0 : 1)};
  transition: ${p => p.theme.colorModeTransition}, transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.9);
`;
