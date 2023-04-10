import React, { useState, useEffect } from "react"
import axios from "axios"
import { graphql } from "gatsby"
import Spinner from "react-spinkit"
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll"
import withLocation from "./../utils/withLocation"

import moment, { months } from "moment"
import Header from "../components/header/index"
import Prefooter from "../components/prefooter"
import Footer from "../components/footer"
import { getAllAvailabilities } from "./../utils/faunaApi"
import Hero2 from "../components/hero2"
import Brochure from "../components/brochure"
import Dropdown from "../components/dropdown"
import FloorResult from "../components/floorresult"
import FloorResult2 from "../components/floorresult2"
import FloorView from "../components/floorView"
import BuildingView from "../components/buildingView"
import UnitLayout from "../components/unitLayout"
import ListLayout from "../components/listLayout"
import DatePicker from "../components/datePicker"
import styled from "styled-components"

const LoadingLayout = styled.div`
  display: flex;
  justify-content: center;
`
const LoadingText = styled.div`
  text-align: center;
  font-family: "Overpass";
  font-size: 16px;
  margin-top: 20px;
`
import {
  Home,
  ViewButtonContainer,
  ViewButton,
  FilterContainer,
  Container3,
  Container2,
  Container1,
  Bedrooms,
  Bedrooms_1,
  Bedrooms_2,
  Availability,
  RentRange,
  Floor,
  BedroomsContainer,
  ResetFilter,
  BuildingLayout,
  BuildingViewLayout,
  ListViewLayout,
  DesktopLayout,
  MobileLayout,
  BuildingDesktopLayout,
  BuildingMobileLayout,
  RentRangeContainer,
} from "../styles/floorplan"
import SEO from "../components/seo"

