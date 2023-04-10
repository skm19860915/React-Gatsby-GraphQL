/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import Favicon from "react-favicon"

interface Props {
  description?: string
  lang?: string
  meta?: Array<any>
  title: string
  keywords: string
}

function SEO({ description, lang, meta, title, keywords }: Props) {
  lang = lang || "en"
  meta = meta || []

  const { craft } = useStaticQuery(
    graphql`
      query seoQuery {
        craft {
          entry(section: "smrSitewides", site: "starMetalsResidential") {
            ... on Craft_smrSitewides_smrSitewides_Entry {
              id
              favicon {
                url
              }
              headcode
            }
          }
        }
      }
    `
  )

  const metaDescription = description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`${title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: keywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `http://amcocmsassets.s3.amazonaws.com/smr/01_Header-Star-Metals-Residences-render-1814x885-01.jpg`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: "@allenmoris",
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <link
        rel="icon"
        type="image/png"
        href={craft.entry.favicon[0].url}
        sizes="16x16"
      />
      {craft.entry.headcode}
    </Helmet>
  )
}

export default SEO
