import React from 'react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { store } from '../../app/Store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/colors';
import Accordion from '../Accordion';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Accordion prop check', () => {
  test('check title is present in props', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Accordion title={"I'm the accordion title"} />
        </ThemeProvider>
      </Provider>
    );
    expect((await screen.findByTestId('accordion-title')).innerHTML).toEqual(
      "I'm the accordion title"
    );
  });

  test('check accordion content not visible initially', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Accordion title={"I'm the accordion title"} />
        </ThemeProvider>
      </Provider>
    );
    expect(screen.queryByTestId('accordion-content')).toBeNull();
  });
});
