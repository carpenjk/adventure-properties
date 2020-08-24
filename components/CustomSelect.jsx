import React, { Component, createRef } from 'react';
import withUseRef from './WithUseRef';
import Select, { components } from 'react-select';
import DropDownIncrArrow from './DropDownIncrArrow';
import styled from 'styled-components';
import {
  breakpoint,
  getColor,
  getBackgroundColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
} from 'themeweaver';
import { getProp } from '../utils/themeweaver-utils';

const StyledSelect = styled.div`
  display: block;

  margin-top: ${getMarginTop('input.searchBar', '0')};
  margin-right: ${getMarginRight('input.searchBar', '0')};
  margin-bottom: ${getMarginBottom('input.searchBar', '1rem')};
  margin-left: ${getMarginLeft('input.searchBar', '0')};

  & > * {
    background-color: ${getBackgroundColor('input.searchBar', 'initial')};
    font-family: ${getFontFamily('input.searchBar', 'inherit')};
    font-weight: ${getFontWeight('input.searchBar', 'normal')};
    font-size: ${getFontSize('input.searchBar', '1.6rem')};
    letter-spacing: ${getLetterSpacing('input.searchBar', '0.025em')};
  }

  ${breakpoint(1)`
    width: ${getProp('width', 1)};
    margin-top: ${getMarginTop('input.searchBar', '0')};
    margin-right: ${getMarginRight('input.searchBar', '1.4rem')};
    margin-bottom: ${getMarginBottom('input.searchBar', '2rem')};
    margin-left: ${getMarginLeft('input.searchBar', '0')};

    & > * {
      background-color: ${getBackgroundColor('input.searchBar', 'initial')};
      font-family: ${getFontFamily('input.searchBar', 'inherit')};
      font-weight: ${getFontWeight('input.searchBar', 'normal')};
      font-size: ${getFontSize('input.searchBar', '1.6rem')};
      letter-spacing: ${getLetterSpacing('input.searchBar', '0.025em')};
    }

  `}
`;

class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.styleRef = createRef();
  }

  focus() {
    if (this.props.useInnerRef)
      if (this.props.useInnerRef) this.props.useInnerRef.current.focus();
  }

  handleSelectChange(option) {
    this.props.valueFunctions.set({ [this.props.id]: Number(option.value) });
  }

  //* lifecycle and lifecylce helper **********************************

  render() {
    const {
      theme,
      placeholder,
      width,
      options,
      height,
      onInputChange,
      onBlur,
      useInnerRef,
    } = this.props;

    //custom component for holding selected value
    const customSingleValue = ({ children, ...props }) => {
      return (
        <components.SingleValue {...props}>
          {props.data.selectedLabel}
        </components.SingleValue>
      );
    };

    const customMenu = (props) => {
      return (
        <React.Fragment>
          <components.Menu {...props}>{props.children}</components.Menu>
          <DropDownIncrArrow />
        </React.Fragment>
      );
    };

    const icon = () => ({
      alignItems: 'center',
      display: 'flex',
      ':before': {
        content: '" "',
        background: `url(${getProp('icon')(this.props)}) center no-repeat`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        left: getProp('iconOffset')(this.props),
        height: getProp('iconHeight')(this.props),
        width: getProp('iconWidth')(this.props),
      },
    });

    const customStyles = {
      container: ({ defaultStyles }) => ({
        ...defaultStyles,
        position: 'relative',
        ':focus-within': {
          outline: '1px dotted #212121',
          outline: '5px auto -webkit-focus-ring-color',
        },
      }),
      control: ({ defaultStyles }) => ({
        // none of react-select's styles are passed to <Control />
        ...defaultStyles,
        ...icon(),
        width: '100%',
        boxSizing: 'border-box',
        paddingLeft: getProp('textOffset')(this.props),
        // This line disable the blue border
        boxShadow: 'none',
      }),
      valueContainer: (defaultStyles) => ({
        ...defaultStyles,
        border: 'none',
        boxShadow: 'none',
        maxHeight: height, //max height must be set to match input styling
      }),
      input: (defaultStyles) => ({
        ...defaultStyles,
        border: 'none',
        boxShadow: 'none',
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
      singleValue: (defaultStyles, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {
          ...defaultStyles,
          opacity,
          transition,
          color: getColor('select.searchBar', 'inherit'),
        };
      },
      placeholder: (defaultStyles) => ({
        ...defaultStyles,
        color: getProp('placeholderColor')(this.props),
      }),
      menu: (defaultStyles, state) => ({
        ...defaultStyles,
        position: 'relative',
        top: 1,
        margin: 0,
        padding: 0,
        border: 'none',
        backgroundColor: 'transparent',
      }),
      menuList: (defaultStyles, state) => ({
        ...defaultStyles,
        height: 200,
        padding: 0,
        boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.15)',
        //hide scroll bars for multiple browsers
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          height: 0,
          width: 0,
        },
        'ms-overflow-style': 'none',
      }),
      option: (defaultStyles, { isSelected, isFocused }) => ({
        ...defaultStyles,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '4rem',

        borderBottom: '1px dotted var(--secondary)',
        color: isSelected
          ? theme.colors.white
          : isFocused
          ? theme.colors.primary
          : theme.colors.lightText,
        backgroundColor: isSelected
          ? theme.colors.primary
          : isFocused
          ? theme.colors.secondary
          : theme.colors.white,
        fontWeight: isSelected ? 'bold' : 'normal',
      }),
    };

    return (
      <StyledSelect width={width} ref={this.styleRef}>
        <Select
          instanceId="react-select-1"
          className="input"
          isSearchable={false}
          placeholder={placeholder}
          styles={customStyles}
          options={options}
          components={{
            SingleValue: customSingleValue,
            Menu: customMenu,
          }}
          onChange={
            onInputChange ? onInputChange : this.handleSelectChange.bind(this)
          }
          onBlur={onBlur}
          ref={useInnerRef}
        />
      </StyledSelect>
    );
  }
}

export default withUseRef(CustomSelect);
