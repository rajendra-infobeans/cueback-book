import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import theme from '../../styles/colors';
import booktitle from '../../images/booktitle.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBookMemories,
  addBookMemories,
  getBookList,
  selectBookMemories,
  selectBookMemoriesStatus,
  sortBookMemoriesByAlphabetical,
  sortBookMemoriesByChronological,
  selectPage,
  fetchCurrentUserBookMemories,
  pageCounter,
  selectHasMoreData,
  selectHasBooks,
  selectTotalMemories
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
import { useNavigate } from 'react-router-dom';

const BookContainer = styled.div`
  display: flex;
`;

const BookEditorContainer = styled.div`
  height: 100vh;
  width: 100vw;
  transition: 0.7s;
  overflow: hidden;
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
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -50%);
  padding: 24px;
  width: 752px;
  margin-top: 20px;
  @media only screen and (max-width: 999px) {
    width: 552px;
    margin-top: 32px;
  }
  @media only screen and (max-width: 599px) {
    padding: 24px;
    width: 100vw;
    box-sizing: border-box;
    margin-top: -24px;
  }
  @media only screen and (max-width: 473px) {
    margin-top: -5px;
  }
  @media only screen and (max-width: 451px) {
    margin-top: 6px;
  }
  @media only screen and (max-width: 373px) {
    margin-top: 6px;
  }
`;

const TyContainer = styled.div`
  position: relative;
  top: 22.5%;
`;

const ThankYouMainContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 22.5%;
  transform: translate(-50%, -50%);
  padding: 24px;
  height: 300px;
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

const CardHeader = styled.div`
  margin: ${(props) => props.margin};
`;

const CardTitle = styled(Title1)`
  color: ${theme.buttonPrimaryBg};
  font-size: 30px;
  line-height: 125%;
`;

const CardDescription = styled(Headline)`
  color: ${`rgb(${theme.colors.neutral400})`};
`;
const HighlightCardDes = styled(Bold)``;

const CardBody = styled.div`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: auto;
  height: 476.37px;
  background: #f3f5f7;

  border: 1px solid #e2e4e9;
  border-radius: 16px;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  @media only screen and (max-width: 599px) {
    height: 343.37px;
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

const CardFooter = styled.div``;
const CardButton = styled(Button)``;

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
  const hasBooks = useSelector(selectHasBooks);
  const totalMemories = useSelector(selectTotalMemories);
  const navigate = useNavigate();
  const uid = Cookies.get('uid');
  const obj = {
    params: {
      userId: Cookies.get('uid'),
      pageIndex: page,
      pageSize: 10
    }
  };
  window.onpopstate = () => {
    console.log("url changed");
    navigate('/app/bookcreation');
  }
  const editorObj = {
    width: '0vw',
    transform: `translate(-100%, 0px)`,
  };
  const thankuObj = {
    width: '100vw',
  };

  useEffect(() => {
    dispatch(getBookList({details:{uid: uid}}));
  }, [dispatch]);

  useEffect(() => {
    if (hasBooks === false) {
      dispatch(fetchBookMemories(obj));
      dispatch(pageCounter());
    }
    else if (hasBooks === true) {
      Object.keys(editorObj).map((item) => {
        editorRef.current.style[item] = editorObj[item];
      });
  
      Object.keys(thankuObj).map((item) => {
        thankuRef.current.style[item] = thankuObj[item];
      });
    }
    
  }, [hasBooks]);



  const fetchMoreData = () => {
    dispatch(fetchCurrentUserBookMemories(obj));
    dispatch(pageCounter());
  };

  const handleDropDown = (value) => {
    console.log(value);
    if (value.label === 'Alphabetical Order') {
      dispatch(sortBookMemoriesByAlphabetical());
    }
    else if (value.label === 'Chronological Order'){
      dispatch(sortBookMemoriesByChronological());
    }
  }

  const submitSelection = () => {
    if (selectedItem?.length < 10) {
      alert('Select at least 10 memories');
      return;
    }
    const obj = {
      details: {
        uid: Cookies.get('uid'),
        memories: selectedItem
      }
    };
    dispatch(addBookMemories(obj));
    console.log(selectedItem);

  };

  const closeWindow = () => navigate('/mystories-matter');
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
                  {`${isSelected}/${totalMemories}`} memories selected
                </NoOfMemory>
              </SelectMemory>
              <Dropdown dropDownCallback={handleDropDown} data={dropDownData} />
            </Selection>
            <CardBody
              margin="24px 0px"
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
              endMessage= {totalMemories === 0 ? 'No memories found' : ''}
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
            <CardFooter>
              <CardButton 
              type="primary"
              onClick={submitSelection}
              disabled={selectedItem?.length < 10}
              >
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
                  choose to purchase it and we will ship it to you. We look
                  forward to creating a book with you!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <CardButton type="secondary" onClick={closeWindow}>Close window</CardButton>
              </CardFooter>
            </ThankYouBookCard>
          </ThankYouMainContainer>
        </TyContainer>
      </ThankYouContainer>
    </BookContainer>
  );
};

export default BookEditor;
