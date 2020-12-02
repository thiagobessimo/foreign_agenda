import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import styled from '@emotion/styled'
import { css } from 'styled-components'

import mediaqueries from '@styles/media'

import { IRichText } from '@typings'

// Specifically handling Twitter embeds that get passed from our htmls htmlRenderer
const transform = node => {
  if (node.name === 'twitter' && node.attribs.twitterid) {
    return (
      <TwitterTweetEmbed
        key={node.attribs.twitterid}
        tweetId={node.attribs.twitterid}
      />
    )
  }
}

const RichText: React.SFC<IRichText> = ({ content, contentRef, ...props }) => {
  const html = ReactHtmlParser(content, { transform })

  return (
    <Content ref={contentRef} {...props}>
      {html}
    </Content>
  )
}

export default RichText

const imageWidths = {
  regular: '680px',
  large: '1004px',
  full: '100vw',
}

const articleWidth = css`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;

  ${mediaqueries.tablet`
    padding: 0 20px;
  `};
`

const transitionColor = css`
  transition: color 0.3s ease;
`

const Content = styled.article`
  display: flex;
  flex-direction: column;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${articleWidth};
    font-family: ${p => p.theme.fonts.sansSerif};
    * {
      font-family: ${p => p.theme.fonts.sansSerif};
    }
    color: #edc234;
  }

  h1,
  h1 * {
    font-weight: 700;
    font-size: 2.8rem;
    line-height: 1.1;

    ${mediaqueries.desktop_up`
      font-size: 4.2rem;
      margin-bottom: 2.5rem;
    `};
  }

  h2,
  h2 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 2rem;
    padding-top: 45px;

    ${mediaqueries.desktop_up`
      font-size: 3.2rem;
      paddng-top: 65px;
      margin-bottom: 2.5rem;
    `};
  }

  h3,
  h3 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 1rem;

    ${mediaqueries.desktop`
      margin-top: 0;
      margin-bottom: 0.75rem;
    `};
  }

  a,
  a * {
    color: #edc234;
    ${transitionColor};

    &:visited {
      color: #edc234;
      opacity: 0.85;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  figure {
    margin-bottom: 0;

    img {
      margin-bottom: 15px;
    }

    figcaption {
      ${articleWidth};
      font-family: ${p => p.theme.fonts.sansSerif};
      color: #edc234;
      opacity: 0.5;
      font-size: 16px;
      display: block;
      margin-bottom: 60px;

      ${mediaqueries.tablet`
        margin-bottom: 35px;
        font-size: 18px;
      `}
    }
  }

  blockquote {
    position: relative;
    ${articleWidth};
    font-style: italic;
    ${transitionColor};

    p {
      position: relative;
      padding-left: 30px;
      margin: 30px auto 65px;

      &::before {
        content: '';
        position: absolute;
        width: 2px;
        left: 0;
        top: 8px;
        bottom: 8px;
        background: #edc234;
      }

      ${mediaqueries.tablet`
        margin: 15px auto 45px;
      `}
    }
  }

  blockquote.pull__quote {
    margin: 35px auto 65px;
    line-height: 1.25;
    max-width: 780px;
    color: #edc234;
    font-family: ${p => p.theme.fonts.sansSerif};
    font-size: 36px;
    font-style: italic;
    ${transitionColor};

    ${mediaqueries.tablet`
      margin: 0 auto 35px;
      padding: 20px;
    `}
  }

  ul,
  ol {
    ${articleWidth} list-style: none;
    counter-reset: list;
    color: #edc234;
    ${transitionColor};
    position: relative;
    padding-left: 30px;
    margin-bottom: 2rem;

    li {
      position: relative;
      margin-bottom: 1.5rem;

      ${mediaqueries.tablet`
          padding-left: 20px;
        `}

      p {
        ${mediaqueries.tablet`
          padding: 0;
        `}
      }
    }

    li > * {
      display: inline;
    }

    li::before {
      width: 3rem;
      display: inline-block;
      position: absolute;
      color: #edc234;
    }
  }

  ul li::before {
    content: '';
    position: absolute;
    left: -3rem;
    top: 1.5rem;
    height: 8px;
    width: 8px;
    background: #edc234;

    ${mediaqueries.tablet`
      left: 0;
    `}
  }

  ol li::before {
    counter-increment: list;
    content: counter(list) '.';
    font-weight: 600;
    position: absolute;
    left: -3rem;
    top: 0.85rem;

    ${mediaqueries.tablet`
      left: 0;
    `}
  }

  p {
    ${articleWidth};
    margin-bottom: 35px;
    line-height: 1.6;
    font-size: 22px;
    color: #edc234;

    b {
      font-weight: 800;
    }
  }

  img {
    display: block;
    position: relative;
    max-width: 100%;
    z-index: 0;
    margin: 40px auto 65px;
    border-radius: 5px;

    ${mediaqueries.tablet`
      margin: 20px auto 45px;
    `}
  }

  img.image__regular {
    width: 100%;
    max-width: ${imageWidths.regular};

    ${mediaqueries.tablet`
      width: calc(100vw - 40px);
    `}
  }

  img.image__large {
    width: 100%;
    max-width: ${imageWidths.large};

    ${mediaqueries.tablet`
      border-radius: 0;
    `}
  }

  img.image__full {
    width: 100%;
    max-width: ${imageWidths.full};
    border-radius: 0;
  }

  table {
    ${articleWidth};
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #dfe3e8;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
    color: #edc234;
  }

  th {
    text-transform: uppercase;
    font-weight: 600;
  }

  tr {
    &:hover {
      background-color: #f4f6f8;
    }
  }

  td {
    padding: 10px 8px;
    border-bottom: 1px solid #dfe3e8;
    vertical-align: top;
    white-space: nowrap;
  }

  hr {
    width: 250px;
    height: 1px;
    margin: 35px auto;
    opacity: 0.33;
  }

  .twitter-tweet {
    text-align: center;
    margin: 0 auto;
    padding: 20px 0 55px 0;
    width: 540px !important;
  }

  hr {
    ${articleWidth};
    position: relative;
    width: 100%;
    margin: 25px auto 60px;
    border: 0;
    height: 14.36px;
    background-image: url("${p => p.theme.mode.hr}");
    background-repeat: repeat-x;
    box-sizing: border-box;

    ${mediaqueries.tablet`
      width: calc(100vw - 40px);
      margin: 0px auto 50px;
    `};
  }
`
