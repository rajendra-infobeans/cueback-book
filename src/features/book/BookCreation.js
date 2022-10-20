import React, { useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Button from '../../components/Button';
import booktitle from '../../images/booktitle.svg';
import bookImg from '../../images/bookimage.svg';
import theme from '../../styles/colors';
import { useNavigate } from 'react-router-dom';
import {
  Body,
  Bold,
  Headline,
  LargeTitle,
  Title1,
} from '../../styles/typography';

const BookEditorContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  /* 
   background-image: url('https://i.ibb.co/4VqFggW/banner.png');
   */
  background-image: url(${bookImg});
  background-size: cover;
  background-position: center;
`;

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;
const Image = styled.img``;

const MainContainer = styled.div`
  position: absolute;
  background-color: ${theme.buttonPrimaryText};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.04), 0px 4px 4px rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  width: 800px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: 0.7s;
  @media only screen and (max-width: 999px) {
    width: 552px;
  }
  @media only screen and (max-width: 599px) {
    left: calc(50% - 24px);
    margin: auto 24px;
    width: calc(100vw - 24px);
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BookCard = styled.div`
  margin: 24px 24px 0px 24px;
  padding-bottom: 24px;
  height: 360px;
  transition: 0.7s;
  width: 100%;
  overflow: hidden;
  @media only screen and (max-width: 999px) {
    height: 452px;
  }
  @media only screen and (max-width: 600px) {
    height: 100%;
    padding-bottom: 70px;
  }
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: ${(props) => props.margin};
`;

const CardTitle = styled(LargeTitle)`
  color: ${theme.buttonPrimaryBg};
  text-align: center;
`;
const CardDescription = styled(Headline)`
  text-align: center;
  color: ${theme.buttonPrimaryBg};
  @media only screen and (min-width: 1000px) {
    margin: 0px 67px;
  }
`;


const CardBody = styled.div`
  margin: ${(props) => props.margin};
`;
const MainSubCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 16px;
  width: 100%;
`;
// style for subcard is not clear by figma so it may be differ cause of uncatchable card
const SubCard = styled.div`
  border-radius: 16px;
  border: 1px solid ${theme.sectionBorder};
  padding: ${(props) => props.padding};
`;
const SubCardTitle = styled(Title1)`
  line-height: 125%;
  color: ${`rgb(${theme.colors.neutral400})`};
`;
const SubCardHeading = styled(Bold)`
  line-height: 125%;
  text-align: center;
  color: ${`rgb(${theme.colors.neutral400})`};
`;
const SubCardDescription = styled(Body)`
  line-height: 125%;
  text-align: center;
  color: ${`rgb(${theme.colors.neutral200})`};
`;
const CardFooter = styled.div`
  position: ${(props) => props.position};
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;



const CardButton = styled(Button)`
  bottom: ${(props) => props.bottom};
  position: ${(props) => props.position};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
`;

const BookCreation = () => {
  const maxWidth_600 = useMediaQuery({ maxWidth: 600 });
  const navigate = useNavigate();
  const bookRef = useRef(null);
  const MainContainerRef = useRef(null);

  const openLogin = () => {
    navigate('/login-redirect');
  };

  return (
    <>
      <BookEditorContainer>
        <ImageSection>
          <Image src={booktitle} />
        </ImageSection>
        <MainContainer ref={MainContainerRef}>
          <Container>
            <BookCard ref={bookRef}>
              <CardHeader>
                <CardTitle>Create a physical keepsake</CardTitle>
              </CardHeader>
              <CardHeader>
                <CardDescription>
                  Stitch your memories from My Stories Matter together into a
                  book,to give as a gift or to keep.
                </CardDescription>
              </CardHeader>
              <CardBody margin="14px 0px">
                {!maxWidth_600 && (
                  <MainSubCard>
                    <SubCard padding="16px">
                      <CardHeader>
                        <SubCardTitle>1</SubCardTitle>
                      </CardHeader>
                      <CardHeader>
                        <SubCardHeading>Select your memories</SubCardHeading>
                      </CardHeader>
                      <CardHeader>
                        <SubCardDescription margin="4px 0px">
                          Choose the published memories you’d like to include in
                          your book.
                        </SubCardDescription>
                      </CardHeader>
                    </SubCard>

                    <SubCard padding="16px">
                      <CardHeader>
                        <SubCardTitle>2</SubCardTitle>
                      </CardHeader>
                      <CardHeader>
                        <SubCardHeading>Plan the details</SubCardHeading>
                      </CardHeader>
                      <CardHeader>
                        <SubCardDescription margin="4px 0px">
                          We’ll reach out to gather all the details for your
                          book.
                        </SubCardDescription>
                      </CardHeader>
                    </SubCard>

                    <SubCard padding="16px">
                      <CardHeader>
                        <SubCardTitle>3</SubCardTitle>
                      </CardHeader>
                      <CardHeader>
                        <SubCardHeading>Get your quote</SubCardHeading>
                      </CardHeader>
                      <CardHeader>
                        <SubCardDescription margin="4px 0px">
                          Confirm all the details before we send your book to
                          print.
                        </SubCardDescription>
                      </CardHeader>
                    </SubCard>
                  </MainSubCard>
                )}
              </CardBody>
              <CardFooter position="relative">
                <CardButton
                  type="primary"
                  bottom="-45px"
                  position="absolute"
                  onClick={openLogin}
                >
                  Get started <FiArrowRight />
                </CardButton>
              </CardFooter>
            </BookCard>
          </Container>
        </MainContainer>
      </BookEditorContainer>
    </>
  );
};

export default BookCreation;
