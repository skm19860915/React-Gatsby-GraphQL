import React, { useEffect, useState } from "react"
import "./styles.scss"
import renderHTML from "react-render-html"
import Script from "react-load-script"
import TourModal from "./../tourModal/modal"

import axios from "axios"
import { StaticQuery, graphql } from "gatsby"
import { MenuItems } from "../../utils/variables"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import FooterBottom from "./bottom"

const Footer = () => {
  const [footerCode, setFooterCode] = useState("")
  const [showTour, setShowTour] = useState(false)

  useEffect(() => {
    axios
      .get(
        `https://amcodigitalmedia.com/graphql?query={entry(section: "smrSitewides", site: "starMetalsResidential") {
            ... on smrSitewides_smrSitewides_Entry {             
              footercode
            }
          }}`
      )
      .then(res => {
        setFooterCode(res.data.data.entry.footercode)
      })
    return () => {}
  }, [])
  return (
    <StaticQuery
      query={graphql`
        query footerQuery {
          craft {
            entry(
              site: "starMetalsResidential"
              section: "realEstateProjects"
              slug: "star-metals-residential"
            ) {
              id
              ... on Craft_realEstateProjects_realEstateProjects_Entry {
                location {
                  address
                  city
                  state
                  zipcode
                }
                contractor {
                  title
                }
                dateCreated
                dateUpdated
                generalPartner {
                  title
                }
                lenders {
                  title
                }
                instagramPage
                facebookPage
                description
                numberOfFloors
                numberOfUnits
                hotelRooms
                officeSpace
                residentialSquareFeet
                retailSpace
                siteSize
                totalCost
                totalValue
                websiteEmail
                mainPhoneNumberForProperty
              }
            }
          }
        }
      `}
      render={data => (
        <div className="footer">
          <div className="footer-top">
            <div className="footer-logo"></div>
            <div className="footer-content">
              {MenuItems.map(item => {
                return (
                  <React.Fragment key={item.label}>
                    {!!item.url ? (
                      <a
                        className="footer-content-item"
                        href={item.url}
                        key={item.label}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <div
                        className="footer-content-item"
                        onClick={() => setShowTour(true)}
                      >
                        {item.label}
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>
            <div className="footer-info">
              <div className="footer-info-1">
                <div className="footer-getintouch">
                  <div className="footer-getintouch-heading">Get In Touch</div>
                  <div style={{ color: "#636569!important" }}>
                    {data.craft.entry.mainPhoneNumberForProperty}
                  </div>
                  <div>
                    <a href="https://starmetalsresidences.com/contact#question">
                      EMAIL US
                    </a>
                  </div>
                  <div>{data.craft.entry.location[0].address}</div>
                  <div>{`${data.craft.entry.location[0].city}. ${data.craft.entry.location[0].state} ${data.craft.entry.location[0].zipcode}`}</div>
                </div>
                <div className="footer-socials">
                  <a href={data.craft.entry.facebookPage} target="_blank">
                    <FaFacebookF color="#946A4D" size={25}></FaFacebookF>
                  </a>
                  <a href={data.craft.entry.instagramPage} target="_blank">
                    <FaInstagram color="#946A4D" size={25}></FaInstagram>
                  </a>
                </div>
              </div>

              {/* <div className="footer-subscribe">
            <div className="footer-subscribe-label">Join Our Newsletter</div>
            <div className="footer-subscribe-container">
              <div className="footer-subscribe-input">
                <input type="text" placeholder="Email" />
              </div>
              <div className="footer-subscribe-button">Subscribe</div>
            </div>
          </div> */}
            </div>
          </div>
          <FooterBottom />
          <TourModal open={showTour} onClose={() => setShowTour(false)} />

          {footerCode &&
            footerCode.split("\n").map(url => {
              return <Script url={url} key={url}></Script>
            })}
        </div>
      )}
    />
  )
}
export default Footer
