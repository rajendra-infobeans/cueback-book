import React from 'react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { store } from '../../app/Store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/colors';
import Button from '../Button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button style check', () => {
  test('check primary button styles', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Button type={'primary'} data-testid="cueback-button" />
        </ThemeProvider>
      </Provider>
    );
    const tree = screen.queryByTestId('cueback-button');
    expect(tree).toHaveStyleRule('background', theme.buttonPrimaryBg);
    expect(tree).toHaveStyleRule('color', `rgb( ${theme.colors.white} )`);
    expect(tree).toHaveStyleRule(
      'border',
      `1px solid ${theme.buttonPrimaryBorder}`
    );
  });

  test('check secondary button styles', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Button type={'secondary'} data-testid="cueback-button" />
        </ThemeProvider>
      </Provider>
    );
    const tree = screen.queryByTestId('cueback-button');
    expect(tree).toHaveStyleRule('background', theme.buttonSecondaryBg);
    expect(tree).toHaveStyleRule('color', `rgb( ${theme.colors.neutral200} )`);
    expect(tree).toHaveStyleRule(
      'border',
      `1px solid ${theme.buttonSecondaryBorder}`
    );
  });

  test('button disabled on disabled prop', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Button type={'primary'} data-testid="cueback-button" />
        </ThemeProvider>
      </Provider>
    );
    const tree = screen.queryByTestId('cueback-button');
    expect(tree).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled',
    });
  });

  test('render a tag on to prop', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Button to={'/'} type={'primary'} data-testid="cueback-button" />
        </ThemeProvider>
      </Provider>
    );
    const tree = screen.getByRole('link');
    expect(tree).toHaveProperty('href');
  });
  test('render a tag on http link', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Button
            to={'https://google.com'}
            type={'primary'}
            data-testid="cueback-button"
          />
        </ThemeProvider>
      </Provider>
    );
    const tree = screen.getByRole('link');
    expect(tree).toHaveProperty('href', 'https://google.com/');
  });

  test('onClick function is triggered', () => {
    const mockFn = jest.fn();
    const tree = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Button onButtonClick={mockFn} />
        </ThemeProvider>
      </Provider>
    );
    fireEvent.click(tree.getByRole('button'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
