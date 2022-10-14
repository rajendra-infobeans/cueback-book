import { Helmet } from 'react-helmet';
import React, { useEffect } from 'react';
import theme from '../styles/colors';
import { useSelector } from 'react-redux';
import {
  selectPageTitle,
  selectPageDescription,
} from '../app/reducers/HeadSlice';
import og from '../images/og.png';
import favicon from '../images/favicon.png';

const Head = () => {
  const title = useSelector(selectPageTitle);
  const description = useSelector(selectPageDescription);
  useEffect(() => {}, [title, description]);
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <meta name="description" content={description}></meta>
      <title>
        {`${title} - My Stories Matter`}
      </title>
      <link rel="icon" href={favicon} />
      <meta name="theme-color" content={`rgb(${theme.colors.white})`} />
      <meta property="og:image" content={og} />

      <meta property="og:title" content={`${title} - My Stories Matter`} />

      <meta
        property="og:description"
        content={description}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Helmet>
  );
};
export default Head;
