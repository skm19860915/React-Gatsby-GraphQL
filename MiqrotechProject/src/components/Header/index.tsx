import React, { useState, useEffect } from "react"
import { Row } from "reactstrap"
import { MdMenu } from "react-icons/md"
import { StaticQuery, graphql } from "gatsby"
import Menu from "../menu"
import LeaseModal from "../leaseModal"
import "./styles.scss"
import ReactModal from "react-modal"
import TourModal from "../tourModal/modal"

interface Props {
  siteTitle: string
}
//
const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleLease, setToggleLease] = useState(false)
  const [openTourModal, setOpenTourModal] = useState(false)

  const onClickMenu = () => {
    setToggleMenu(!toggleMenu)
  }
  const onClickLease = () => {
    setToggleLease(!toggleLease)
  }
  useEffect(() => {
    ReactModal.setAppElement("#header")
    return () => {}
  }, [])

  return (
    <StaticQuery
      query={graphql`
        query headerQuery {
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
                instagramPage
                mainPhoneNumberForProperty
                facebookPage
                websiteEmail
              }
            }
          }
        }
      `}
      render={data => (
        <div className="header" id="header">
          <a className="logo" href="https://starmetalsresidences.com" />
          <div className="right-section">
            <div
              className="header-number"
              // onClick={() => setOpenTourModal(true)}
            >
              {data.craft.entry.mainPhoneNumberForProperty}
            </div>
            {/* <div
              className="lease-button"
              onClick={() => {
                onClickLease()
              }}
            >
              <span>LEASE NOW</span>
            </div> */}
            <a className="lease-button" href="/floorplan">
              <span>VIEW FLOORPLANS</span>
            </a>

            <div
              className={`hamburger-button ${toggleMenu ? "active" : ""}`}
              onClick={() => {
                onClickMenu()
              }}
            >
              <MdMenu color="white" size={40}></MdMenu>
            </div>
          </div>
          <Menu
            open={toggleMenu}
            onClose={() => onClickMenu()}
            onLease={() => {
              onClickMenu()
              onClickLease()
            }}
            phone={data.craft.entry.mainPhoneNumberForProperty}
            address1={data.craft.entry.location[0].address}
            address2={`${data.craft.entry.location[0].city}. ${data.craft.entry.location[0].state} ${data.craft.entry.location[0].zipcode}`}
            facebook={data.craft.entry.facebookPage}
            instagram={data.craft.entry.instagramPage}
          ></Menu>
          <LeaseModal
            open={toggleLease}
            onClose={() => onClickLease()}
          ></LeaseModal>
          <TourModal
            open={openTourModal}
            onClose={() => setOpenTourModal(false)}
          />
        </div>
      )}
    />
  )
}

export default Header
