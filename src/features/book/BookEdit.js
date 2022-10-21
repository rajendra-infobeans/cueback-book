import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import theme from '../../styles/colors';
import booktitle from '../../images/booktitle.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBookMemories,
  selectBookMemories,
  selectBookMemoriesStatus,
  sortBookMemoriesByAlphabetical,
  sortBookMemoriesByChronological,
  selectPage,
  fetchCurrentUserBookMemories,
  pageCounter,
  selectHasMoreData
} from '../../app/reducers/BookMemorySlice';
import { DateTime } from 'luxon';
import {
  Bold,
  Caption1,
  Footnote,
  Headline,
  Subhead,
  Title1,
} from '../../styles/typography';
import { Dropdown } from '../../components/Dropdown';
import Checkbox from '../../components/Checkbox';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SpinnerCircular } from 'spinners-react';
import './book.css';
import Cookies from 'js-cookie';

const BookContainer = styled.div`
  display: flex;
`;

const BookEditorContainer = styled.div`
  width: 100%;
  transition: 0.7s;

`;
const ThankYouContainer = styled.div`
  height: 100vh;
  width: 0vw;
  overflow: hidden;
  transition: 0.7s;
`;
const ImageSection = styled.div``;
const Image = styled.img``;

const MainContainer = styled.div`
  margin: auto;
  width: 752px;
  @media only screen and (max-width: 600px) {
    width: 100vw;
    box-sizing: border-box;
} 
  @media only screen and (min-width:320px) and (max-width: 599px) {
    box-sizing: border-box;
  }
  @media only screen and (max-width:470px){
  }
  @media screen and (min-width:471px) and (max-width:601px) {
  }
  @media only screen and (min-width: 600px) and (max-width: 1000px) {
    overflow: hidden;
    width: 552px;
  }
`;

const TyContainer = styled.div`
`;

const ThankYouMainContainer = styled.div`
  margin:auto;
  width: 752px;
  @media only screen and (max-width: 599px) {
    top: 25%;
  }
  @media only screen and (max-width: 999px) {
    padding: 0px 24px 24px 24px;
  }
`;

const BookCard = styled.div``;

const ThankYouBookCard = styled.div`
  width: 752px;
  @media only screen and (max-width: 999px) {
    width: 552px;
  }
  @media only screen and (max-width: 599px) {
    padding: 0px 24px;
    width: 100vw;
    box-sizing: border-box;
  }
`;
const BookEditorNote = styled(Caption1)`
margin-top:8px;
width: 100%;
height: 72px;
display: flex;
align-items: center;
letter-spacing: -0.05em;
color: ${`rgb(${theme.colors.neutral200})`};
@media only screen and (max-width:599px){
margin-top:15px;
padding:0px 24px;
display:flex;
align-items:flex-start;
width: 90%;
height: auto;
}
@media only screen and (min-width: 600px) and (max-width:1000px){
margin-top: 8px;
width: 100%;
height: 90px;
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 125%;
display: flex;
align-items: center;
letter-spacing: -0.05em;
color: ${`rgb(${theme.colors.neutral200})`};
}
`

const CardHeader = styled.div`
  margin: ${(props) => props.margin};
  @media screen and (max-width:599px){
    text-align: start;
    padding: 0px 24px;
  }
`;

const CardTitle = styled(Title1)`
  color: ${theme.buttonPrimaryBg};
  font-size: 30px;
  line-height: 125%;
  
`;

const CardDescription = styled(Headline)`
  color: ${`rgb(${theme.colors.neutral400})`};
`;
const TyCardDescription = styled.div`
width: auto;
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 23px;
display: flex;
align-items: center;
margin-top: 20px;
color: ${`rgb(${theme.colors.neutral400})`};
`
const HighlightCardDes = styled(Bold)``;

const CardBody = styled.div`
  padding: ${(props) => props.padding};
  overflow: auto;
  width: auto;
  height: ${(props) => props.length < 5 ? 'auto' : '500px'};
  background: #f3f5f7;
  border: 1px solid #e2e4e9;
  border-radius: 16px;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  @media only screen and (max-width: 599px) {
    height:${(props) => props.length < 5 ? 'auto' : '525px'};
  }
`;
const CardList = styled(InfiniteScroll)`
`;

