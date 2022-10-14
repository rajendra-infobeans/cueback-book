import { useScrollRestoration } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';

const OverflowContainer = styled.div`
  overflow: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  border-top: 1px solid rgb(${(props) => props.theme.colors.neutral100});
`;

const ViewLayout = ({ children }) => {
  const autoScrollRestoration = useScrollRestoration('overflow-auto');

  return (
    <OverflowContainer {...autoScrollRestoration} id="overflowMain">
      {children}
    </OverflowContainer>
  );
};

export default ViewLayout;
