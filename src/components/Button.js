import { Link } from 'react-router-dom';
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Subhead } from '../styles/typography';

const ButtonStyles = css`
  padding: 12px 16px;
  border-radius: ${(props) => (props.icon ? '50%' : '100px')};
  text-decoration: none;
  min-width: ${(props) => (props.icon ? '50px' : '112px')};
  height: ${(props) => (props.icon ? '50px' : '44px')};
  text-align: center;
  background: ${(props) =>
    props.type === 'primary'
      ? props.theme.buttonPrimaryBg
      : props.type==='tertiary'? 'white':props.theme.buttonSecondaryBg};
  color: rgb(
    ${(props) =>
      props.type === 'primary'
        ? props.theme.colors.white
        : props.theme.colors.neutral200}
  );
  box-sizing: border-box;
  display: inline-grid;
  grid-auto-flow: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid
    ${(props) =>
      props.type === 'primary'
        ? props.theme.buttonPrimaryBorder
        : props.theme.buttonSecondaryBorder};
  :hover {
    box-shadow: ${(props) =>
      props.type === 'primary'
        ? ` 0px 0px 4px rgba(${props.theme.colors.neutral600},
           0.07), 0px 4px 8px rgba(${props.theme.colors.neutral600}, 0.07),
      0px 8px 16px rgba(${props.theme.colors.neutral600}, 0.07);`
        : `0px 4px 8px rgba(${props.theme.colors.neutral600}, 0.04);`};
  }
  :disabled {
    /* background: rgb(${(props) => props.theme.colors.neutral100});
    border-color: rgb(${(props) => props.theme.colors.neutral100});
    color: rgb(${(props) => props.theme.colors.neutral200}); */
    cursor: not-allowed;
    :hover {
      box-shadow: none;
    }
  }
`;

const ButtonItemsWrapper = styled(Subhead)`
  display: inline-grid;
  grid-auto-flow: column;
  align-content: center;
  align-items: center;
  gap: 12px;
  justify-content: center;
  justify-items: center;
`;

const StyledLink = styled(Link)`
  ${ButtonStyles}
`;

const StyledA = styled.a`
  ${ButtonStyles}
`;

const StyledButton = styled.button`
  ${ButtonStyles}
`;

const Button = ({
  children,
  to,
  type,
  className,
  disabled,
  onButtonClick,
  icon,
  ...props
}) => {
    if (!to) {
    return (
      <StyledButton
        className={className}
        type={type}
        disabled={disabled}
        onClick={onButtonClick}
        icon={icon}
        {...props}
      >
        <ButtonItemsWrapper> {children} </ButtonItemsWrapper>
      </StyledButton>
    );
  } else {
    if (to.charAt(0) === '/' || to.charAt(0) === '#') {
      return (
        <StyledLink icon={icon} className={className} to={to} type={type} {...props}>
          <ButtonItemsWrapper> {children} </ButtonItemsWrapper>
        </StyledLink>
      );
    } else if (
      to.substring(0, 4) === 'http' ||
      to.substring(0, 6) === 'mailto'
    ) {
      return (
        <StyledA
          icon={icon}
          className={className}
          href={to}
          target={'_blank'}
          type={type}
          {...props}
        >
          <ButtonItemsWrapper> {children} </ButtonItemsWrapper>
        </StyledA>
      );
    }
  }
};

export default Button;