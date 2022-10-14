import React from 'react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { store } from '../../app/Store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/colors';
import Header from '../Header';
import { render, screen } from '@testing-library/react';

describe('test suite for header component', () => {
  test('render Login/signup button', () => {
    localStorage.clear();
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    const loginBtn = screen.queryByTestId('loginBtn');
    const signUpBtn = screen.queryByTestId('signUpBtn');
    expect(loginBtn).not.toBeNull();
    expect(signUpBtn).not.toBeNull();
  });

  test('render Login/signup button', () => {
    localStorage.setItem('idToken', 'sample-token');
    // localStorage.setItem('FullName', 'John Doe');
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    const loginBtn = screen.queryByTestId('loginBtn');
    const signUpBtn = screen.queryByTestId('signUpBtn');
    expect(loginBtn).toBeNull();
    expect(signUpBtn).toBeNull();

    // const firstName = screen.queryByTestId('firstName').querySelector('span');
    // expect(firstName.innerHTML).toEqual(' Hello John ');
    localStorage.clear();
  });

  test('links rendered properly', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );

    const useCaseLink = screen.queryByTestId('useCaseLink').querySelector('p');
    const aboutLink = screen.queryByTestId('aboutLink').querySelector('p');
    const faqLink = screen.queryByTestId('faqLink').querySelector('p');
    const blogLink = screen.queryByTestId('blogLink').querySelector('p');

    expect(useCaseLink.innerHTML).toEqual('Use Cases');
    expect(aboutLink.innerHTML).toEqual('About');
    expect(faqLink.innerHTML).toEqual('FAQs');
    expect(blogLink.innerHTML).toEqual('Blog');
  });
});
