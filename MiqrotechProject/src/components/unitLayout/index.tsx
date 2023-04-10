import React, { useState, useEffect } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"
import TourModal from "./../tourModal/modal"
import styled from "styled-components"
import {
  Container,
  UnitImg,
  UnitName,
  UnitImgBack,
  UnitImgFooter,
  UnitImgFooterItem,
  InfoSection,
  FirstSection,
  FirstSection_1,
  Info,
  DetailsContainer,
  InfoItem,
  AvailabilityContainer,
  FirstSection_2,
  Button,
  AmenityContainer,
  DesktopLayout,
  MobileLayout,
  SimilarUnits,
  SimilarUnits_Title,
  SimilarUnits_Table,
  SimilarUnits_Header,
  HeaderItem,
  SimilarUnits_Content,
  SimilarItem,
  SimilarItemInfo,
  SimilarItemCaret,
  SimilarItemUnit,
  SimilarMobileItemInfo,
  TabletButtonContainer,
  TabletDetailContainer,
  TabletDetail,
  TabletDesc,
  UnitImgSliderView,
} from "./styles"
import Swiper from "react-id-swiper"
import renderHTML from "react-render-html"
import moment from "moment"
import "swiper/css/swiper.css"
import Image3 from "./../../assets/img/3d.png"
import ViewImg from "./../../assets/img/imgview.svg"
interface Props {
  unit: any
  similarVisible: boolean
  viewType: boolean
  similarUnits: Array<any>
  amenities: Array<any>
  availabilities: Array<any>
  filterDate: any
}
const swiperParams = {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  spaceBetween: 0,
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: true,
  // },
}
const SimilarMobileItemTitle = styled.div`
  font-family: "Overpass";
  font-size: 14px;
  line-height: 36px;
  border-bottom: 1px solid #636569;
  color: #231f20;
  font-weight: bold;
`
const SimilarMobileItemSpec = styled.div`
  font-family: "Overpass";
  font-size: 12px;
  line-height: 30px;
  color: #231f20;
  &:first-child {
    margin-top: 8px;
  }
  &:last-child {
    margin-bottom: 8px;
  }
`
const UnitTabletLayout = styled.div`
  display: block;
  @media screen and (max-width: 767px) {
    display: none;
  }
`
const UnitMobileLayout = styled.div`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
    margin-bottom: 40px;
  }
`
const SimilarMobileItemAction = styled.a`
  font-family: "Overpass";
  border: 1px solid #231f20;
  color: #231f20;
  font-size: 10px;
  line-height: 50px;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  display: block;
  font-weight: bold;
  &:hover {
    text-decoration: none;
    color: #231f20;
  }
`
const SimilarItemAction = styled.a`
  width: 16.6%;
  border-top: 1px solid #231f20;
  height: 100px;
  line-height: 100px;
  font-size: 16px;
  font-family: "Overpass";
  text-align: left;
  color: #231f20;
  &:hover {
    text-decoration: none;
    color: #231f20;
  }
`
const AvailabilityActionWrapper = styled.div`
  width: 16.6%;
  border-top: 1px solid #231f20;
  height: 100px;
  display: flex;
  flex-direction: column;
`
const AvailabilityAction = styled.a`
  display: block;
  border: 1px solid #946a4d;
  background-color: #946a4d;
  font-size: 16px;
  font-family: "Overpass";
  color: white;
  transition: 200ms all ease;
  margin-top: auto;
  margin-bottom: auto;
  width: fit-content;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  &:hover {
    cursor: pointer;
    text-decoration: none;
    background: white;
    color: #946a4d;
  }
`
const DesktopLeaseNowButton = styled.a`
  width: 300px;
  height: 75px;
  line-height: 75px;
  color: white;
  letter-spacing: 3px;
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  border: 1px solid #946a4d;
  background-color: #946a4d;
  font-family: "Overpass";
  margin-left: 25px;
  margin-top: 0;
  display: block;
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
    margin-top: 15px;
    line-height: 50px;
    height: 50px;
    font-size: 10px;
  }
  &:hover {
    text-decoration: none;
    color: white;
  }
`
const AvailabilitiesHeading = styled.div`
  font-size: 22px;
  font-weight: bold;
  font-family: "Overpass";
  text-align: left;
  color: #231f20;

  @media screen and (max-width: 1024px) {
    font-size: 14px;
    color: #636569;
  }
  @media screen and (max-width: 767px) {
    font-size: 14px;
    color: #636569;
  }
`
const AvailabilitiesContainer = styled.div`
  @media screen and (max-width: 1024px) {
    margin-top: 40px;
  }
`
const AvailabilitiesHeader = styled(HeaderItem)`
  width: 20%;
`
const AvailabilitiesInfo = styled(SimilarItemInfo)`
  width: 20%;
`
import "./style.scss"
export default function UnitLayout({
  unit,
  similarVisible,
  viewType,
  similarUnits,
  amenities,
  filterDate,
  availabilities,
}: Props) {
  const [view, setView] = useState(0)
  const [checkAvailability, setCheckAvailability] = useState(false)
  const [tourShow, setTourShow] = useState(false)
  useEffect(() => {
    viewType && setCheckAvailability(false)
    return () => { }
  }, [viewType])

  return (
    <Container>
      <UnitImg>
        <UnitImgBack>
          {view === 0 ? (
            <Swiper {...swiperParams}>
              <UnitImgSliderView img={unit.twoDImage} />
              <UnitImgSliderView img={unit.mainImage} />
              <UnitImgSliderView img={unit.threeDImage} />
            </Swiper>
          ) : view === 1 ? (
            <UnitImgSliderView img={unit.balconyImage} />
          ) : null}
        </UnitImgBack>
        <UnitName>
          {viewType ? `${unit.title}` : `${unit.floorPlan} Unit ${unit.title}`}
        </UnitName>
        <UnitImgFooter>
          <UnitImgFooterItem active={view == 0} onClick={() => setView(0)}>
            FLOOR PLAN
          </UnitImgFooterItem>
          {!!unit.balconyImage && (
            <UnitImgFooterItem active={view == 1} onClick={() => setView(1)}>
              VIEW
            </UnitImgFooterItem>
          )}

          <UnitImgFooterItem
            active={false}
            onClick={() =>
              window.open(
                `https://amcodigitalmedia.com/pdfgen/pdfgenerator.php?title=${viewType ? unit.title : unit.floorPlan
                }`,
                "_blank"
              )
            }
          >
            PDF
          </UnitImgFooterItem>
        </UnitImgFooter>
      </UnitImg>
      <InfoSection>
        <DesktopLayout>
          <FirstSection>
            <FirstSection_1>
              <Info name="Details">
                <DetailsContainer>
                  <InfoItem>
                    {unit.type == "1Bed1Bath"
                      ? "1 Bed / 1 Bath"
                      : unit.type == "2Bed2Bath"
                        ? "2 Bed / 2 Bath"
                        : "Studio"}
                  </InfoItem>
                  {parseInt(unit.balconySf) > 0 ? (
                    <React.Fragment>
                      <InfoItem>{`${unit.square} Interior SF`}</InfoItem>
                      <InfoItem>{`${unit.balconySf} Balcony SF`}</InfoItem>
                      <InfoItem>{`${unit.totalGrossUnitSquareFeet} Total SF`}</InfoItem>
                    </React.Fragment>
                  ) : (
                    <InfoItem>{`${unit.square} Square Feet`}</InfoItem>
                  )}

                  <InfoItem>
                    {viewType
                      ? `$${unit.minPrice} - $${unit.maxPrice}`
                      : `Starting at $${unit.price}`}
                  </InfoItem>
                </DetailsContainer>
              </Info>
              {viewType ? null : (
                <Info name="Availability">
                  <AvailabilityContainer>
                    <InfoItem>{moment(unit.MadeReadyDate).format(
                      "MM/DD/YYYY"
                    )}</InfoItem>
                  </AvailabilityContainer>
                </Info>
              )}
            </FirstSection_1>
            <FirstSection_2>
              <Button onClick={() => setTourShow(true)}>SCHEDULE A TOUR</Button>
              {viewType ? (
                <Button
                  onClick={() => {
                    setCheckAvailability(true);
                  }}
                >
                  CHECK AVAILABILITY
                </Button>
              ) : (
                <DesktopLeaseNowButton
                  href={`https://8147545.onlineleasing.realpage.com/?MoveInDate=${moment(
                    filterDate
                  ).format("MM/DD/YYYY")}&UnitId=${unit.unitID
                    }&SearchUrl=https://starmetalsresidences.com/floorplan/`}
                  target="_blank"
                >
                  LEASE NOW
                </DesktopLeaseNowButton>
              )}
            </FirstSection_2>
          </FirstSection>
          {checkAvailability ? (
            <AvailabilitiesContainer>
              <AvailabilitiesHeading>Availability</AvailabilitiesHeading>
              <SimilarUnits_Table>
                <DesktopLayout>
                  <SimilarUnits_Header>
                    <AvailabilitiesHeader>Unit Number</AvailabilitiesHeader>
                    <AvailabilitiesHeader>Floor</AvailabilitiesHeader>
                    <AvailabilitiesHeader>Starting At</AvailabilitiesHeader>
                    <AvailabilitiesHeader>Availability</AvailabilitiesHeader>
                    <AvailabilitiesHeader>Action</AvailabilitiesHeader>
                  </SimilarUnits_Header>
                  <SimilarUnits_Content>
                    {availabilities.map(unit => {
                      return (
                        <SimilarItem key={unit.title}>
                          <AvailabilitiesInfo>
                            Unit {unit.title}
                          </AvailabilitiesInfo>
                          <AvailabilitiesInfo>
                            Floor {unit.floorNumberofaptunit}
                          </AvailabilitiesInfo>
                          <AvailabilitiesInfo>{`$${unit.price ||
                            unit.minPrice}`}</AvailabilitiesInfo>

                          <AvailabilitiesInfo>
                            {`${moment(filterDate).isSameOrAfter(
                              unit.MadeReadyDate
                            )
                              ? "Available Now"
                              : moment(unit.MadeReadyDate).format(
                                "MM/DD/YYYY"
                              )
                              }`}
                          </AvailabilitiesInfo>
                          <AvailabilityActionWrapper>
                            <AvailabilityAction
                              href={`https://8147545.onlineleasing.realpage.com/?MoveInDate=${moment(filterDate).isSameOrAfter(
                                unit.MadeReadyDate
                              )
                                ? moment(filterDate).format("MM/DD/YYYY")
                                : moment(unit.MadeReadyDate).format(
                                  "MM/DD/YYYY"
                                )
                                }&UnitId=${unit.unitID
                                }&SearchUrl=https://starmetalsresidences.com/floorplan/`}
                              target="_blank"
                            >
                              LEASE NOW
                            </AvailabilityAction>
                          </AvailabilityActionWrapper>
                          <SimilarItemCaret>
                            <MdKeyboardArrowRight
                              size={42}
                              color="#636569"
                            ></MdKeyboardArrowRight>
                          </SimilarItemCaret>
                        </SimilarItem>
                      )
                    })}
                  </SimilarUnits_Content>
                </DesktopLayout>
              </SimilarUnits_Table>
            </AvailabilitiesContainer>
          ) : null}
          <Info name="Featured Amenities">
            <AmenityContainer>
              {amenities.map(amenity => {
                return (
                  <InfoItem key={amenity.apttitle}>
                    {renderHTML(amenity.apttitle)}
                  </InfoItem>
                )
              })}
            </AmenityContainer>
          </Info>
        </DesktopLayout>
        <MobileLayout>
          {viewType ? (
            <React.Fragment>
              <TabletDetailContainer>
                <TabletDetail>
                  <div>
                    {unit.type == "1Bed1Bath"
                      ? "1 Bed / 1 Bath"
                      : unit.type == "2Bed2Bath"
                        ? "2 Bed / 2 Bath"
                        : "Studio"}
                  </div>
                </TabletDetail>
                <TabletDetail>
                  {parseInt(unit.balconySf) > 0 ? (
                    <React.Fragment>
                      <div>{`${unit.square} Interior SF`}</div>
                      <div>{`${unit.balconySf} Balcony SF`}</div>
                      <div>{`${unit.totalGrossUnitSquareFeet} Total SF`}</div>
                    </React.Fragment>
                  ) : (
                    <div>{`${unit.square} Square Feet`}</div>
                  )}
                </TabletDetail>
                <TabletDetail>
                  <div>{`$${unit.minPrice}-${unit.maxPrice}`}</div>
                </TabletDetail>
              </TabletDetailContainer>
              <TabletDesc>
                <AmenityContainer>
                  {amenities.map(amenity => {
                    return (
                      <InfoItem key={amenity.apttitle}>
                        {renderHTML(amenity.apttitle)}
                      </InfoItem>
                    )
                  })}
                </AmenityContainer>
              </TabletDesc>
              <TabletButtonContainer>
                <Button onClick={() => setTourShow(true)}>
                  SCHEDULE A TOUR
                </Button>
                <Button
                  onClick={() => {
                    setCheckAvailability(true)
                  }}
                >
                  CHECK AVAILABILITY
                </Button>
              </TabletButtonContainer>
              {checkAvailability ? (
                <AvailabilitiesContainer>
                  <AvailabilitiesHeading></AvailabilitiesHeading>
                  <SimilarUnits_Table>
                    <MobileLayout>
                      <SimilarUnits_Content>
                        {availabilities.map(unit =>
                        (
                          <SimilarItem key={unit.title}>
                            <SimilarMobileItemTitle>
                              {`Unit ${unit.title}`}
                            </SimilarMobileItemTitle>
                            <div>
                              <SimilarMobileItemSpec>
                                {`Floor ${unit.floorNumberofaptunit}`}
                              </SimilarMobileItemSpec>
                              <SimilarMobileItemSpec>{`Starting At: $${unit.price ||
                                unit.minPrice}`}</SimilarMobileItemSpec>

                              <SimilarMobileItemSpec>{`Availability: ${moment(filterDate).isSameOrAfter(
                                unit.MadeReadyDate
                              )
                                ? "Available Now"
                                : moment(unit.MadeReadyDate).format(
                                  "MM/DD/YYYY"
                                )
                                }`}</SimilarMobileItemSpec>
                            </div>
                            <SimilarMobileItemAction
                              href={`https://8147545.onlineleasing.realpage.com/?MoveInDate=${moment(filterDate).isSameOrAfter(
                                unit.MadeReadyDate
                              )
                                ? moment(filterDate).format("MM/DD/YYYY")
                                : moment(unit.MadeReadyDate).format(
                                  "MM/DD/YYYY"
                                )
                                }&UnitId=${unit.unitID
                                }&SearchUrl=https://starmetalsresidences.com/floorplan/`}
                              target="_blank"
                            >
                              LEASE NOW
                              </SimilarMobileItemAction>
                          </SimilarItem>
                        )
                        )}
                      </SimilarUnits_Content>
                    </MobileLayout>
                  </SimilarUnits_Table>
                </AvailabilitiesContainer>
              ) : null}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <FirstSection>
                <FirstSection_1>
                  <Info name="Details">
                    <DetailsContainer>
                      <InfoItem>
                        {unit.type == "1Bed1Bath"
                          ? "1 Bed / 1 Bath"
                          : unit.type == "2Bed2Bath"
                            ? "2 Bed / 2 Bath"
                            : "Studio"}
                      </InfoItem>
                      {parseInt(unit.balconySf) > 0 ? (
                        <React.Fragment>
                          <InfoItem>{`${unit.square} Interior SF`}</InfoItem>
                          <InfoItem>{`${unit.balconySf} Balcony SF`}</InfoItem>
                          <InfoItem>{`${unit.totalGrossUnitSquareFeet} Total SF`}</InfoItem>
                        </React.Fragment>
                      ) : (
                        <InfoItem>{`${unit.square} Square Feet`}</InfoItem>
                      )}
                      <InfoItem>{`Starting at $${unit.price}`}</InfoItem>
                    </DetailsContainer>
                  </Info>
                  <Info name="Availability">
                    <AvailabilityContainer>
                      <InfoItem>08/01/2020</InfoItem>
                    </AvailabilityContainer>
                  </Info>
                </FirstSection_1>
                <UnitMobileLayout>
                  <Info name="Featured Amenities">
                    <AmenityContainer>
                      {amenities.map(amenity => {
                        return (
                          <InfoItem key={amenity.apttitle}>
                            {renderHTML(amenity.apttitle)}
                          </InfoItem>
                        )
                      })}
                    </AmenityContainer>
                  </Info>
                </UnitMobileLayout>
                <FirstSection_2>
                  <Button onClick={() => setTourShow(true)}>
                    SCHEDULE A TOUR
                  </Button>
                  <DesktopLeaseNowButton
                    href={`https://8147545.onlineleasing.realpage.com/?MoveInDate=${moment(filterDate).isSameOrAfter(unit.MadeReadyDate)
                      ? moment(filterDate).format("MM/DD/YYYY")
                      : moment(unit.MadeReadyDate).format("MM/DD/YYYY")
                      }&UnitId=${unit.unitID
                      }&SearchUrl=https://starmetalsresidences.com/floorplan/`}
                    target="_blank"
                  >
                    LEASE NOW
                  </DesktopLeaseNowButton>
                </FirstSection_2>
              </FirstSection>
              <Info name="Featured Amenities">
                <AmenityContainer>
                  {amenities.map(amenity => {
                    return (
                      <InfoItem key={amenity.apttitle}>
                        {renderHTML(amenity.apttitle)}
                      </InfoItem>
                    )
                  })}
                </AmenityContainer>
              </Info>
            </React.Fragment>
          )}
        </MobileLayout>
      </InfoSection>
      <SimilarUnits visible={similarVisible}>
        <SimilarUnits_Title>Similar Units</SimilarUnits_Title>
        <SimilarUnits_Table>
          <DesktopLayout>
            <SimilarUnits_Header>
              <HeaderItem>Unit Number</HeaderItem>
              <HeaderItem>Floor</HeaderItem>
              <HeaderItem>Starting At</HeaderItem>
              <HeaderItem>Detail</HeaderItem>
              <HeaderItem>Availability</HeaderItem>
              <HeaderItem>Action</HeaderItem>
            </SimilarUnits_Header>
            <SimilarUnits_Content>
              {similarUnits.map(unit => {
                return (
                  <SimilarItem key={unit.title}>
                    <SimilarItemInfo>Unit {unit.title}</SimilarItemInfo>
                    <SimilarItemInfo>
                      Floor {unit.floorNumberofaptunit}
                    </SimilarItemInfo>
                    <SimilarItemInfo>{`$${unit.price ||
                      unit.minPrice}`}</SimilarItemInfo>
                    <SimilarItemInfo>{` ${unit.type == "1Bed1Bath"
                      ? "1 Bed / 1 Bath"
                      : unit.type == "2Bed2Bath"
                        ? "2 Bed / 2 Bath"
                        : "Studio"
                      }`}</SimilarItemInfo>
                    <SimilarItemInfo>
                      {moment(filterDate).isSameOrAfter(unit.MadeReadyDate)
                        ? "Available Now"
                        : moment(unit.MadeReadyDate).format("MM/DD/YYYY")}
                    </SimilarItemInfo>
                    <AvailabilityActionWrapper>
                      <AvailabilityAction
                        href={`https://8147545.onlineleasing.realpage.com/?MoveInDate=${moment(filterDate).isSameOrAfter(unit.MadeReadyDate)
                          ? moment(filterDate).format("MM/DD/YYYY")
                          : moment(unit.MadeReadyDate).format("MM/DD/YYYY")
                          }&UnitId=${unit.unitID
                          }&SearchUrl=https://starmetalsresidences.com/floorplan/`}
                        target="_blank"
                      >
                        LEASE NOW
                      </AvailabilityAction>
                    </AvailabilityActionWrapper>
                    <SimilarItemCaret>
                      <MdKeyboardArrowRight
                        size={42}
                        color="#636569"
                      ></MdKeyboardArrowRight>
                    </SimilarItemCaret>
                  </SimilarItem>
                )
              })}
            </SimilarUnits_Content>
          </DesktopLayout>
          <MobileLayout>
            <SimilarUnits_Content>
              {similarUnits.map(unit => {
                return (
                  <SimilarItem key={unit.title}>
                    <SimilarMobileItemTitle>
                      {`Unit ${unit.title}`}
                    </SimilarMobileItemTitle>
                    <div>
                      <SimilarMobileItemSpec>
                        {`Floor ${unit.floorNumberofaptunit}`}
                      </SimilarMobileItemSpec>
                      <SimilarMobileItemSpec>{`Starting At: $${unit.price ||
                        unit.minPrice}`}</SimilarMobileItemSpec>
                      <SimilarMobileItemSpec>{`Detail: ${unit.type == "1Bed1Bath"
                        ? "1 Bed / 1 Bath"
                        : unit.type == "2Bed2Bath"
                          ? "2 Bed / 2 Bath"
                          : "Studio"
                        }`}</SimilarMobileItemSpec>
                      <SimilarMobileItemSpec>{`Availability: ${moment(filterDate).isSameOrAfter(unit.MadeReadyDate)
                        ? "Available Now"
                        : moment(unit.MadeReadyDate).format("MM/DD/YYYY")
                        }`}</SimilarMobileItemSpec>
                    </div>
                    <SimilarMobileItemAction
                      href={`https://8147545.onlineleasing.realpage.com/?MoveInDate=${moment(filterDate).isSameOrAfter(unit.MadeReadyDate)
                        ? moment(filterDate).format("MM/DD/YYYY")
                        : moment(unit.MadeReadyDate).format("MM/DD/YYYY")
                        }&UnitId=${unit.unitID
                        }&SearchUrl=https://starmetalsresidences.com/floorplan/`}
                      target="_blank"
                    >
                      LEASE NOW
                    </SimilarMobileItemAction>
                  </SimilarItem>
                )
              })}
            </SimilarUnits_Content>
          </MobileLayout>
        </SimilarUnits_Table>
      </SimilarUnits>

      <TourModal open={tourShow} onClose={() => setTourShow(false)} />
    </Container>
  )
}
