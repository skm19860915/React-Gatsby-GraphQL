const path = require("path");
require("dotenv").config();

module.exports = {
  flags: {
    DEV_SSR: false
  },
  siteMetadata: {
    siteUrl: "https://miqrotech.com",
    title: "mIQrotech",
    author: "Reform Collective",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
    "gatsby-plugin-loadable-components-ssr",
    "gatsby-plugin-glslify",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-hubspot",
      options: {
        trackingCode: "20379515",
        respectDNT: true,
        productionOnly: false,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://miqrotech.us5.list-manage.com/subscribe/post?u=2327c39cb10439bcfe1fa5d95&amp;id=107dd7b425', // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        prettier: true,
        svgo: true,
        memo: true,
        svgoConfig: {
          plugins: [
            { removeViewBox: false },
            { removeDimensions: true },
            { removeRasterImages: true },
            { reusePaths: true },
            { cleanupIDs: false },
            { prefixIds: false },
            { removeUselessDefs: true },
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `mIQrotech`,
        short_name: `mIQrotech`,
        start_url: `/`,
        background_color: `#050505`,
        theme_color: `#050505`,
        display: `minimal-ui`,
        icon: `src/images/svg/faviconBlack.svg`, // This path is relative to the root of the site.
        theme_color_in_head: true
      },
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@components": path.resolve(__dirname, "src/components"),
          "@styles": path.resolve(__dirname, "src/styles"),
          "@sections": path.resolve(__dirname, "src/sections"),
          "@svg": path.resolve(__dirname, "src/images/svg"),
          "@jpg": path.resolve(__dirname, "src/images/jpg"),
          "@png": path.resolve(__dirname, "src/images/png"),
          "@fonts": path.resolve(__dirname, "src/fonts"),
          "@shaders": path.resolve(__dirname, "src/shaders"),
          "@hooks": path.resolve(__dirname, "src/hooks"),
          "@json": path.resolve(__dirname, "src/json"),
        },
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'UA-198070641-1', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-analytics', // default
          anonymize: true, // default
          allowAdFeatures: false // default
        },
        environments: ['production', 'development']
      },
    },
  ],
};
