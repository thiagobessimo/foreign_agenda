// @flow
// Oceanic Next
// Author: Dmitri Voronianski (https://github.com/voronianski)
// https://github.com/voronianski/oceanic-next-color-scheme
// Adapted from: https://github.com/reactjs/reactjs.org/blob/428d52b/src/prism-styles.js

/*:: import type { PrismTheme } from '../src/types' */

var colors = {
  token: `#fdfdfd`,
  languageJavascript: `#fdfdfd`,
  javascript: `#fdfdfd`,
  background: `#000510`,
  comment: `#686686`,
  string: `#fdfdfd`,
  var: `#2060ff`,
  number: `#2060ff`,
  constant: `#2060ff`,
  plain: `#fdfdfd`,
  doctype: `#fdfdfd`,
  tag: `#fdfdfd`,
  keyword: `#2060ff`,
  boolean: `#2060ff`,
  function: `#2060ff`,
  parameter: `#2060ff`,
  className: `#fdfdfd`,
  attrName: `#fdfdfd`,
  attrValue: `#fdfdfd`,
  interpolation: `#fdfdfd`,
  punctuation: `#fdfdfd`,
  property: `#fdfdfd`,
  propertyAccess: `#fdfdfd`,
  namespace: `#fdfdfd`,
  highlight: `#fdfdfd10`,
  highlightBorder: `#fdfdfd`,
  dom: `#2060ff`,
  operator: `#ef5050`,
  char: `#fdfdfd`,
  primitive: `#fdfdfd`,
  variable: `#fdfdfd`,
  method: `#fdfdfd`,
}

var theme /*: PrismTheme */ = {
  plain: {
    backgroundColor: "#000510",
    color: "#fdfdfd",
  },
  styles: [
    {
      types: ["attr-name"],
      style: {
        color: colors.keyword,
      },
    },
    {
      types: ["attr-value"],
      style: {
        color: colors.string,
      },
    },
    {
      types: ["comment", "block-comment", "prolog", "doctype", "cdata"],
      style: {
        color: colors.comment,
      },
    },
    {
      types: [
        "property",
        "number",
        "function-name",
        "constant",
        "symbol",
        "deleted",
      ],
      style: {
        color: colors.primitive,
      },
    },
    {
      types: ["boolean"],
      style: {
        color: colors.boolean,
      },
    },
    {
      types: ["tag"],
      style: {
        color: colors.tag,
      },
    },
    {
      types: ["string"],
      style: {
        color: colors.string,
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: colors.string,
      },
    },
    {
      types: ["selector", "char", "builtin", "inserted"],
      style: {
        color: colors.char,
      },
    },
    {
      types: ["function"],
      style: {
        color: colors.function,
      },
    },
    {
      types: ["operator", "entity", "url", "variable"],
      style: {
        color: colors.variable,
      },
    },
    {
      types: ["keyword"],
      style: {
        color: colors.keyword,
      },
    },
    {
      types: ["at-rule", "class-name"],
      style: {
        color: colors.className,
      },
    },
    {
      types: ["important"],
      style: {
        fontWeight: "400",
      },
    },
    {
      types: ["bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 1,
      },
    },
  ],
}

module.exports = theme
