module.exports = {
  siteMetadata: {
    title: `Breve`,
    name: `Breve`,
    siteUrl: `https://thiagobessimo.github.io/breve/`,
    description: `This is my description that will be used in the meta tags and important for search results`,
    hero: {
      heading: `Get smart`,
      maxWidth: 800,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/breveData`,
      },
      {
        name: `github`,
        url: `https://github.com/thiagobessimo`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/thiago.bessimo`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/thiagobessimo/`,
      },
    ],
    footer: {
      copyright: "Built with Draftbox",
    },
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        contentTags: "content/tags",
        basePath: "/",
        pageLength: 9,
        authorsPage: true,
        tagsPage: true,
        sources: {
          local: true,
          // contentful: true,
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
  ],
};
