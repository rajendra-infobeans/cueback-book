import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import theme from '../styles/colors';

const StyledDropdown = styled.div`
  .dropdown {
    width: 356px;
    border-radius: 8px;
    /* box-shadow: 0px 0px 4px rgba(11, 12, 15, 0.07),
      0px 4px 8px rgba(11, 12, 15, 0.07), 0px 8px 16px rgba(11, 12, 15, 0.07); */
    position: relative;
    background-color: white;
    border: 1px solid #1e1e1e;
    @media only screen and (max-width: 599px) {
      width: auto;
    }
  }

  .dropdown-header {
    padding: 16px 24px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* color :red; */

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 125%;
    color: #0b0c0f;
  }

  .dropdown-body {
    /* padding: 16px 24px; */
    border-top: 1px solid #e5e8ec;
    display: none;
  }

  .dropdown-body.open {
    border-radius: 8px;
    border: 1px solid #c1c3ca;

    /* box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); */
    filter: drop-shadow(0px 0px 4px rgba(11, 12, 15, 0.07))
      drop-shadow(0px 4px 8px rgba(11, 12, 15, 0.07))
      drop-shadow(0px 8px 16px rgba(11, 12, 15, 0.07));
    display: block;
    position: absolute;
    background: white;
    width: 356px;
    margin-top: 4px;
    @media only screen and (max-width: 599px) {
      width: 100%;
    }
    /* box-sizing: border-box; */
  }

  .dropdown-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-radius: 8px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 125%;
    color: #4c5367;
  }

  .dropdown-item:hover {
    cursor: pointer;
    background-color: ${theme.pageTextListNumberBg};
    color: #0b0c0f;
  }

  .dropdown-item-dot {
    opacity: 0;
    color: #91a5be;
    transition: all 0.2s ease-in-out;
  }

  .dropdown-item.selected {
    opacity: 1;
    background-color: ${theme.pageTextListNumberBg};
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 125%;
    color: #0b0c0f;
  }
  .dropdown-item-dot.selected {
    opacity: 1;
    color: ${theme.rightCkick};
  }

  .icon {
    /* font-size: 13px; */
    color:#374151;
    transform: rotate(0deg);
    transition: all 0.2s ease-in-out;
  }

  .icon.open {
    transform: rotate(180deg);
  }

  .isSelected {
    color: #4c5367;
  }
`;

const Div = styled.div``;
const Span = styled.span``;

export const Dropdown = (props) => {
  const { data } = props;
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
    const selectItemObj = data.find((item) => item.id == id);
    props.dropDownCallback(selectItemObj);
  };

  return (
    <StyledDropdown>
      <Div className="dropdown">
        <Div
          className={`dropdown-header ${selectedItem && 'isSelected'}`}
          onClick={toggleDropdown}
        >
          {selectedItem
            ? items.find((item) => item.id === parseInt(selectedItem)).label
            : 'Sort by'}
          <FiChevronDown
            className={`fa fa-chevron-right icon ${isOpen && 'open'}`}
          />
        </Div>

        <Div className={`dropdown-body ${isOpen && 'open'} `}>
          {items.map((item,ind) => (
            <Div
            key={ind + Math.random()}
              className={`dropdown-item ${
                item.id === parseInt(selectedItem) && 'selected'
              }`}
              onClick={(e) => {
                handleItemClick(e.target.id);
                toggleDropdown();
              }}
              id={item.id}
            >
              {item.label}
              <Span
                className={`dropdown-item-dot ${
                  item.id === parseInt(selectedItem) && 'selected'
                }`}
              >
                <FiCheck />
              </Span>
            </Div>
          ))}
        </Div>
      </Div>
    </StyledDropdown>
  );
};
