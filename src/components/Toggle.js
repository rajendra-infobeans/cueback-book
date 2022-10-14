import * as React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { Headline } from '../styles/typography';
import { FiCheck, FiX } from 'react-icons/fi';

const ToggleContainer = styled.div`
  display: ${(props) => (props.label ? 'grid' : 'block')};
  grid-template-columns: auto auto;
  align-items: center;
  color: rgb(${(props) => props.theme.colors.neutral200});
`;
const ToggleLabel = styled(Headline)`
  color: rgb(${(props) => props.theme.colors.neutral600});
  width: 512px;
`;

const IconContainer = styled.div`
  > svg {
    width: 100%;
    padding-top: 6px;
    color: rgb(${(props) => props.theme.colors.white});
  }
`;
const StyledIcon = ({ Icon }) => <IconContainer>{Icon}</IconContainer>;

const Toggle = (props) => (
  <ToggleContainer label={!!props.label}>
    <ToggleLabel>{props.label}</ToggleLabel>
    <Switch
      checked={props.checked}
      onChange={props.onToggle}
      onColor="#0A4D8F"
      offColor="#4C5367"
      uncheckedIcon={
        props.uncheckedIcon ? (
          <StyledIcon Icon={props.uncheckedIcon} />
        ) : (
          <StyledIcon Icon={<FiX />} />
        )
      }
      checkedIcon={
        props.checkedIcon ? (
          <StyledIcon Icon={props.checkedIcon} />
        ) : (
          <StyledIcon Icon={<FiCheck />} />
        )
      }
    ></Switch>
  </ToggleContainer>
);

export default Toggle;
