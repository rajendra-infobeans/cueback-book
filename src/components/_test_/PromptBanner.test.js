import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/Store';
import { render, screen } from '@testing-library/react';
import PromptBanner from '../PromptBanner'
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/colors';

describe('<PromptBanner/> Components', () => {
    test('Export Correctly', () => {
        expect(PromptBanner).toBeDefined()
    })
    test('check if wrapper renders', () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <PromptBanner />
                </ThemeProvider>
            </Provider>
        );
        const promptwraperElement = screen.queryByTestId('prompt-wrapper');
        expect(promptwraperElement).toBeInTheDocument();
    });
    test('check if content renders', () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <PromptBanner />
                </ThemeProvider>
            </Provider>
        );
        const contentElement = screen.queryByTestId('content');
        expect(contentElement).not.toBeNull();
    });
    test('check PROMPT are render', () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <PromptBanner />
                </ThemeProvider>
            </Provider>
        );
        const promptElement = screen.queryByTestId('prompt', { name: 'PROMPT' })
        expect(promptElement).toBeInTheDocument();
    })
    test('Check title are render', () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <PromptBanner title='this is propmtbanner component' />
                </ThemeProvider>
            </Provider>
        );
        const titleComponents = screen.queryByTestId('promptbanner-title', { title: 'this is propmtbanner component' })
        expect(titleComponents).toBeInTheDocument()
    })

})

