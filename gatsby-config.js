module.exports = {
  siteMetadata: {
    title: 'Computational Biology and Medicine Program',
    description: 'CBMP website',
    author: '@chuntul',
  },
  plugins: [
    'gatsby-plugin-smoothscroll',
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
    'gatsby-plugin-styled-components',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'lato\:400,700',
          'rubik\:400',
          'orbitron\:400',
          'roboto\:300,400,500,700',
        ],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
      },
    },
    'gatsby-transformer-csv',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-102362625-6',
        head: true,
        anonymize: true,
      },
    },

  ],
};
