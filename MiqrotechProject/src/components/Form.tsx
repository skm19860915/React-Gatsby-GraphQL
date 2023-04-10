import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import gsap from "gsap";
import loadable from "@loadable/component";

import colors from "@styles/colors";
import text from "@styles/text";
import media from "@styles/media";

import AccentPNG from "@png/accentBG.png";

import useMedia from "@hooks/useMedia";

const PrimaryButton = loadable(() => import("@components/PrimaryButton"));

type props = {
  open: boolean;
  openForm: any;
};

const Form: React.FC<props> = ({ open, openForm }) => {
  const wrapperRef = useRef(null);
  const selectRef = useRef(null);
  const chevronRef = useRef(null);
  const formRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const [selectOpen, setSelectOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [info, setInfo] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectTl, setSelectTl] = useState(gsap.timeline());
  const selectHeight = useMedia("9.514vw", "9.514vw", "15.9vw", "35vw");
  const selectPadding = useMedia("1.389vw", "1.389vw", "2vw", "4vw");

  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false);
  console.log("form validation.....");
  useEffect(() => {
    if (selectRef.current) {
      const tl = gsap.timeline({
        paused: true,
      });

      tl.fromTo(
        selectRef.current,
        {
          display: "flex",
        },
        {
          duration: 0.4,
          height: selectHeight,
          paddingTop: selectPadding,
          paddingBottom: selectPadding,
        },
        0
      );

      tl.to(
        selectRef.current,
        {
          duration: 0.2,
          opacity: 1,
        },
        0.2
      );

      tl.to(
        chevronRef.current,
        {
          duration: 0.5,
          rotate: 180,
        },
        0
      );

      setSelectTl(tl);

      return () => {
        tl.kill();
        selectTl.kill();
      };
    }
  }, [selectRef, selectHeight, selectPadding, selectPadding]);

  useEffect(() => {
    if (open) {
      const tl = gsap.timeline();

      tl.set(wrapperRef.current, {
        zIndex: 109,
        display: "flex",
      });
      tl.to(wrapperRef.current, {
        duration: 0.8,
        opacity: 1,
      });

      return () => {
        tl.kill();
      };
    } else {
      const tl = gsap.timeline();

      tl.to(wrapperRef.current, {
        duration: 0.8,
        opacity: 0,
        onComplete: () => {
          gsap.set(wrapperRef.current, {
            display: "none",
          });
        },
      });
      tl.set(wrapperRef.current, {
        zIndex: 0,
      });

      return () => {
        tl.kill();
      };
    }
  }, [open]);

  useEffect(() => {
    if (selectOpen) {
      selectTl.play();
    } else {
      selectTl.reverse();
    }
  }, [selectOpen]);

  useEffect(() => {
    if (success) {
      const tl = gsap
        .timeline()
        .to(
          formRef.current,
          {
            duration: 0.5,
            opacity: 0,
          },
          0
        )

        .to(
          title1Ref.current,
          {
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
              gsap.set(title1Ref.current, {
                display: "none",
              });
              gsap.set(title2Ref.current, {
                display: "flex",
              });
            },
          },
          0
        )

        .to(
          text1Ref.current,
          {
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
              gsap.set(text1Ref.current, {
                display: "none",
              });
              gsap.set(text2Ref.current, {
                display: "flex",
              });
            },
          },
          0
        )

        .to(
          title2Ref.current,
          {
            duration: 0.5,
            opacity: 1,
          },
          1
        )

        .to(
          text2Ref.current,
          {
            duration: 0.5,
            opacity: 1,
          },
          1
        );

      return () => {
        tl.kill();
      };
    }
  }, [success]);

  const onSubmit = (e: any) => {
    e.preventDefault()
    setSubmitted(true);
    
    const fields = [
      {
        name: "firstname",
        value: firstName,
      },
      {
        name: "lastname",
        value: lastName,
      },
      {
        name: "title",
        value: title,
      },
      {
        name: "email",
        value: email,
      },
      {
        name: "company",
        value: company,
      },
      {
        name: "phone",
        value: phone,
      },
      {
        name: "reason",
        value: reason,
      },
      {
        name: "info",
        value: info,
      },
    ];

    if(firstName && lastName && title && email && company && phone && reason){
      fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.GATSBY_HUBSPOT_PORTAL_ID}/${process.env.GATSBY_HUBSPOT_FORM_ID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            fields,
          }),
        }
      )
      .then((res) => res.json())
      .then((json) => {
        gsap.to(wrapperRef.current, { duration: 0.5, scrollTo: "top" });
        setSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setSuccess(false);
      });
    }
  };

  return (
    <Wrapper ref={wrapperRef}>
      <ButtonContainer1>
        <PrimaryButton
          text="Back"
          padding="0vw"
          left
          onClick={() => {
            gsap.set(
              [
                formRef.current,
                title1Ref.current,
                title2Ref.current,
                text1Ref.current,
                text2Ref.current,
              ],
              {
                clearProps: "all",
              }
            );
            setFirstName("");
            setLastName("");
            setSuccess(false);
            setTitle("");
            setCompany("");
            setEmail("");
            setInfo("");
            setPhone("");
            setReason("");
            openForm(false);
            setSubmitted(false);
          }}
        />
      </ButtonContainer1>
      <Accent src={AccentPNG} />
      <Content>
        <Left>
          <Title ref={title1Ref}>Let's have a conversation</Title>
          <Title2 ref={title2Ref}>
            {"Thanks,\nwe will be\nin touch soon"}
          </Title2>
          <Text ref={text1Ref}>
            Reach out to learn more about how mIQrotech can impact your business.
          </Text>
          <Text2 ref={text2Ref}>
            { "If you have any more questions or would\nlike to talk sooner, our team is\navailable 8am-5pm EST." }
          </Text2>
        </Left>
        <Right ref={formRef}>
          <InputRow>
            <LeftColumn>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                width={useMedia("14.653vw", "14.653vw", "43.114vw", "100%")}
                placeholder="First Name"
              />
              {submitted && !firstName && <ValidationInLeftColumn>First Name is required.</ValidationInLeftColumn>}
            </LeftColumn>
            <RightColumn>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                width={useMedia("14.653vw", "14.653vw", "43.114vw", "100%")}
                placeholder="Last Name"
              />
              {submitted && !lastName && <ValidationInRightColumn>Last Name is required.</ValidationInRightColumn>}
            </RightColumn>
          </InputRow>
          <LeftColumn>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
            />
            {submitted && !title && <ValidationInLeftColumn>Job Title is required.</ValidationInLeftColumn>}
          </LeftColumn>
          <LeftColumn>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Business Email Address"
            />
            {submitted && !email && <ValidationInLeftColumn>Email is required.</ValidationInLeftColumn>}
          </LeftColumn>
          <InputRow>
            <LeftColumn>
              <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  width={useMedia("14.653vw", "14.653vw", "43.114vw", "100%")}
                  placeholder="Company"
                />
                {submitted && !company && <ValidationInLeftColumn>Company Name is required.</ValidationInLeftColumn>}
            </LeftColumn>
            <RightColumn>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                width={useMedia("14.653vw", "14.653vw", "43.114vw", "100%")}
                placeholder="Phone Number"
              />
              {submitted && !phone && <ValidationInRightColumn>Phone Number is required.</ValidationInRightColumn>}
            </RightColumn>  
          </InputRow>
          <SelectRow>
            <SelectWrapper>
              <Select onClick={() => setSelectOpen(!selectOpen)}>
                <SelectValue $placeholder={!!!reason}>
                  {reason || "Reaching out for..."}
                </SelectValue>
                <SelectOptions ref={selectRef}>
                  <Option1
                    onClick={() => setReason("I have a general question about mIQrotech")}
                  >
                    I have a general question about mIQrotech
                  </Option1>
                  <Option2
                    onClick={() => setReason("I would like to schedule a demo of your product")}
                  >
                    I would like to schedule a demo of your product
                  </Option2>
                  <Option3
                    onClick={() => setReason("I need help from your support team")}
                  >
                    I need help from your support team
                  </Option3>
                </SelectOptions>
                <Svg
                  ref={chevronRef}
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 5.5L7.5 11.5L14 5.5" stroke="#FEFEFE" />
                </Svg>
              </Select>
            </SelectWrapper>
            {submitted && !reason && <ValidationInSelectColumn>Select an option</ValidationInSelectColumn>}
          </SelectRow>
          <TextArea
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Additional Info"
          />
          <ButtonContainer>
            <PrimaryButton
              backgroundColor={colors.keppel100}
              hoverColor={colors.keppel60}
              textColor={colors.black}
              text="Submit Request"
              onClick={onSubmit}
              width={useMedia(
                "fit-content",
                "fit-content",
                "fit-content",
                "100%"
              )}
            />
          </ButtonContainer>
        </Right>
        {error}
      </Content>
    </Wrapper>
  );
};

