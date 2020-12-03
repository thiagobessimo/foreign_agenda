import React, { Component } from "react";
import styled from "@emotion/styled";
import { Link, navigate } from "gatsby";
import OutsideClickHandler from 'react-outside-click-handler'
import { isMobileOnly } from 'react-device-detect'

import Logo from "@components/Logo";

import mediaqueries from "@styles/media";

interface NavigationState {
  active: boolean
  previousPath: string
  showPreviousPath: boolean
}

const headerLinks = [
  { to: '/tags/foreign-policy', text: 'Foreign Policy' },
  { to: '/tags/international-security', text: "Int'l Security" },
  { to: '/tags/data-visualisation', text: 'Data Viz' },
  { to: '/tags/china', text: 'China 中国' },
]

const animateIn = [
  { width: '20px', transform: 'initial' },
  {
    width: '20px',
    transform: 'translate3d(3px, -2px, 0) rotate(90deg)',
  },
  {
    width: '20px',
    transform: 'translate3d(3px, -2px, 0) rotate(90deg)',
  },
  {
    width: '20px',
    transform: 'translate3d(-3px, -2px, 0) rotate(90deg)',
  },
]

const animateOut = [
  {
    width: '20px',
    transform: 'translate3d(-3px, -2px, 0) rotate(90deg)',
  },
  { width: '20px', transform: 'initial' },
]

class Navigation extends Component<{}, NavigationState> {
  leftToggle = React.createRef()

  state = {
    active: false,
    previousPath: '',
    showPreviousPath: false,
  }

  componentDidMount() {
    const previousPath = localStorage.getItem('previousPath')
    this.setState({ previousPath })

    window.addEventListener('keydown', this.handleEscKeyPress)
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (typeof window !== 'undefined') {
      const previousPathFromStorage = localStorage.getItem('previousPath')
      const urlsThatUseBackButton = ['/articles/']

      if (prevState.previousPath !== previousPathFromStorage) {
        this.setState({
          previousPath: previousPathFromStorage,
          showPreviousPath: urlsThatUseBackButton.some(
            pathname => window.location.pathname.indexOf(pathname) >= 0
          ),
        })
      }
    }
    return null
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleEscKeyPress)
    }
  }

  handleEscKeyPress = ({ key }) => {
    if (key === 'Escape') {
      this.handleOutsideClick()
    }
  }

  handleToggleClick = () => {
    const $toggle = this.leftToggle.current

    this.setState(
      {
        active: !this.state.active,
      },
      () => {
        if (!isMobileOnly) {
          if (this.state.active && $toggle) {
            $toggle.animate(animateIn, {
              duration: 900,
              fill: 'both',
              easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
            })
          } else {
            this.handleCloseAnimation()
          }
        }
      }
    )
  }

  handleCloseAnimation = () => {
    const $toggle = this.leftToggle.current

    if ($toggle) {
      $toggle.animate(animateOut, {
        duration: 250,
        fill: 'both',
        easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      })
    }
  }

  handleOutsideClick = () => {
    if (this.state.active) {
      this.handleCloseAnimation()
      this.setState({ active: false })
    }
  }

  navigateOut = (event, path) => {
    event.preventDefault()
    this.handleOutsideClick()

    if (path === '#') return

    setTimeout(() => {
      navigate(path)
    }, 250)
  }

  render() {
    const { active, previousPath, showPreviousPath } = this.state

    return (
        <OutsideClickHandler onOutsideClick={this.handleOutsideClick}>
          <NavFixedContainer>
              <NavContainer>
                <Left>
                {previousPath && showPreviousPath && (
                  <LogoBack onClick={() => window.history.back()}>
                    <BackChevron />
                  </LogoBack>
                )}
                  <Logo/>
                </Left>
                <Right>
                <Nav>
                  <DesktopNavList>
                    <NavItems
                      active={active}
                      handleClick={this.navigateOut}
                    />
                  </DesktopNavList>
                  <ToggleContainer
                    onClick={this.handleToggleClick}
                    aria-label="Mobile Navigation Button"
                  >
                    <LeftToggle active={active} ref={this.leftToggle} />
                    <RightToggle active={active} />
                  </ToggleContainer>
                </Nav>
                </Right>
              </NavContainer>
          </NavFixedContainer>
        </OutsideClickHandler>
    )
  }
}

export default Navigation

const NavItems = ({ active, handleClick }) => {

  return headerLinks.map((nav, index) => {
    const delay = active ? 30 * (headerLinks.length - index) : 30 * index

    return (
      <NavItem key={nav.to}>
        <NavAnchor
          active={active ? active : undefined}
          disabled={nav.disabled}
          to={nav.to}
          delay={delay}
          as={Link}
          onClick={event => handleClick(event, nav.to)}
          getProps={({ isPartiallyCurrent }) =>
            isPartiallyCurrent ? { ['data-active']: 'true' } : null
          }
        >
          {nav.text}
        </NavAnchor>
      </NavItem>
    )
  })
}

const NavFixedContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  height: 100px;
  width: 100%;
  background: ${(p) => p.theme.colors.background};
  transition: ${p => p.theme.colorModeTransition};

  ${mediaqueries.tablet`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  `}
`

const NavContainer = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  z-index: 100;
  height: 100px;
  width: 1220px;
  padding: 0px 0px 15px;
  margin: 0px auto;
  justify-content: space-between;

  ${mediaqueries.tablet`
    padding-top: 50px;
  `};
`

const LogoBack = styled.button`
  position: absolute;
  left: -44px;
  top: 107px;

  svg {
    transition: transform 0.25s var(--ease-out-quad);
  }

  &:hover svg {
    transform: translateX(-4px);
  }

  ${mediaqueries.tablet`
    display: none;
  `}
`

const ToggleContainer = styled.button`
  position: relative;
  height: 40px;
  width: 40px;
  right: -10px;
  cursor: pointer;

  ${mediaqueries.phablet`
    width: 30px;
    height: 30px;
    right: -10px;
  `};
`

const Toggle = styled.span`
  position: absolute;
  right: 10px;
  height: 1px;
  background: ${(p) => p.theme.colors.primary};
  transition: transform 0.4s cubic-bezier(0.075, 0.82, 0.165, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  ${mediaqueries.tablet`
      display: none;
    `}
`

const LeftToggle = styled(Toggle)`
  top: 23px;
  width: ${p => (p.active ? '20px' : '20px')};

  ${mediaqueries.phablet`
    top: 15px;
    width: 15px;
  `};

  &::after {
    content: '';
    position: absolute;
    height: 1px;
    background: ${(p) => p.theme.colors.primary};
    width: 100%;
    bottom: -1px;
    left: 0;
  }
`

const RightToggle = styled(Toggle)`
  top: 17px;
  width: 20px;
  transform: ${p =>
    p.active ? 'translate3d(3px, 4px, 0) rotate(90deg)' : 'initial'};

  ${mediaqueries.phablet`
    top: 9px;
    transform: initial;
  `};

  &::after {
    content: '';
    position: absolute;
    height: 1px;
    background: ${(p) => p.theme.colors.primary};
    width: 100%;
    bottom: -1px;
    left: 0;
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
`

const DesktopNavList = styled.ul`
  list-style: none;

  ${mediaqueries.phablet`
  display: none;

  `};
`

const NavItem = styled.li`
  display: inline-block;
  margin-right: 60px;

  &:last-child {
    margin-right: 40px;
  }

  ${mediaqueries.tablet`
    margin-right: 40px;

    &:first-of-type {
      display: none;
    }

    &:last-of-type {
      margin-right: 30px;
    }
  `};

  ${mediaqueries.phablet`
    display: block;
    margin: 0 auto;

    &:first-of-type {
      display: block;
    }

    &:last-of-type {
      margin: 0 auto;
    }
  `};
`

const NavAnchor = styled.a`
  display: flex;
  height: 40px;
  align-items: center;
  color: ${(p) => p.theme.colors.primary};
  font-weight: 600;
  font-size: 18px;
  transition: opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms,
    transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p => p.delay}ms;

  pointer-events: ${p => (p.active ? 'initial' : 'none')};
  opacity: ${p => (p.active ? (p.disabled ? 0.15 : 1) : 0)};
  transform: ${p => (p.active ? 'translateX(0)' : 'translateX(12px)')};

  &[data-active='true'] {
    &::after {
      content: '';
      position: absolute;
      margin: 0 auto;
      left: 0;
      right: 0;
      bottom: 4px;
      height: 1px;
      width: 20px;
      background: ${(p) => p.theme.colors.primary};
    }
  }

  &:hover {
    opacity: ${p => (p.disabled ? 0.15 : 0.6)};
  }

  ${mediaqueries.phablet`
    display: block;
    margin: 0 auto;
    text-align: center;
    color: #000;
    font-weight: 400;
    margin-bottom: 10px;

  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p =>
    p.delay + 300}ms,
    transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.9) ${p =>
      p.delay * 2 + 300}ms;
      opacity: ${p => (p.active ? (p.disabled ? 0.15 : 1) : 0)};
  transform: ${p => (p.active ? 'translateX(0)' : 'translateY(30px)')};
  `};
`

const BackChevron = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z"
      fill="black"
    />
  </svg>
)

const Left = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0px;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `}
`;

const Right = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 50px;
  `};

  ${mediaqueries.phablet`
    width: 100%;
  `}
`;
