import React, { Component, useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { compose, withProps } from "recompose"
import mapStyle from "./mapStyle"
import StarImg from "./../../assets/img/star.png"
import Swiper from "react-id-swiper"
import "swiper/css/swiper.css"

import "react-responsive-modal/styles.css"
import { Modal } from "react-responsive-modal"

// import "map-icons/dist/js/map-icons"

import {
  GoogleMap,
  Marker,
  InfoWindow,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps"
import "./map.scss"
const Loading = () => <div>Fancy loading container</div>
import {
  FaPaintBrush,
  FaGraduationCap,
  FaUtensils,
  FaCoffee,
  FaSun,
  FaBriefcase,
  FaShoppingBag,
  FaBus,
} from "react-icons/fa"
import { icons } from "react-icons/lib/cjs"

const MarkerLogo = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
`
const MarkerImg = styled.img`
  object-fit: cover;
  margin-bottom: 8px;
  height: 100px;
  width: 100%;
`
const MarkerTitle = styled.div`
  color: #443635;
  font-family: "Noto Sans KR";
  font-size: 16px;
  text-align: left;
`
const MarkerAddress = styled.div`
  color: gray;
  font-family: "Noto Sans KR";
  font-size: 12px;
  text-align: left;
`
const MarkerPhone = styled.div`
  color: black;
  font-family: "Noto Sans KR";
  font-size: 14px;
  text-align: left;
`
interface CarouselProps {
  img: string
}
const CarouselView = styled.div<CarouselProps>`
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  width: 800px;
  height: 600px;

  @media screen and (max-width: 767px) {
    width: 300px;
    height: 200px;
  }
`
const CarouselClose = styled.div`
  display: none;
`
const swiperParams = {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: false,
  spaceBetween: 0,
}
const CarouselModal = ({ open, onCloseModal, images }) => {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      closeIcon={<CarouselClose />}
      classNames={{
        modal: "customCarouselModal",
      }}
    >
      <Swiper {...swiperParams}>
        {images.map(img => {
          return <CarouselView key={img.url} img={img.url} />
        })}
      </Swiper>
    </Modal>
  )
}

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAu7aGA02Xnk_FD2X5QqQjed4rXS5k5aKM",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ width: "100%", height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const [places, setPlaces] = useState([])
  const mapRef = useRef(null)
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [center, setCenter] = useState({ lat: 33.7832486, lng: -84.4130077 })
  const [activeMarker, setActiveMarker] = useState([])
  const [icon, setIcon] = useState("")
  const [carouselOpen, setCarouselOpen] = useState(false)

  const onInfoWindowClose = () => {
    setShowingInfoWindow(false)
  }
  const onMarkerClick = p => {
    setActiveMarker(p)
    setShowingInfoWindow(true)
  }
  useEffect(() => {
    searchNearby(props.search)
    return () => {}
  }, [props.search])
  useEffect(() => {
    setIcon(props.icon)
    return () => {}
  }, [props.data])
  useEffect(() => {
    searchNearby("transit_station")
    return () => {}
  }, [])
  const onOpenCarousel = () => {
    setCarouselOpen(true)
  }
  const searchNearby = search => {
    if (!search || search.length == 0) return

    const service = new google.maps.places.PlacesService(
      mapRef.current.context["__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED"]
    )

    // Specify location, radius and place types for your Places API search.
    const request = {
      location: center,
      radius: 3000,
      type: search,
      // query: "night",
      fields: [
        "name",
        "formatted_address",
        "place_id",
        "geometry",
        "photos",
        "id",
        "permanently_closed",
        "formatted_phone_number",
      ],
    }

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results)
      }
    })
  }
  return (
    <GoogleMap
      ref={mapRef}
      defaultZoom={props.zoom}
      defaultCenter={props.center}
      onClick={() => onInfoWindowClose()}
      defaultOptions={{
        styles: mapStyle,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.VERTICAL_BAR,
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
      }}
    >
      <Marker
        position={{ lat: 33.7831254, lng: -84.4125157 }}
        icon={StarImg}
        onClick={() => {
          window.open(
            "https://www.google.com/maps/dir//Star+Metals+Atlanta,+1050+Howell+Mill+Rd,+Atlanta,+GA+30318/@33.7833625,-84.4112816,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x88f504eb605297ed:0x98edf2c8f622a54b!2m2!1d-84.4121399!2d33.7834071!3e0",
            "_blank"
          )
        }}
      />

      {props.category != "travel" &&
        props.data.map(p => (
          <Marker
            defaultOptions={{ styles: { background: "red" } }}
            key={p.id}
            position={{
              lat: +p.address[0].latitude,
              lng: +p.address[0].longitude,
            }}
            onClick={() => onMarkerClick(p)}
            icon={icon}
          />
        ))}
      {props.category == "travel" &&
        places.map(p => (
          <Marker
            defaultOptions={{ styles: { background: "red" } }}
            key={p.name}
            position={p.geometry.location}
            onClick={() => onMarkerClick(p)}
            icon={icon}
          />
        ))}
      {showingInfoWindow && props.category != "travel" && (
        <InfoWindow
          position={{
            lat: +activeMarker.address[0].latitude,
            lng: +activeMarker.address[0].longitude,
          }}
          onCloseClick={() => onInfoWindowClose()}
          defaultOptions={{ style: { padding: 0 } }}
        >
          <div style={{ width: 256 }}>
            <MarkerLogo src={activeMarker.logo[0].url} />
            {activeMarker.heroShot.length > 0 && (
              <MarkerImg
                src={activeMarker.heroShot[0].url}
                onClick={() => onOpenCarousel()}
              />
            )}

            <MarkerTitle>{activeMarker.title}</MarkerTitle>
            <MarkerAddress>{`${activeMarker.address[0].address}`}</MarkerAddress>
            <MarkerPhone>{`${activeMarker.headlinend || ""}`}</MarkerPhone>
            <MarkerPhone>{`${activeMarker.descriptionnd || ""}`}</MarkerPhone>
          </div>
        </InfoWindow>
      )}
      {showingInfoWindow && props.category == "travel" && (
        <InfoWindow
          position={activeMarker.geometry.location}
          onCloseClick={() => onInfoWindowClose()}
          defaultOptions={{ style: { padding: 0 } }}
        >
          <div style={{ width: 256 }}>
            <MarkerTitle>{activeMarker.name}</MarkerTitle>
            {/* <MarkerAddress>{`${activeMarker.vicinity}`}</MarkerAddress> */}
          </div>
        </InfoWindow>
      )}
      <CarouselModal
        open={carouselOpen}
        onCloseModal={() => setCarouselOpen(false)}
        images={activeMarker.additionalImages || []}
      />
    </GoogleMap>
  )
})
export default MyMapComponent
