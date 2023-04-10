import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { uniq } from "lodash"
import GoogleMap from "google-map-react"
import { MdSearch } from "react-icons/md"
import BrushIcon from "./../../assets/icons/brush.svg"
import BusIcon from "./../../assets/icons/bus.svg"
import CartIcon from "./../../assets/icons/cart.svg"
import CoffeeIcon from "./../../assets/icons/coffee.svg"
import ScholarIcon from "./../../assets/icons/scholar.svg"
import SpoonIcon from "./../../assets/icons/spoon.svg"
import SunIcon from "./../../assets/icons/sun.svg"
import BriefcaseIcon from "./../../assets/icons/briefcase.svg"

import {
  FaPaintBrush,
  FaGraduationCap,
  FaUtensils,
  FaCoffee,
  FaSun,
  FaBriefcase,
  FaShoppingBag,
  FaBus,
  FaFileExcel,
} from "react-icons/fa"
import Map from "./map"

import Marker from "./marker"
const K_SIZE = 40

const MenuContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 12px 0;
  position: absolute;
  z-index: 99;
  margin-top: 10px;
  margin-left: 40px;
  @media screen and (max-width: 767px) {
    margin-left: calc(50% - 150px);
  }
`

const MenuItemContainer = styled.div`
  overflow: hidden;
  transition: all 300ms ease-in-out;
  width: 300px;
  max-height: ${props => (props.collapse ? "0" : "600px")};
  @media screen and (max-width: 767px) {
    width: 240px;
  }
`
const MenuItem = styled.div`
  color: white;
  font-size: 16px;
  line-height: 16px;
  width: 300px;
  cursor: pointer;
  font-family: "Noto Sans KR";
  padding: 16px 12px;
  transition: all 300ms ease-in-out;
  background: ${props => (props.active ? "#02075d" : "transparent")};
  display: flex;

  &:hover {
    text-align: left;
    background: rgba(0, 0, 0, 0.6);
  }
  @media screen and (max-width: 767px) {
    width: 240px;
    padding: 12px 8px;
    font-size: 12px;
    line-height: 12px;
  }
`
const MenuItemIcon = styled.div`
  margin-right: 12px;
`
const MenuSearchContainer = styled.div`
  border-bottom: 1px solid rgba(255, 255, 2550, 0.6);
  padding: 12px;
  background: transparent;
  display: flex;
`

const MenuSearch = styled.input`
  width: 100%;
  font-size: 16px;
  line-height: 16px;
  font-family: "Noto Sans KR";
  text-align: left;
  background: transparent;
  color: rgb(255, 255, 255, 0.9);
  outline: none;
  border: none;
`

export default function Container() {
  const onMarkerClick = () => {}
  const onInfoWindowClose = () => {}
  const [search, setSearch] = useState({})
  const [menuCollapse, setMenuCollapse] = useState(0)
  const [mapData, setMapData] = useState([])
  const [categories, setCategories] = useState([])
  const [terms, setTerms] = useState({
    artsEntertainment: {
      icon: <FaPaintBrush size={16} />,
      name: "Arts & Entertainment",
      search: ["museum"],
      svg: BrushIcon,
      key: "artsEntertainment",
    },
    university: {
      icon: <FaGraduationCap />,
      name: "Colleges & Universities",
      search: ["university"],
      svg: ScholarIcon,
      key: "university",
    },
    restaurants: {
      icon: <FaUtensils />,
      name: "Restaurants",
      search: ["restaurant"],
      svg: SpoonIcon,
      key: "restaurants",
    },
    coffee: {
      icon: <FaCoffee />,
      name: "Nightlife Spots",
      search: ["night_club"],
      svg: CoffeeIcon,
      key: "coffee",
    },
    office: {
      icon: <FaBriefcase />,
      name: "Professional",
      search: ["local_government_office"],
      svg: BriefcaseIcon,
      key: "office",
    },
    retailers: {
      icon: <FaShoppingBag />,
      name: "Shopping",
      search: ["shopping_mall"],
      svg: CartIcon,
      key: "retailers",
    },
    travel: {
      icon: <FaBus />,
      name: "Transit",
      search: ["travel_agency"],
      svg: BusIcon,
      key: "travel",
    },
  })

  useEffect(() => {
    axios
      .get(
        `
      https://amcodigitalmedia.com/graphql?query={entries(section: "neighborhoodDynamics", site: "starMetalsResidential") {
      id
      ... on neighborhoodDynamics_neighborhoodDynamics_Entry {
        id
        title
        typeOfEstablishment
        heroShot {
          url
        }
        logo {
          url
        }
        additionalImages {
          url
        }
        descriptionnd
        headlinend
        address {
          address
          address2
          city
          col1
          col2
          col3
          col4
          col5
          col6
          col7
          latitude
          longitude
          zipcode
          state
        }
      }
    }}
    `
      )
      .then(res => {
        setMapData(res.data.data.entries)

        let catNames = uniq(
          res.data.data.entries.map(data => data.typeOfEstablishment)
        )
        let categories = catNames.map(name => terms[name])
        categories = [...categories, terms["travel"]]
        setCategories(categories)
      })

    return () => {}
  }, [])
  const [selectedData, setSelectedData] = useState([])
  const [center, setCenter] = useState([33.7832909, -84.4132521])
  const onTextChange = value => {
    // setSearch(terms.filter(term => term.name === value)[0])
  }
  const onSelectCategory = category => {}
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
      }}
    >
      <MenuContainer>
        <MenuSearchContainer>
          <MenuSearch
            onChange={e => {}}
            placeholder="EXPLORE THE AREA"
            value={search.name || ""}
            onFocus={() => {
              setMenuCollapse(0)
            }}
          ></MenuSearch>
          {/* <MdSearch color="white" size={24} /> */}
        </MenuSearchContainer>
        <MenuItemContainer collapse={menuCollapse}>
          {categories.map(term => {
            return (
              <MenuItem
                key={term.key}
                onClick={() => {
                  setSearch(term)
                  setMenuCollapse(1)
                  setSelectedData(
                    mapData.filter(data => data.typeOfEstablishment == term.key)
                  )
                }}
                active={term.name === search.name ? 1 : 0}
              >
                <MenuItemIcon>{term.icon}</MenuItemIcon>
                {term.name}
              </MenuItem>
            )
          })}
        </MenuItemContainer>
      </MenuContainer>
      <Map
        category={search.key}
        data={selectedData}
        icon={search.svg}
        zoom={16}
        center={{ lat: 33.7832909, lng: -84.4132521 }}
      ></Map>
    </div>
  )
}
