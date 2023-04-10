import React, { useState } from "react"
import styled from "styled-components"
import { graphql, StaticQuery } from "gatsby"

import Map from "./../mapComponent/map"
import TourModal from "./../tourModal/modal"

import {
  Info,
  MapContainer,
  Info_Content,
  Info_Content_Heading,
  Address,
  EmailUS,
  Socials,
  Divider,
  Direction,
} from "./../../styles/contact"
import { FaFacebookF, FaInstagram } from "react-icons/fa"

interface Props {
  img: string
}

const ContactInfo = ({ img }: Props) => {
  const [showTour, setShowTour] = useState(false)

  return (
    <StaticQuery
      query={graphql`
        query contactInfoQuery {
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
                  state
                  city
                  zipcode
                }
                mainPhoneNumberForProperty
                websiteEmail
                facebookPage
                instagramPage
                officeHoursOfOperations {
                  monFri
                  sun
                  sat
                }
              }
            }
          }
        }
      `}
      render={data => (
        <Info>
          <MapContainer img={img}>
            <Map
              zoom={14}
              data={[]}
              center={{ lat: 33.7832909, lng: -84.4032521 }}
            ></Map>
          </MapContainer>

          <Info_Content>
            <Info_Content_Heading>Contact Info</Info_Content_Heading>
            <Address>
              <div>{data.craft.entry.mainPhoneNumberForProperty || ""}</div>
              <div>{data.craft.entry.location[0].address}</div>
              <div>{`${data.craft.entry.location[0].city}. ${data.craft.entry.location[0].state} ${data.craft.entry.location[0].zipcode}`}</div>
              <Direction
                href="https://www.google.com/maps/dir//Star+Metals+Atlanta,+1050+Howell+Mill+Rd,+Atlanta,+GA+30318/@33.7833625,-84.4112816,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x88f504eb605297ed:0x98edf2c8f622a54b!2m2!1d-84.4121399!2d33.7834071!3e0"
                target="_blank"
              >
                Directions
              </Direction>
            </Address>

            <EmailUS onClick={() => setShowTour(true)}>
              Schedule a live or Virtual Tour
              {/* <a href={`mailto:${data.craft.entry.websiteEmail}`}>
                {data.craft.entry.websiteEmail}
              </a> */}
            </EmailUS>
            <Socials>
              <a href={data.craft.entry.facebookPage} target="_blank">
                <FaFacebookF size={25}></FaFacebookF>
              </a>
              <a href={data.craft.entry.instagramPage} target="_blank">
                <FaInstagram size={25}></FaInstagram>
              </a>
            </Socials>
            {/*<Divider></Divider>
          <Info_Content_Heading>Hours</Info_Content_Heading>
          <Address>
            <div>
              <strong>Monday-Friday</strong>{" "}
              {data.craft.entry.officeHoursOfOperations[0].monFri}
            </div>
            <div>
              <strong>Saturday</strong>{" "}
              {data.craft.entry.officeHoursOfOperations[0].sat}
            </div>
            <div>
              <strong>Sunday</strong>{" "}
              {data.craft.entry.officeHoursOfOperations[0].sun}
            </div>
          </Address>
          <EmailUS>TAKE A TOUR</EmailUS> */}
          </Info_Content>
          <TourModal open={showTour} onClose={() => setShowTour(false)} />
        </Info>
      )}
    />
  )
}
export default ContactInfo