const BareFloorPlans: React.FC = React.memo((props: any) => {
  const [loading, setLoading] = useState(true)
  const [amenities, setAmenities] = useState([])
  const [unitVisible, setUnitVisible] = useState(false)
  const [viewMode, setViewMode] = useState(true)
  const [currentFloor, setCurrentFloor] = useState(4)
  const [firstLoading, setFirstLoading] = useState(true)
  const [buildingUnits, setBuildingUnits] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [floorPlans, setFloorPlans] = useState([])
  const [searchFloorPlans, setSearchFloorPlans] = useState([])
  const [bedroomAll, setBedroomAll] = useState(true)
  const [bedroomStudio, setBedroomStudio] = useState(false)
  const [bedroomOne, setBedroomOne] = useState(false)
  const [bedroomTwo, setBedroomTwo] = useState(false)
  const [availabilities, setAvailabilities] = useState([])
  const [floorAvailabilities, setFloorAvailabilities] = useState([])
  const [filterDate, setFilterDate] = useState(new Date(2020, 7, 1))
  const [filterMin, setFilterMin] = useState("")
  const [filterMax, setFilterMax] = useState("")
  const [leaseMonths, setLeaseMonths] = useState([])
  const [leaseBedrooms, setLeaseBedrooms] = useState([])

  let [rentRange, setRentRange] = useState([])

  const [currentTitle, setCurrentTitle] = useState("")

  const [currentUnit, setCurrentUnit] = useState(null)
  const [similarUnits, setSimilarUnits] = useState([])
  let handleBuildingExpand = (title: any) => {
    let sel = buildingUnits.filter(item => item.title == title)[0]
    let current = {
      title: sel.title,
      mainImage:
        sel.associatedFloorPlanTypee[0].unitFloorPlans_mainImage[0].url,
      twoDImage: sel.associatedFloorPlanTypee[0].unitFloorPlans_twodView[0].url,
      threeDImage: sel.associatedFloorPlanTypee[0].unitFloorPlans_dView[0].url,
      balconyImage:
        !!sel.associatedFloorPlanTypee[0].balconyView.length &&
        sel.associatedFloorPlanTypee[0].balconyView[0].url,
      type: sel.associatedFloorPlanTypee[0].UnitfloorPlanDescription,
      floorPlan: sel.floorPlan,
      square:
        sel.associatedFloorPlanTypee[0].unitFloorPlans_interiorAreaSquareFeet,
      price: sel.price,
      MadeReadyDate: sel.MadeReadyDate,
      unitID: sel.unitID,
    }
    setCurrentUnit(current)
    let sim = buildingUnits
      .filter(
        item =>
          item.associatedFloorPlanTypee[0].UnitfloorPlanDescription ==
          sel.associatedFloorPlanTypee[0].UnitfloorPlanDescription
      )
      .slice(0, 5)

    setUnitVisible(true)
    setSimilarUnits(sim)
    setTimeout(() => {
      scroller.scrollTo("unitScrollElement", {
        duration: 500,
        smooth: true,
        spy: true,
        offset: -100,
      })
    }, 600)
  }
  const handleFloorplanExpand = (title: any) => {
    let sel = floorPlans.filter(item => item.title == title)[0]
    let current = {
      title: sel.title,
      mainImage: sel.unitFloorPlans_mainImage[0].url,
      twoDImage: sel.unitFloorPlans_twodView[0].url,
      threeDImage: sel.unitFloorPlans_dView[0].url,
      balconyImage: !!sel.balconyView.length && sel.balconyView[0].url,
      type: sel.UnitfloorPlanDescription,
      square: sel.unitFloorPlans_interiorAreaSquareFeet,
      minPrice: sel.minPrice,
      maxPrice: sel.maxPrice,
    }
    setCurrentUnit(current)
    let sim = floorPlans
      .filter(
        item => item.UnitfloorPlanDescription == sel.UnitfloorPlanDescription
      )
      .slice(0, 5)
    setUnitVisible(true)
    setSimilarUnits(sim)
    let avail = buildingUnits.filter(
      item =>
        item.associatedFloorPlanTypee[0].title == sel.title &&
        leaseMonths.filter(
          date =>
            moment(date).isSame(item.MadeReadyDate, "month") &&
            moment(date).isSame(item.MadeReadyDate, "year")
        ).length > 0
    )
    setFloorAvailabilities(avail)
    setTimeout(() => {
      scroller.scrollTo("unitScrollElement", {
        duration: 500,
        smooth: true,
        spy: true,
        offset: -100,
      })
    }, 600)
  }
  const initValues = async () => {
    const { search } = props
    let months = []
    for (var i = 0; i < 12; i++) {
      months.push(
        moment()
          .add(i, "M")
          .locale("en")
          .format("MMMM YYYY")
      )
    }
    let bedrooms = ["0", "1", "2"]
    if (Object.keys(search).length > 0) {
      months = search.months.split(",")
      bedrooms = search.bedrooms.split(",")

      setViewMode(false)
    }
    setLeaseMonths(months)
    setLeaseBedrooms(bedrooms)
    let res = await axios.get(
      `https://amcodigitalmedia.com/graphql?query={entries(section: "buildingUnits", site: "starMetalsResidential") {
      id
      ... on buildingUnits_buildingUnits_Entry {
        id
        title
        floorNumberofaptunit
        associatedFloorPlanTypee {
          id
          title
          ... on unitFloorTypes_unitFloorTypes_Entry {
            id
            UnitfloorPlanDescription
            title
            unitFloorPlans_mainImage {
              url
            }
            unitFloorPlans_dView {
              url
            }
            unitFloorPlans_numberOfBedrooms
            unitFloorPlans_numberOfBaths
            unitFloorPlans_twodView {
              url
            }
            unitFloorPlans_interiorAreaSquareFeet
            balconyView{
              url
            }
          }
          title
        }
      }      
    }}`
    )
    let tempBuildings = res.data.data.entries

    res = await axios.get(
      `https://amcodigitalmedia.com/graphql?query={
          entries(section: "unitFloorTypes", site: "starMetalsResidential") {
              ... on unitFloorTypes_unitFloorTypes_Entry {
                id
                unitFloorPlans_dView {
                  url
                }
                unitFloorPlans_mainImage {
                  url
                }
                unitFloorPlans_twodView {
                  url
                }
                unitFloorPlans_markFloorPlanAsSoldOut
                unitFloorPlans_numberOfBaths
                unitFloorPlans_numberOfBedrooms
                totalGrossUnitSquareFeet
                unitFloorPlans_interiorAreaSquareFeet
                UnitfloorPlanDescription
                balconyView{
                  url
                }
              }
              title
            }
        }`
    )
    let tempFloorplans = res.data.data.entries
    res = await axios.get(
      `https://amcodigitalmedia.com/graphql?query={
        entry(
          site: "starMetalsResidential"
          section: "realEstateProjects"
          slug: "star-metals-residential"
        ) {
          id
          ... on realEstateProjects_realEstateProjects_Entry {
            id
            apartmentAmenities {
              ... on apartmentAmenities_apartmentAmenityBlocks_BlockType {
                apttitle
                additionalImages {
                  url
                }
                heroImage {
                  url
                }
                subTitle
                shortDescription
                longDescription
                icon {
                  url
                }
              }
            }
          }
        }
      }`
    )
    setAmenities(res.data.data.entry.apartmentAmenities)

    res = await axios.get(
      "https://laravel.amcodigitalmedia.com/api/availabilities"
    )
    setAvailabilities(res.data)

    let maxRent = Math.max(...res.data.map((v: any) => v.BaseRentAmount))
    let minRent = Math.min(...res.data.map((v: any) => v.BaseRentAmount))
    let temp = []
    for (
      let i = parseInt(minRent / 100) * 100;
      i < parseInt(maxRent / 100 + 1) * 100;
      i += 200
    ) {
      temp = [...temp, i]
    }

    temp = [...temp, parseInt(maxRent / 100 + 1) * 100]

    setRentRange(temp)
    temp = []
    temp = tempBuildings.filter((unit: any) => {
      return res.data.filter(item => item.UnitNumber == unit.title).length > 0
    })
    temp = temp.map((unit: any) => {
      return {
        ...unit,
        price: res.data.filter(item => item.UnitNumber == unit.title)[0][
          "BaseRentAmount"
        ],
        unitID: res.data.filter(item => item.UnitNumber == unit.title)[0][
          "UnitID"
        ],
        type: unit.associatedFloorPlanTypee[0].UnitfloorPlanDescription,
        floorPlan: unit.associatedFloorPlanTypee[0].title,
        AvailableDate: res.data.filter(
          item => item.UnitNumber == unit.title
        )[0]["AvailableDate"],
        MadeReadyDate: res.data.filter(
          item => item.UnitNumber == unit.title
        )[0]["MadeReadyDate"],
      }
    })
    setBuildingUnits(temp)
    temp = []

    temp = tempFloorplans.filter((unit: any) => {
      return (
        res.data.filter(item => item.FloorPlanName == unit.title).length > 0 &&
        ((unit.UnitfloorPlanDescription == "studio" &&
          bedrooms.includes("0")) ||
          (unit.UnitfloorPlanDescription == "1Bed1Bath" &&
            bedrooms.includes("1")) ||
          (unit.UnitfloorPlanDescription == "2Bed2Bath" &&
            bedrooms.includes("2")))
      )
    })
    temp = temp.map((unit: any) => {
      return {
        ...unit,
        maxPrice: Math.max(
          ...res.data
            .filter(item => item.FloorPlanName == unit.title)
            .map(a => a.BaseRentAmount)
        ),
        minPrice: Math.min(
          ...res.data
            .filter(item => item.FloorPlanName == unit.title)
            .map(a => a.BaseRentAmount)
        ),
      }
    })
    setFloorPlans(temp)
    setLoading(false)
  }
  useEffect(() => {
    initValues()
    Events.scrollEvent.register("begin", function() {})

    Events.scrollEvent.register("end", function() {})
    return () => {
      Events.scrollEvent.remove("begin")
      Events.scrollEvent.remove("end")
    }
  }, [])
  const handleResetFilter = () => {
    setBedroomAll(true)
    setBedroomStudio(false)
    setBedroomOne(false)
    setBedroomTwo(false)
    setFilterMin("")
    setFilterMax("")
    setFilterDate(new Date())
    setCurrentFloor(0)
  }
  const handleSearch = (data, floor) => {}

  const onChangeMin = (e: any) => {
    !!filterMax
      ? parseInt(e) < parseInt(filterMax) && setFilterMin(parseInt(e))
      : setFilterMin(parseInt(e))
  }
  const onChangeMax = (e: any) => {
    !!filterMin
      ? parseInt(e) > parseInt(filterMin) && setFilterMax(parseInt(e))
      : setFilterMax(parseInt(e))
  }
  useEffect(() => {
    if (buildingUnits.length > 0) {
      let temp = []
      temp = buildingUnits.filter(item => {
        let bedroom = item.associatedFloorPlanTypee[0].UnitfloorPlanDescription
        return (
          (item.floorNumberofaptunit == currentFloor + 1 || !viewMode) &&
          (bedroomAll ||
            (bedroomStudio && bedroom == "studio") ||
            (bedroomOne && bedroom == "1Bed1Bath") ||
            (bedroomTwo && bedroom == "2Bed2Bath")) &&
          (!!filterMin ? item.price >= filterMin : true) &&
          (!!filterMax ? item.price <= filterMax : true) &&
          moment(filterDate).isSameOrAfter(item.MadeReadyDate)
        )
      })

      setSearchResults(temp)
    }
    return () => {}
  }, [
    currentFloor,
    filterMin,
    filterDate,
    filterMax,
    bedroomAll,
    bedroomOne,
    bedroomTwo,
    bedroomStudio,
    buildingUnits,
    viewMode,
  ])
  useEffect(() => {
    setUnitVisible(false)
    return () => {}
  }, [bedroomAll, bedroomOne, bedroomTwo, bedroomStudio])
  useEffect(() => {
    if (floorPlans.length > 0) {
      let temp2 = []
      temp2 = floorPlans.filter(item => {
        let bedroom = item.UnitfloorPlanDescription
        return (
          (bedroomAll ||
            (bedroomStudio && bedroom == "studio") ||
            (bedroomOne && bedroom == "1Bed1Bath") ||
            (bedroomTwo && bedroom == "2Bed2Bath")) &&
          (!!filterMin ? item.minPrice >= filterMin : true) &&
          (!!filterMax ? item.maxPrice <= filterMax : true)
        )
      })
      setSearchFloorPlans(temp2)
    }
    return () => {}
  }, [
    bedroomAll,
    filterMin,
    filterMax,
    bedroomOne,
    bedroomTwo,
    bedroomStudio,
    floorPlans,
  ])

  const onDateChange = date => {
    setFilterDate(date)
  }
  const onFilter = () => {}
  const {
    WebsitepageTitle,
    websiteKeywords,
    websitePageDescription,
    heroBlock,
    standardContentBlock,
    callToActionBlock,
  } = props.data.craft.entry
  return (
    <Home>
      <SEO
        title={WebsitepageTitle}
        keywords={websiteKeywords}
        description={websitePageDescription}
      />

      <DesktopLayout>
        <ViewButtonContainer>
          <ViewButton
            active={viewMode}
            onClick={() => {
              setViewMode(true)
              setUnitVisible(false)
            }}
          >
            BUILDING VIEW
          </ViewButton>
          <ViewButton
            active={!viewMode}
            onClick={() => {
              setViewMode(false)
              setUnitVisible(false)
            }}
          >
            LIST VIEW
          </ViewButton>
        </ViewButtonContainer>
      </DesktopLayout>
      <MobileLayout>
        <ViewButtonContainer>
          <ViewButton
            active={viewMode}
            onClick={() => {
              setViewMode(true)
              setUnitVisible(false)
            }}
          >
            BY FLOOR
          </ViewButton>
          <ViewButton
            active={!viewMode}
            onClick={() => {
              setViewMode(false)
              setUnitVisible(false)
            }}
          >
            BY FLOORPLAN
          </ViewButton>
        </ViewButtonContainer>
      </MobileLayout>

      <FilterContainer>
        <Container3>
          <Container1>
            <Bedrooms>
              <BedroomsContainer>
                <Bedrooms_1
                  onClick={() => {
                    if (!bedroomAll) {
                      setBedroomStudio(false)
                      setBedroomOne(false)
                      setBedroomTwo(false)
                    }
                    setBedroomAll(!bedroomAll)
                  }}
                  active={bedroomAll}
                >
                  ALL
                </Bedrooms_1>
                <Bedrooms_1
                  onClick={() => {
                    if (!bedroomStudio) {
                      setBedroomAll(false)
                    }
                    setBedroomStudio(!bedroomStudio)
                  }}
                  active={bedroomStudio}
                >
                  STUDIO
                </Bedrooms_1>
                <Bedrooms_1
                  onClick={() => {
                    if (!bedroomStudio) {
                      setBedroomAll(false)
                    }
                    setBedroomOne(!bedroomOne)
                  }}
                  active={bedroomOne}
                >
                  1
                </Bedrooms_1>
                <Bedrooms_1
                  onClick={() => {
                    if (!bedroomStudio) {
                      setBedroomAll(false)
                    }
                    setBedroomTwo(!bedroomTwo)
                  }}
                  active={bedroomTwo}
                >
                  2
                </Bedrooms_1>
              </BedroomsContainer>
            </Bedrooms>
            <Container2>
              <Availability>
                <DatePicker
                  date={filterDate}
                  onChange={(date: any) => onDateChange(date)}
                />
              </Availability>
              <RentRange>
                <RentRangeContainer>
                  <Dropdown
                    list={rentRange}
                    placeholder="MIN"
                    current={filterMin}
                    onChooseItem={e => onChangeMin(e)}
                  ></Dropdown>
                  <Dropdown
                    list={rentRange}
                    placeholder="MAX"
                    current={filterMax}
                    onChooseItem={e => onChangeMax(e)}
                  ></Dropdown>
                </RentRangeContainer>
              </RentRange>
            </Container2>
          </Container1>
          {viewMode ? (
            <Floor>
              <Dropdown
                list={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                current={currentFloor + 1}
                placeholder={`${currentFloor + 1}`}
                onChooseItem={e => {
                  setCurrentFloor(parseInt(e) - 1)
                }}
              ></Dropdown>
            </Floor>
          ) : null}
        </Container3>
        <ResetFilter onClick={() => handleResetFilter()}>
          RESET FILTER
        </ResetFilter>
      </FilterContainer>
      <Element name="unitScrollElement"></Element>
      {loading ? (
        <React.Fragment>
          <LoadingLayout>
            <Spinner name="cube-grid" size={32} color="#946a4d" />
          </LoadingLayout>
          <LoadingText>Loading your results...</LoadingText>
        </React.Fragment>
      ) : viewMode ? (
        <BuildingViewLayout>
          <BuildingDesktopLayout>
            {unitVisible ? (
              <UnitLayout
                unit={currentUnit}
                similarVisible={viewMode}
                viewType={false}
                similarUnits={similarUnits}
                amenities={amenities}
                filterDate={filterDate}
                availabilities={floorAvailabilities}
              ></UnitLayout>
            ) : null}

            <FloorResult
              setFloor={setCurrentFloor}
              floor={currentFloor}
              available={searchResults.length}
            ></FloorResult>
            <BuildingLayout>
              <BuildingView
                floor={currentFloor}
                onClickFloor={(floor: number) => setCurrentFloor(floor)}
              ></BuildingView>
              <FloorView
                floor={currentFloor}
                onClick={(title: any) => handleBuildingExpand(title)}
                selected={searchResults}
              ></FloorView>
            </BuildingLayout>
          </BuildingDesktopLayout>
          <BuildingMobileLayout>
            <FloorResult
              setFloor={setCurrentFloor}
              floor={currentFloor}
              available={searchResults.length}
            ></FloorResult>
            <BuildingLayout>
              <BuildingView
                floor={currentFloor}
                onClickFloor={(floor: number) => setCurrentFloor(floor)}
              ></BuildingView>
              <FloorView
                floor={currentFloor}
                onClick={(title: any) => handleBuildingExpand(title)}
                selected={searchResults}
              ></FloorView>
            </BuildingLayout>

            {unitVisible ? (
              <UnitLayout
                unit={currentUnit}
                similarVisible={viewMode}
                viewType={false}
                similarUnits={similarUnits}
                amenities={amenities}
                filterDate={filterDate}
                availabilities={floorAvailabilities}
              ></UnitLayout>
            ) : null}
          </BuildingMobileLayout>
        </BuildingViewLayout>
      ) : (
        <ListViewLayout>
          {unitVisible ? (
            <UnitLayout
              unit={currentUnit}
              similarVisible={viewMode}
              viewType={true}
              similarUnits={similarUnits}
              amenities={amenities}
              filterDate={filterDate}
              availabilities={floorAvailabilities}
            ></UnitLayout>
          ) : null}
          <FloorResult2 available={searchFloorPlans.length} />
          <ListLayout
            onUnitClick={(title: any) => {
              handleFloorplanExpand(title)
            }}
            units={searchFloorPlans}
            selected={currentUnit}
          ></ListLayout>
        </ListViewLayout>
      )}
    </Home>
  )
})

export default withLocation(BareFloorPlans)
export const floorplanQuery = graphql`
  query {
    craft {
      entry(section: "smrFloorplans", site: "starMetalsResidential") {
        ... on Craft_smrFloorplans_smrFloorplans_Entry {
          id
          heroBlock {
            ... on Craft_heroBlock_BlockType {
              heroImage {
                url
              }
              headline
              subHeadline
              callToActionText
              callToActionLink
            }
          }
          callToActionBlock {
            ... on Craft_callToActionBlock_BlockType {
              id
              heroImage {
                url
              }
              backgroundImage {
                url
              }
              headline
              subHeadline
              callToActionTextblock
              callToActionLinkblock
            }
          }
          WebsitepageTitle
          websiteKeywords
          websitePageDescription
        }
      }
    }
  }
`