export default Form;

const Wrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: ${colors.black};
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  opacity: 0;
  display: none;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;

  ${media.fullWidth} {
    padding-top: 13.472vw;
    padding-left: 11.319vw;
  }

  ${media.desktop} {
    padding-top: 13.472vw;
    padding-left: 11.319vw;
  }

  ${media.tablet} {
    padding-top: 21.647vw;
    padding-left: 5.988vw;
    padding-right: 5.988vw;
    min-height: 100vh;
    height: auto;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  ${media.mobile} {
    padding-top: 41.067vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-bottom: 13.333vw;
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;

const Content = styled.div`
  display: flex;

  ${media.tablet} {
    flex-direction: column;
    width: 100%;
  }

  ${media.mobile} {
    flex-direction: column;
    width: 100%:
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  ${media.fullWidth} {
    width: 30.694vw;
    margin-right: 8.542vw;
  }

  ${media.desktop} {
    width: 30.694vw;
    margin-right: 8.542vw;
  }

  ${media.tablet} {
    width: 52.934vw;
    margin-bottom: 6.347vw;
  }

  ${media.mobile} {
    width: 100%;
    margin-bottom: 13.333vw;
  }
`;

const Title = styled.span`
  color: ${colors.white};

  ${media.fullWidth} {
    ${text.desktopXLHeading}
    margin-bottom: 2.083vw;
  }

  ${media.desktop} {
    ${text.desktopXLHeading}
    margin-bottom: 2.083vw;
  }

  ${media.tablet} {
    ${text.tabletXLHeading}
    margin-bottom: 3.593vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    margin-bottom: 5.333vw;
  }
`;

const Title2 = styled(Title)`
  opacity: 0;
  display: none;

  ${media.fullWidth} {
    width: 44.653vw;
  }

  ${media.desktop} {
    width: 44.653vw;
  }

  ${media.tablet} {
    width: 77.006vw;
  }

  ${media.mobile} {
    white-space: pre-wrap;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  ${media.fullWidth} {
    width: 30.347vw;
    height: 41.375vw;
  }

  ${media.desktop} {
    width: 30.347vw;
    height: 41.375vw;
  }

  ${media.tablet} {
    width: 100%;
    height: 60.659vw;
  }

  ${media.mobile} {
    width: 100%;
    height: 216vw;
    padding-bottom: 23.333vw;
  }
`;

const Text = styled.p`
  color: ${colors.culturedWhite20};

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
    width: 22.500vw;
    margin-bottom: 4.861vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
    width: 22.500vw;
    margin-bottom: 4.861vw;
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    width: 38.802vw;
    margin-bottom: 4.79vw;
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
    width: 100%;
    margin-bottom: 8vw;
    white-space: pre-wrap;
  }
`;

const Text2 = styled(Text)`
  opacity: 0;
  display: none;

  ${media.fullWidth} {
    width: 22.5vw;
    margin-bottom: 3.056vw;
  }

  ${media.desktop} {
    width: 22.5vw;
    margin-bottom: 3.056vw;
  }

  ${media.tablet} {
    width: 38.802vw;
    margin-bottom: 4.79vw;
  }
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.fullWidth} {
    margin-bottom: 2.5vw;
    width: 21.597vw;
  }

  ${media.desktop} {
    margin-bottom: 2.5vw;
    width: 21.597vw;
  }

  ${media.tablet} {
    width: 37.246vw;
    margin-bottom: 3vw;
  }

  ${media.mobile} {
    width: 100%;
    margin-bottom: 6vw;
  }
`;

const P = styled.p<{ color: string }>`
  color: ${(props) => props.color};

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
  }
`;

const A = styled.a<{ color: string }>`
  color: ${(props) => props.color};
  text-decoration: none;
  position: relative;
  z-index: 12;

  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
  }

  ${media.mobile} {
    ${text.mobileBodyCopy1}
  }
`;

const Input = styled.input<{ width?: string }>`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${colors.white};
  color: ${colors.culturedWhite20};
  width: ${(props) => (props.width ? props.width : "100%")};
  box-sizing: border-box;
  outline: none;
  border-radius: 0px;

  :placeholder {
    opacity: 0.5;
  }

  ${media.fullWidth} {
    ${text.desktopSmallBody}
    margin-bottom: 2.778vw;
    height: 1.875vw;
  }

  ${media.desktop} {
    ${text.desktopSmallBody}
    margin-bottom: 2.778vw;
    height: 1.875vw;
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
    height: 3.234vw;
    margin-bottom: 4.79vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    height: 7.200vw;
    margin-bottom: 10.667vw;
  }
`;

const TextArea = styled.textarea<{ width?: string }>`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${colors.white};
  color: ${colors.culturedWhite20};
  width: ${(props) => (props.width ? props.width : "100%")};
  box-sizing: border-box;
  outline: none;
  border-radius: 0px;
  resize: none;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.culturedWhite100};
  }

  :placeholder {
    opacity: 0.5;
  }

  ${media.fullWidth} {
    ${text.desktopSmallBody}
    margin-bottom: 2.778vw;
    height: 8.875vw;
  }

  ${media.desktop} {
    ${text.desktopSmallBody}
    margin-bottom: 2.778vw;
    height: 8.875vw;
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
    height: 12.234vw;
    margin-bottom: 4.79vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    height: 50.200vw;
    margin-bottom: 10.667vw;
  }
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${media.mobile} {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  position: relative;
  width: 100%;
  text-align: left;
`;

const RightColumn = styled.div`
  position: relative;
  width: 100%;
  text-align: right;
`;

const ValidationInLeftColumn = styled.div`
  color: white;
  position: absolute;

  ${media.fullWidth} {
    top: 2.45vw;
  }
  ${media.desktop} {
    top: 2.35vw;
  }
  ${media.tablet} {
    top: 4.15vw;
  }
  ${media.mobile} {
    top: 9.15vw;
  }
`;

const ValidationInRightColumn = styled.div`
  color: white;
  position: absolute;

  ${media.fullWidth} {
    top: 2.45vw;
    left: 0.6vw;
  }
  ${media.desktop} {
    top: 2.35vw;
    left: 0.6vw;
  }
  ${media.tablet} {
    top: 4.15vw;
    left: 0.9vw;
  }
  ${media.mobile} {
    top: 9.15vw;
    left: 0.0vw;
  }
`;

const SelectRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ValidationInSelectColumn = styled.div`
  color: white;
  position: absolute;

  ${media.fullWidth} {
    top: 20.95vw;
  }
  ${media.desktop} {
    top: 20.95vw;
  }
  ${media.tablet} {
    top: 36.15vw;
  }
  ${media.mobile} {
    top: 116.15vw;
  }
`;

const Accent = styled.img`
  position: absolute;
  z-index: 0;
  transform: rotate(-133deg);
  opacity: 0.4;

  ${media.fullWidth} {
    width: 67vw;
    left: -9vw;
    bottom: 3vw;
  }

  ${media.desktop} {
    width: 67vw;
    left: -9vw;
    bottom: 3vw;
  }

  ${media.tablet} {
    width: 127.665vw;
    left: -46vw;
    bottom: -36vw;
  }

  ${media.mobile} {
    width: 200.665vw;
    left: -108vw;
    bottom: 40vw;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  ${media.mobile} {
    position: relative;
    margin-top: 12vw;
    margin-bottom: 12vw;
    width: 100%;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  z-index: 2;

  ${media.fullWidth} {
    min-height: 1.875vw;
    margin-bottom: 2.778vw;
  }

  ${media.desktop} {
    min-height: 1.875vw;
    margin-bottom: 2.778vw;
  }

  ${media.tablet} {
    min-height: 3.234vw;
    margin-bottom: 4.79vw;
  }

  ${media.mobile} {
    margin-bottom: 14vw;
  }
`;

const Select = styled.div<{}>`
  background: transparent;
  border: none;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border-bottom: 1px solid ${colors.white};

  ${media.fullWidth} {
    min-height: 1.875vw;
  }

  ${media.desktop} {
    min-height: 1.875vw;
  }

  ${media.tablet} {
    min-height: 3.234vw;
  }
`;

const SelectOptions = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 0vw;
  width: 100%;
  padding-top: 0vw;
  padding-bottom: 0vw;
  background: ${colors.black};
  display: none;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  opacity: 1;
  overflow: hidden;

  ${media.fullWidth} {
    padding-left: 0.972vw;
  }

  ${media.desktop} {
    padding-left: 0.972vw;
  }

  ${media.tablet} {
    padding-left: 3vw;
  }

  ${media.mobile} {
    padding-left: 3vw;
  }
`;

const SelectValue = styled.p<{ $placeholder: boolean }>`
  color: ${(props) =>
    props.$placeholder ? colors.culturedWhite20 : colors.culturedWhite100};
  opacity: ${(props) => (props.$placeholder ? "0.5" : "1")};

  ${media.fullWidth} {
    ${text.desktopSmallBody}
  }

  ${media.desktop} {
    ${text.desktopSmallBody}
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    height: 7.200vw;
    margin-left: 1vw;
  }
`;

const Option = styled.p`
  position: absolute;
  color: ${colors.culturedWhite60};
  opacity: 0.5;
  cursor: pointer;

  :hover {
    color: ${colors.white};
    opacity: 1;
  }

  ${media.fullWidth} {
    ${text.desktopSmallBody}
  }

  ${media.desktop} {
    ${text.desktopSmallBody}
  }

  ${media.tablet} {
    ${text.tabletSmallBody}
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
  }
`;

const Option1 = styled(Option)`
  top: 1vw;
  ${media.mobile} {
    top: 3vw;
  }
`;
const Option2 = styled(Option)`
  top: 4vw;
  ${media.mobile} {
    top: 13vw;
  }
`;
const Option3 = styled(Option)`
  top: 7vw;
  ${media.mobile} {
    top: 23vw;
  }
`;

const Svg = styled.svg`
  height: auto;
  position: absolute;
  right: 0;
  top: 0vw;
  cursor: pointer;

  ${media.fullWidth} {
    width: 0.9vw;
  }

  ${media.desktop} {
    width: 0.9vw;
  }

  ${media.tablet} {
    width: 1.557vw;
  }

  ${media.mobile} {
    width: 3.467vw;
  }
`;

const ButtonContainer1 = styled.div`
  position: absolute;
  z-index: 3;

  ${media.fullWidth} {
    top: 9.583vw;
    left: 11.319vw;
  }

  ${media.desktop} {
    top: 9.583vw;
    left: 11.319vw;
  }

  ${media.tablet} {
    top: 16.168vw;
    left: 5.988vw;
  }

  ${media.mobile} {
    top: 28.533vw;
    left: 6.667vw;
  }
`;