const CardRow = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const CheckContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 4px;
  width: 652px;
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(7, 53, 98, 0.05),
    0px 2px 2px rgba(7, 53, 98, 0.05);
  border-radius: 8px;
`;
const ContentTitle = styled(Subhead)`
  font-size: 17px;
  line-height: 110%;
  color: ${`rgb(${theme.colors.neutral600})`};
`;
const ContentDetails = styled(Caption1)`
  color: ${`rgb(${theme.colors.neutral400})`};
`;
const Selection = styled.div`
  margin: 32px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 599px) {
    display: block;
  }
`;

const SelectMemory = styled.div`
  @media only screen and (max-width: 599px) {
    text-align: center;
    margin-bottom: 2px;
  }
`;
const NoOfMemory = styled(Footnote)`
  line-height: 125%;
  color: ${`rgb(${theme.colors.neutral200})`};
`;

const CardFooter = styled.div` 
@media screen and (min-width:600px){
padding-top: 32px;
}
`
const TyCardFooter = styled.div` 
`;
const TyCardButton = styled(Button)`
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 12px 16px;
width: 148px;
height: 44px;
background: #F3F5F7;
border: 1px solid #E2E4E9;
border-radius: 1000px;
@media screen and (max-width:599px){
  margin-left: 24px;
}
`
const CardButton = styled(Button)`
@media only screen and (min-width: 320px) and (max-width:599px){
margin: 24px;
box-sizing: border-box;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 90%;
height: 44px;
background: ${`rgb(${theme.colors.neutral600})`};
border: 1px solid ${`rgb(${theme.colors.neutral100})`};
border-radius: 1000px;
}
`;

const BookEditor = () => {
  const editorRef = useRef(null);
  const thankuRef = useRef(null);
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(0);
  const [selectedItem, setSelectedItem] = useState([]);
  const page = useSelector(selectPage);
  const bookMemories = useSelector(selectBookMemories);
  const status = useSelector(selectBookMemoriesStatus);
  const hasMoreData = useSelector(selectHasMoreData);
  const obj = {
    params: {
      userId: Cookies.get('uid'),
      pageIndex: page,
      pageSize: 10
    }
  };

  useEffect(() => {
    dispatch(fetchBookMemories(obj));
    dispatch(pageCounter());
  }, [dispatch]);

  const fetchMoreData = () => {
    dispatch(fetchCurrentUserBookMemories(obj));
    dispatch(pageCounter());
  };

  const handleDropDown = (value) => {
    console.log(value);
    if (value.label === 'Alphabetical Order') {
      dispatch(sortBookMemoriesByAlphabetical());
    }
    else if (value.label === 'Chronological Order') {
      dispatch(sortBookMemoriesByChronological());
    }
  }

  const submitSelection = () => {
    const editorObj = {
      width: '0vw',
      transform: `translate(-100%, 0px)`,
      display: 'none'
    };
    const thankuObj = {
      width: '100vw',
    };
    if (selectedItem?.length <= 10) {
      alert('Select at least 10 memories');
      return;
    }
    console.log(selectedItem);
    Object.keys(editorObj).map((item) => {
      editorRef.current.style[item] = editorObj[item];
    });

    Object.keys(thankuObj).map((item) => {
      thankuRef.current.style[item] = thankuObj[item];
    });
  };

  const addItem = (index) => {
    toggleCheckbox(index);
    setSelectedItem((previous) => [...previous, index]);
  };
  const removeItem = (index) => {
    toggleCheckbox(index);
    const removeElement = selectedItem?.filter((item) => item !== index);
    setSelectedItem([...removeElement]);
  };

  const findItem = (index) => {
    const isItemAvailable = selectedItem.indexOf(index);
    return isItemAvailable;
  };

  const toggleCheckbox = (index) => {
    findItem(index) === -1
      ? setIsSelected(isSelected + 1)
      : setIsSelected(isSelected - 1);
  };
  const selectItem = (index) => {
    findItem(index) === -1 ? addItem(index) : removeItem(index);
  };

  const dropDownData = [
    { id: 1, label: 'Alphabetical Order' },
    { id: 2, label: 'Chronological Order' },
  ];

  return (
    <BookContainer>
      <BookEditorContainer ref={editorRef}>
        <ImageSection>
          <Image src={booktitle} />
        </ImageSection>
        <MainContainer>
          <BookCard>
            <CardHeader>
              <CardTitle>Select memories for your book</CardTitle>
            </CardHeader>
            <CardHeader margin="4px 0px 0px 0px">
              <CardDescription>
                Books need to be at least 24 pages. For the best results, we
                recommend selecting at least
                <HighlightCardDes> 10 memories </HighlightCardDes>
                to meet that requirement.
              </CardDescription>
            </CardHeader>
            <Selection>
              <SelectMemory>
                <NoOfMemory>
                  {`${isSelected}/${bookMemories.length}`} memories selected
                </NoOfMemory>
              </SelectMemory>
              <Dropdown dropDownCallback={handleDropDown} data={dropDownData} />
            </Selection>
            <CardBody
              padding="24px 24px 0px 24px"
              className="test_scroll"
              id="overflowMain"
            >
              <CardList
                dataLength={bookMemories?.length}
                next={fetchMoreData}
                hasMore={hasMoreData}
                scrollThreshold={0.2}
                scrollableTarget="overflowMain"
                loader={
                  <SpinnerCircular
                    size={48}
                    thickness={200}
                    speed={100}
                    color={`rgba(${theme.colors.neutral200}, 1)`}
                    secondaryColor={`rgba(${theme.colors.neutral100}, 1)`}
                    style={{ justifySelf: 'center', position: 'relative', left: '45%' }}
                  />
                }
              >
                {bookMemories &&
                  bookMemories?.map((data, ind) => {
                    return (
                      <CardRow key={Math.random() + ind}>
                        <Checkbox
                          name={data.id}
                          checked={findItem(data.nid) === -1 ? false : true}
                          selectItem={() => selectItem(data.nid)}
                        />
                        <CheckContent>
                          <CardHeader>
                            <ContentTitle>{data.title}</ContentTitle>
                          </CardHeader>
                          <CardHeader>
                            <ContentDetails>{DateTime.fromSeconds(parseInt(data.memory_date)).toLocaleString(
                              DateTime.DATE_MED
                            )}</ContentDetails>
                          </CardHeader>
                        </CheckContent>
                      </CardRow>
                    );
                  })}
              </CardList>
            </CardBody>
            <BookEditorNote>
              Note: Submitting your memory selection will share these memories with our designer solely to estimate the length of your book and provide your book layout. We recommend reviewing your selection before submitting to ensure you are comfortable with what will be shared. Additionally, only JPG and PNG images will be added to your book (no PDFs, MP3s, other media types).
            </BookEditorNote>
            <CardFooter>
              <CardButton type="primary" onClick={submitSelection}>
                Submit selection
              </CardButton>
            </CardFooter>
          </BookCard>
        </MainContainer>
      </BookEditorContainer>

      <ThankYouContainer ref={thankuRef}>
        <ImageSection>
          <Image src={booktitle} />
        </ImageSection>

        <TyContainer>
          <ThankYouMainContainer>
            <ThankYouBookCard>
              <CardHeader>
                <CardTitle>Thank you!</CardTitle>
              </CardHeader>
              <CardHeader margin="4px 0px 32px 0px">
                <CardDescription>
                  Our designer will reach out via email to you shortly with a
                  sample of what your book will look like. From there, you can
                  choose to purchase it and we will ship it to you.
                </CardDescription>
                <TyCardDescription>
                  We look forward to creating a book with you!
                </TyCardDescription>
              </CardHeader>
              <TyCardFooter>
                <TyCardButton type="secondary">Close window</TyCardButton>
              </TyCardFooter>
            </ThankYouBookCard>
          </ThankYouMainContainer>
        </TyContainer>
      </ThankYouContainer>
    </BookContainer>
  );
};

export default BookEditor;
