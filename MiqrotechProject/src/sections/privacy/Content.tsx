import React from "react";
import styled from "styled-components";

import media from "@styles/media";
import text from "@styles/text";
import colors from "@styles/colors";

import Accent from "@png/accentBG.png";

const Content: React.FC = () => {
  return (
    <Wrapper>
      <AccentBG src={Accent} alt="gradient"/>
      <P>
        mIQrotech is committed to protecting your privacy and developing
        technology that gives you the most powerful and safe online experience.
        This Statement of Privacy applies to the mIQrotech Web site and governs
        data collection and usage. By using the mIQrotech website, you consent
        to the data practices described in this statement.
      </P>
      <TitleSmall>Collection of your personal information</TitleSmall>
      <P>
        mIQrotech collects personally identifiable information, such as your
        e-mail address, name, home or work address or telephone number.
        mIQrotech also collects anonymous demographic information, which is not
        unique to you, such as your ZIP code, age, gender, preferences,
        interests and favorites.There is also information about your computer
        hardware and software that is automatically collected by mIQrotech. This
        information can include: your IP address, browser type, domain names,
        access times and referring Web site addresses. This information is used
        by mIQrotech for the operation of the service, to maintain quality of
        the service, and to provide general statistics regarding use of the
        mIQrotech Web site.Please keep in mind that if you directly disclose
        personally identifiable information or personally sensitive data through
        mIQrotech public message boards, this information may be collected and
        used by others. Note: mIQrotech does not read any of your private online
        communications.mIQrotech encourages you to review the privacy statements
        of Web sites you choose to link to from mIQrotech so that you can
        understand how those Web sites collect, use and share your information.
        mIQrotech is not responsible for the privacy statements or other content
        on Web sites outside of the mIQrotech and mIQrotech family of Web sites.
      </P>
      <TitleSmall>Use of your personal information</TitleSmall>
      <P>
        mIQrotech collects and uses your personal information to operate the
        mIQrotech Web site and deliver the services you have requested.
        mIQrotech also uses your personally identifiable information to inform
        you of other products or services available from mIQrotech and its
        affiliates. mIQrotech may also contact you via surveys to conduct
        research about your opinion of current services or of potential new
        services that may be offered.
        <br />
        <br />
        mIQrotech does not sell, rent or lease its customer lists to third
        parties. mIQrotech may, from time to time, contact you on behalf of
        external business partners about aparticular offering that may be of
        interest to you. In those cases, your unique personally identifiable
        information (e-mail, name, address, telephone number) is nottransferred
        to the third party. In addition, mIQrotech may share data with trusted
        partners to help us perform statistical analysis, send you email or
        postal mail, provide customer support, or arrange for deliveries. All
        such third parties are prohibited from using your personal information
        except to provide these services to mIQrotech, and they are required to
        maintain the confidentiality of your information.
        <br />
        <br />
        mIQrotech does not use or disclose sensitive personal information, such
        as race, religion, or political affiliations, without your explicit
        consent.
        <br />
        <br />
        mIQrotech keeps track of the Web sites and pages our customers visit
        within mIQrotech, in order to determine what mIQrotech services are the
        most popular. This data is used to deliver customized content and
        advertising within mIQrotech tocustomers whose behavior indicates that
        they are interested in a particular subject area.
        <br />
        <br />
        mIQrotech Web sites will disclose your personal information, without
        notice, only if required to do so by law or in the good faith belief
        that such action is necessary to: (a) conform to the edicts of the law
        or comply with legal process served on mIQrotech or the site; (b)
        protect and defend the rights or property of mIQrotech; and, (c) act
        under exigent circumstances to protect the personal safety of users of
        mIQrotech, or the public.
      </P>
      <TitleSmall>Use of cookies</TitleSmall>
      <P>
        The mIQrotech Web site use "cookies" to help you personalize your online
        experience. A cookie is a text file that is placed on your hard disk by
        a Web page server. Cookies cannot be used to run programs or deliver
        viruses to your computer. Cookies are uniquely assigned to you, and can
        only be read by a web server in the domain that issued the cookie to
        you.
        <br />
        <br />
        One of the primary purposes of cookies is to provide a convenience
        feature to save you time. The purpose of a cookie is to tell the Web
        server that you have returned to a specific page. For example, if you
        personalize mIQrotech pages, or register with mIQrotech site or
        services, a cookie helps mIQrotech to recall your specific information
        on subsequent visits. This simplifies the process of recording your
        personal information, such as billing addresses, shipping addresses, and
        so on. When you return to the same mIQrotech Web site, the information
        you previously provided can be retrieved, so you can easily use the
        mIQrotech features that you customized.
        <br />
        <br />
        You have the ability to accept or decline cookies. Most Web browsers
        automatically accept cookies, but you can usually modify your browser
        setting to decline cookies if you prefer. If you choose to decline
        cookies, you may not be able to fully experience the interactive
        features of the mIQrotech services or Web sites you visit.
      </P>
      <TitleSmall>Security of your personal information</TitleSmall>
      <P>
        mIQrotech secures your personal information from unauthorized access,
        use or disclosure. mIQrotech secures the personally identifiable
        information you provide on computer servers in a controlled, secure
        environment, protected from unauthorized access, use or disclosure. When
        personal information (such as a creditcard number) is transmitted to
        other Web sites, it is protected through the use of encryption, such as
        the Secure Socket Layer (SSL) protocol.
      </P>
      <TitleSmall>Changes of this statement</TitleSmall>
      <P>
        mIQrotech will occasionally update this Statement of Privacy to reflect
        company and customer feedback. mIQrotech encourages you to periodically
        review this Statement to be informed of how mIQrotech is protecting your
        information.
      </P>
      <TitleSmall>Contact information</TitleSmall>
      <P>
        mIQrotech welcomes your comments regarding this Statement of Privacy. If
        you believe that mIQrotech has not adhered to this Statement, please
        contact mIQrotech at{" "}
        <a href="mailto:legal@miqrotech.com">legal@miqrotech.com</a>. We will
        use commercially reasonable efforts to promptly determine and remedy the
        problem.
      </P>
    </Wrapper>
  );
};

