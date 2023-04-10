import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import { FaFacebookF, FaInstagram } from "react-icons/fa"
import ReactModal from "react-modal"
import { MenuItems } from "../../utils/variables"
import TourModal from "./../tourModal/modal"

import "./styles.scss"
interface Props {
  open: boolean
  onClose: any
  onLease: any
  phone: string
  address1: string
  address2: string
  facebook: string
  instagram: string
}
const customStyles = {
  content: {
    top: "0",
    height: "100%",
    right: "0",
    left: "auto",
    bottom: "auto",
    margin: "0",
    padding: "0",
    borderRadius: "0",
    borderWidth: "0",
    overflow: "inherit",
  },
}

export default function Menu({
  open,
  onClose,
  onLease,
  phone,
  address1,
  address2,
  facebook,
  instagram,
}: Props) {
  const [showTour, setShowTour] = useState(false)

  return (
    <div className="sidebar-wrapper">
      <ReactModal
        isOpen={open}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={onClose}
        style={customStyles}
        closeTimeoutMS={200}
        // contentLabel="Example Modal"
      >
        <div className={`side-menu`}>
          <div className="side-menu-header">
            <a
              className="side-menu-logo"
              href="https://starmetalsresidences.com"
            ></a>
            <div
              className="side-menu-close"
              onClick={() => {
                onClose()
              }}
            >
              <MdClose size={30}></MdClose>
            </div>
          </div>
          <div className="side-menu-content">
            {MenuItems.map(item => {
              return (
                <React.Fragment key={item.url}>
                  {!!item.url ? (
                    <a
                      href={item.url}
                      className="side-menu-content-item"
                      key={item.label}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <div
                      className="side-menu-content-item"
                      onClick={() => setShowTour(true)}
                    >
                      {item.label}
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
          <a
            className="side-menu-lease"
            href="https://8147545.onlineleasing.realpage.com"
            target="_blank"
          >
            LEASE NOW
          </a>
          <div className="side-menu-address">
            <div>{phone}</div>
            <div>{address1}</div>
            <div>{address2}</div>
          </div>
          <div className="side-menu-footer">
            <a href={facebook} target="_blank">
              <FaFacebookF color="white" size={25}></FaFacebookF>
            </a>
            <a href={instagram} target="_blank">
              <FaInstagram color="white" size={25}></FaInstagram>
            </a>
          </div>
        </div>
      </ReactModal>
      <TourModal open={showTour} onClose={() => setShowTour(false)} />
    </div>
  )
}
