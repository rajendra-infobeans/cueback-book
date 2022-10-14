import React, { useState } from 'react';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { store } from '../../app/Store';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/colors';

import { render, screen, fireEvent } from '@testing-library/react';
import Popup from '../Popup';

const PopupMockComponent = ({
  closeOnEscKey,
  closeOnOutsideClick,
  displayCloseButton,
  title,
  children,
}) => {
  const [trigger, setTrigger] = useState(true);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Popup
          trigger={trigger}
          togglePopup={() => setTrigger(false)}
          closeOnEscKey={closeOnEscKey}
          closeOnOutsideClick={closeOnOutsideClick}
          displayCloseButton={displayCloseButton}
          title={title}
        >
          {children}
        </Popup>
      </ThemeProvider>
    </Provider>
  );
};

const PopupContentMockUp = () => <div data-testid="popup-content" />;
describe('check basic styling of Popup component', () => {
  test('check if popup wrapper renders', () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Popup trigger={true} />
        </ThemeProvider>
      </Provider>
    );
    const popupContainer = screen.queryByTestId('popup-container');
    expect(popupContainer).not.toBeNull();
  });

  test('check if popup closes on escape key', () => {
    render(<PopupMockComponent closeOnEscKey={true} />);
    let popupContainer = screen.queryByTestId('popup-wrapper');
    expect(popupContainer).not.toBeNull();
    fireEvent.keyDown(popupContainer, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    popupContainer = screen.queryByTestId('popup-wrapper');
    expect(popupContainer).toBeNull();
  });

  test('check if popup closes outside the popup', () => {
    render(<PopupMockComponent closeOnOutsideClick={true} />);
    let popupContainer = screen.queryByTestId('popup-wrapper');
    expect(popupContainer).not.toBeNull();
    fireEvent.click(popupContainer);
    popupContainer = screen.queryByTestId('popup-wrapper');
    expect(popupContainer).toBeNull();
  });

  test('check if popup closes clicking close button', () => {
    render(<PopupMockComponent displayCloseButton={true} />);
    let closeBtn = screen.queryByTestId('closeButtonForPopup');
    expect(closeBtn).not.toBeNull();
    fireEvent.click(closeBtn);
    closeBtn = screen.queryByTestId('closeButtonForPopup');
    expect(closeBtn).toBeNull();
  });

  test('check if popup title renders', () => {
    render(<PopupMockComponent title="Popup title" />);
    let popupTitle = screen.queryByTestId('popup-title');
    expect(popupTitle).not.toBeNull();
  });

  test('check if popup title renders and popup contents renders', () => {
    render(
      <PopupMockComponent title="Popup title">
        <PopupContentMockUp />
      </PopupMockComponent>
    );
    let popupTitle = screen.queryByTestId('popup-title');
    expect(popupTitle).not.toBeNull();
    let popupContent = screen.queryByTestId('popup-content');
    expect(popupContent).not.toBeNull();
  });
});
