module.exports = {
  siteMetadata: {
    title: 'react.cologne',
    description:
      'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: 'React Cologne Community',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '@': `${__dirname}/src`,
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        entitiesArray: [
          {
            typePrefix: 'meetupcom__',
            name: 'event',
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
            },
            url:
              'http://api.meetup.com/react-cologne/events?status=past,upcoming&desc=true',
          },
          {
            typePrefix: 'slackapi__',
            name: 'stats',
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
            },
            entityLevel: `stats`,
            url: 'https://reactcologneslackpub.apps.railslabs.com/api/stats',
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
