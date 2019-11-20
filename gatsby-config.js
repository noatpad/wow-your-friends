module.exports = {
  siteMetadata: {
    title: `Wow Your Friends`,
    description: `A small website serving as a record of all the skillful players who obtained all 202 Celeste's strawberries.`,
    author: `a clueless danny`,
    // TODO: Add URL when publishing
    siteUrl: 'https://example.com',
    image: '/card-image.png',
    twitterHandle: '@aCluelessDanny'
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-emotion',
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
    }
  ],
}
