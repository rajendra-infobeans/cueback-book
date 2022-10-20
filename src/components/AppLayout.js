import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import theme from '../styles/colors';
import Head from './Head';
import { setPageTitle } from '../app/reducers/HeadSlice';

const isBrowser = typeof window !== 'undefined';
const AppLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: stretch;
  justify-items: stretch;
  width: 100vw;
  height: 100vh;
  height: -webkit-fill-available;
  box-sizing: border-box;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    padding-left: 84px;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    padding-left: 0;
  }
`;

const MainSection = styled.div`
  position: relative;

  min-height: 0;
  align-self: stretch;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    background-color: rgb(${theme.colors.white});
    overflow: hidden;
    box-sizing: border-box;
    height: 100vh;
    height: -webkit-fill-available;
    @media screen and (max-width:599px){
      overflow: scroll;
    }
  }

  html{
    height: 100vh;
    height: -webkit-fill-available;
    box-sizing: border-box;
  }

  #gatsby-focus-wrapper{
    height: 100vh;
    height: -webkit-fill-available;
  }

  #___gatsby{
    height: 100vh;
    height: -webkit-fill-available;
  }
`;
const setupPopScreen = () => {
  /**
   * @pablo This should be handled via API. For now fixing it through localstorage
   */
  const shouldDisplayWelcomePopup = localStorage.getItem('welcomePopup');
  if (!shouldDisplayWelcomePopup) {
    localStorage.setItem('welcomePopup', true);
  }
};
const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setupPopScreen();
    dispatch(setPageTitle());
  }, [dispatch]);

  if (isBrowser) {
      return (
        <>
            <AppLayoutContainer>
              <Head />
              <GlobalStyle />
              <MainSection>{children}</MainSection>
            </AppLayoutContainer>
        </>
      );
  } else {
    return <></>;
  }
};

export default AppLayout;