export default Content;

const Wrapper = styled.section`
  position: relative;

  ${media.fullWidth} {
    padding-top: 5.903vw;
    padding-left: 19.167vw;
    padding-right: 19.167vw;
    padding-bottom: 6.111vw;
  }

  ${media.desktop} {
    padding-top: 5.903vw;
    padding-left: 19.167vw;
    padding-right: 19.167vw;
    padding-bottom: 6.111vw;
  }

  ${media.tablet} {
    padding-top: 10.419vw;
    padding-left: 5.988vw;
    padding-right: 5.988vw;
    padding-bottom: 14.97vw;
  }

  ${media.mobile} {
    padding-top: 16.8vw;
    padding-left: 6.667vw;
    padding-right: 6.667vw;
    padding-bottom: 34.667vw;
  }
`;

const Title = styled.h2`
  color: ${colors.culturedWhite100};

  ${media.fullWidth} {
    ${text.desktopXLHeading}
    margin-bottom: 2vw;
  }

  ${media.desktop} {
    ${text.desktopXLHeading}
    margin-bottom: 2vw;
  }

  ${media.tablet} {
    ${text.tabletLHeading}
    margin-bottom: 3vw;
  }

  ${media.mobile} {
    ${text.mobileSHeading}
    margin-bottom: 6vw;
  }
`;

const TitleSmall = styled.h3`
  color: ${colors.culturedWhite100};

  ${media.fullWidth} {
    ${text.desktopSHeading}
    margin-bottom: 2vw;
  }

  ${media.desktop} {
    ${text.desktopSHeading}
    margin-bottom: 2vw;
  }

  ${media.tablet} {
    ${text.tabletSHeading}
    margin-bottom: 3vw;
  }

  ${media.mobile} {
    ${text.mobileXXSHeading}
    margin-bottom: 6vw;
  }
`;

const P = styled.p`
  color: ${colors.culturedWhite100};
  a {
    color: ${colors.keppel100};
    text-decoration: underline;
  }
  ${media.fullWidth} {
    ${text.desktopBodyCopy1}
    margin-bottom: 2vw;
  }

  ${media.desktop} {
    ${text.desktopBodyCopy1}
    margin-bottom: 2vw;
  }

  ${media.tablet} {
    ${text.tabletBodyCopy1}
    margin-bottom: 3vw;
  }

  ${media.mobile} {
    ${text.mobileSmallBody}
    margin-bottom: 6vw;
  }
`;

const OL = styled.ol`
  list-style-position: inside;
  padding-left: 0vw;

  ${media.fullWidth} {
    margin-bottom: 2vw;
  }

  ${media.desktop} {
    margin-bottom: 2vw;
  }

  ${media.tablet} {
    margin-bottom: 3vw;
  }

  ${media.mobile} {
    margin-bottom: 6vw;
  }
`;

const LI = styled.li`
  color: ${colors.culturedWhite100};

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
    ${text.mobileSmallBody}
  }
`;

const AccentBG = styled.img`
  position: absolute;
  transform: rotate(130deg);

  ${media.fullWidth} {
    width: 58vw;
    height: 58vw;
    right: -7vw;
    top: -24vw;
  }

  ${media.desktop} {
    width: 58vw;
    height: 58vw;
    right: -7vw;
    top: -24vw;
  }

  ${media.tablet} {
    width: 78vw;
    height: 78vw;
    right: -10vw;
    top: -24vw;
  }

  ${media.mobile} {
    width: 135vw;
    height: 135vw;
    right: -44vw;
    top: -31vw;
  }
`;
