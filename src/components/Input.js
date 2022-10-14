import * as React from 'react';
import styled from 'styled-components';
import { Caption1, Caption2 } from '../styles/typography';

const InputContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 4px;
`;
const InputLabel = styled(Caption1)`
  color: rgb(${(props) => props.theme.colors.neutral200});
  margin-left: 8px;
  text-transform: uppercase;
`;
const StyledInput = styled.input`
  padding: 16px 24px 16px 24px;
  border: 1px solid
    rgb(
      ${(props) =>
        props.errorCondition
          ? props.theme.colors.error400
          : props.theme.colors.neutral100}
    );
  border-radius: 8px;
  font-family: "Inter";
  font-size: 19px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  width: 100%;
  color: rgb(${(props) => props.theme.colors.neutral600});
  box-sizing: border-box;

  :focus {
    border: 1px solid
      rgb(
        ${(props) =>
          props.errorCondition
            ? props.theme.colors.error400
            : props.theme.colors.neutral600}
      );
    box-shadow: 0px 2px 2px rgba(46, 49, 62, 0.05),
      0px 4px 4px rgba(46, 49, 62, 0.05), 0px 8px 8px rgba(46, 49, 62, 0.05),
      0px -4px 4px rgba(46, 49, 62, 0.05), -4px 0px 4px rgba(46, 49, 62, 0.05),
      4px 0px 4px rgba(46, 49, 62, 0.05);
    outline: none;
  }

  ::placeholder {
    color: rgb(${(props) => props.theme.colors.neutral200});
  }
`;

const ErrorMessage = styled(Caption2)`
  color: rgb(${(props) => props.theme.colors.error400});
  margin: 2px 4px;
`;
const Input = (props) => (
  <InputContainer>
    <InputLabel>{props.label}</InputLabel>
    <StyledInput
      placeholder={props.placeholder}
      onChange={props.onValueChange}
      type={props.type}
      value={props.value}
      name={props.name}
      onBlur={props.onBlur}
      errorCondition={props.errorCondition}
    ></StyledInput>
    {props.errorCondition ? (
      <ErrorMessage>{props.errorMessage}</ErrorMessage>
    ) : null}
  </InputContainer>
);

export default Input;
