import React, { useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import renderHTML from "react-render-html"
import Swiper from "react-id-swiper"

import "swiper/css/swiper.css"
import {
  Container,
  Header,
  Symbol,
  Title,
  Desc,
  ImgContainer,
  Img1,
  Img2,
  Content,
  Amenity,
  DesktopLayout,
  MobileLayout,
  SlideView,
} from "./styles"
interface Props {
  type: string
}
const swiperParams = {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: false,
  spaceBetween: 0,
}
export default function SelectedAmenity({ type }: Props) {
  const [currentAmenity, setCurrentAmenity] = useState(null)
  return (
    <StaticQuery
      query={graphql`
        query amenityQuery {
          craft {
            entry(
              site: "starMetalsResidential"
              section: "realEstateProjects"
              slug: "star-metals-residential"
            ) {
              id
              ... on Craft_realEstateProjects_realEstateProjects_Entry {
                id
                apartmentAmenities {
                  ... on Craft_apartmentAmenities_apartmentAmenityBlocks_BlockType {
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
                communityAmenities {
                  ... on Craft_communityAmenities_communityAmenityBlocks_BlockType {
                    id
                    additionalImages {
                      url
                    }
                    heroImage {
                      url
                    }
                    subTitle
                    shortDescription
                    longDescription
                    comtitle
                    icon {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data: any) => {
        const { apartmentAmenities, communityAmenities } = data.craft.entry
        let amenities
        type == "apartment"
          ? (amenities = apartmentAmenities)
          : (amenities = communityAmenities)
        !!currentAmenity ? null : setCurrentAmenity(amenities[0])
        return (
          <Container>
            <Content>
              {amenities.map((amenity: any, index: any) => {
                return !!currentAmenity &&
                  JSON.stringify(amenity) === JSON.stringify(currentAmenity) ? (
                  <React.Fragment key={index}>
                    <Header>
                      <div style={{ display: "flex" }}>
                        <Symbol
                          url={
                            !!currentAmenity ? currentAmenity.icon[0].url : ""
                          }
                        ></Symbol>
                        <Title>
                          {renderHTML(
                            type == "apartment"
                              ? amenity.apttitle
                              : amenity.comtitle
                          )}
                        </Title>
                      </div>
                    </Header>
                    <Desc>
                      {renderHTML(
                        !!currentAmenity ? currentAmenity.longDescription : ""
                      )}
                    </Desc>
                    <ImgContainer>
                      {currentAmenity.heroImage.length === 0 &&
                      currentAmenity.additionalImages.length === 0 ? null : (
                        <React.Fragment>
                          <DesktopLayout>
                            <Img1 url={currentAmenity.heroImage[0].url}></Img1>
                            <Img2
                              url={currentAmenity.additionalImages[0].url}
                            ></Img2>
                          </DesktopLayout>
                          <MobileLayout>
                            <Swiper {...swiperParams}>
                              <SlideView
                                url={currentAmenity.heroImage[0].url}
                              ></SlideView>
                              <SlideView
                                url={currentAmenity.additionalImages[0].url}
                              ></SlideView>
                            </Swiper>
                          </MobileLayout>
                        </React.Fragment>
                      )}
                    </ImgContainer>
                  </React.Fragment>
                ) : (
                  <Amenity
                    icon={amenity.icon[0].url}
                    key={index}
                    active={false}
                    onClick={() => {
                      setCurrentAmenity(amenity)
                    }}
                  >
                    {renderHTML(
                      type == "apartment" ? amenity.apttitle : amenity.comtitle
                    )}
                  </Amenity>
                )
              })}
            </Content>
          </Container>
        )
      }}
    />
  )
}
