import React from "react"
import "./styles.scss"
import renderHTML from "react-render-html"

import { StaticQuery, graphql } from "gatsby"

const FooterBottom = () => (
  <StaticQuery
    query={graphql`
      query footerBottomQuery {
        craft {
          entry(
            section: "smrSitewides"
            site: "starMetalsResidential"
            slug: "smr-sitewide-variables"
          ) {
            ... on Craft_smrSitewides_smrSitewides_Entry {
              id
              copyrightinfo
              footerLinks {
                url
                nameOfLink
              }
            }
          }
        }
      }
    `}
    render={data => (
      <div className="footer-bottom">
        <div className="footer-bottom-1">
          {data.craft.entry.footerLinks.map((link: any) => {
            return (
              <a
                className="footer-link"
                href={`https://starmetalsresidences.com${link.url}`}
                key={link.url}
                target="_blank"
              >
                {renderHTML(link.nameOfLink)}
              </a>
            )
          })}
        </div>
        <div className="footer-copyright">
          {renderHTML(data.craft.entry.copyrightinfo)}
        </div>
      </div>
    )}
  />
)
export default FooterBottom
