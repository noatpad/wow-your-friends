let moment = require('moment');

module.exports = {
  siteMetadata: {
    title: 'Wow Your Friends',
    description: 'A small website serving as a record of all the skillful players who obtained all 202 Celeste\'s strawberries',
    author: 'a clueless danny',
    lastUpdated: moment().format('MMM D, YYYY'),
    siteUrl: 'https://wowyourfriends.netlify.com',
    image: '/card-image.png',
    icon: '/card-icon.png',
    twitterHandle: '@noatpad'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Wow Your Friends',
        short_name: 'Wow Your Friends',
        start_url: '/',
        background_color: '#281b46',
        theme_color: '#5b4684',
        display: 'standalone',
        icon: 'static/icon.png'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/assets`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: 'gatsby-plugin-gtag',
      options: { trackingId: 'UA-152954702-1' }
    }
  ],
}
