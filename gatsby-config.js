module.exports = {
  siteMetadata: {
    title: `Foreign Agenda`,
    name: `Foreign Agenda`,
    siteUrl: `https://thiagobessimo.github.io/breve/`,
    description: `A publication about Data, Foreign Policy and Theory`,
    hero: {
      heading: `data,\nforeign policy,\ntheory`,
      maxWidth: 750,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/bessimo`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/thiagobessimo/`,
      },
      {
        name: `github`,
        url: `https://github.com/thiagobessimo`,
      }
    ],
    footer: {
      copyright: "Built by Breve",
    },
  },
  plugins: [
    {
      resolve: "gatsby-theme-breve",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        contentTags: "content/tags",
        basePath: "/",
        pageLength: 6,
        authorsPage: true,
        tagsPage: true,
        sources: {
          local: true,
          contentful: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fdfdfd`,
        theme_color: `#fdfdfd`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          "'Literata', 'Crimson Pro', 'EB Garamond', 'Merriweather', 'Ubuntu', 'Roboto', 'Fira Code', 'source-code-pro'"
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: 'Literata',
            variable: true,
            weights: ['200..900']
          },
          {
            family: 'Crimson Pro',
            variable: true,
            weights: ['200..900']
          },
          {
            family: 'EB Garamond',
            variable: true,
            weights: ['200..900']
          },
          {
            family: 'Merriweather',
            variable: true,
            weights: ['200..900']
          },
          {
            family: 'Ubuntu',
            variable: false,
            weights: ['200..900']
          },
          {
            family: 'Roboto',
            variable: false,
            weights: ['200..900']
          },
          {
            family: 'Fira Code',
            variable: true,
            weights: ['200..900']
          },
          {
            family: 'source-code-pro',
            variable: false,
            weights: ['200..900']
          }
        ]
      }
    }
  ],
};
