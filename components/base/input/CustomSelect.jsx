import React, { Component, createRef } from 'react';
import Select, { components } from 'react-select';
import styled from 'styled-components';
import {
  breakpoint,
  getColor,
  getHeight,
  getBackgroundColor,
  getFontFamily,
  getFontSize,
  getFontWeight,
  getLetterSpacing,
  getMarginTop,
  getMarginRight,
  getMarginBottom,
  getMarginLeft,
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getBoxShadow,
  getBorderRadius,
} from 'themeweaver';
import { getProp } from 'dataweaver';
import DropDownIncrArrow from '../DropDownIncrArrow';
import withUseRef from '../../WithUseRef';

// custom component for holding selected value
const customSingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    {props.data.selectedLabel}
  </components.SingleValue>
);

const customMenu = (props) => (
  <>
    <components.Menu {...props}>{props.children}</components.Menu>
    <DropDownIncrArrow />
  </>
);

const StyledSelect = styled.div`
  display: block;
  width: ${getProp('wrapperWidth', 1)};
  margin-top: ${(props) => getMarginTop(`input.${props.variant}`, '0')(props)};
  margin-right: ${(props) =>
    getMarginRight(`input.${props.variant}`, '0')(props)};
  margin-bottom: ${(props) =>
    getMarginBottom(`input.${props.variant}`, '0')(props)};
  margin-left: ${(props) =>
    getMarginLeft(`input.${props.variant}`, '0')(props)};

  & .customSelect__control--is-focused {
    outline: 5px auto -webkit-focus-ring-color;
  }

  & > .customSelect {
    color: ${(props) => getColor(`input.${props.variant}`, 'inherit')(props)};

    height: ${(props) => getHeight(`input.${props.variant}`, '0')(props)};
    box-shadow: ${(props) =>
      getBoxShadow(
        `input.${props.variant}`,
        '0px 0px 8px rgba(192, 192, 192, 0.52)'
      )(props)};
    border-radius: ${(props) =>
      getBorderRadius(`input.${props.variant}`, '5px')(props)};
    padding-top: ${(props) =>
      getPaddingTop(`input.${props.variant}`, '0')(props)};
    padding-right: ${(props) =>
      getPaddingRight(`input.${props.variant}`, '0')(props)};
    padding-bottom: ${(props) =>
      getPaddingBottom(`input.${props.variant}`, '0')(props)};
    border-style: none;
  }

  & input {
    height: ${(props) => getHeight(`input.${props.variant}`, '0')(props)};
  }

  & > * {
    width: 100%;
    background-color: ${(props) =>
      getBackgroundColor(`input.${props.variant}`, 'initial')(props)};

    font-family: ${(props) =>
      getFontFamily(`input.${props.variant}`, 'inherit')(props)};
    font-weight: ${(props) =>
      getFontWeight(`input.${props.variant}`, 'normal')(props)};
    font-size: ${(props) =>
      getFontSize(`input.${props.variant}`, '1.6rem')(props)};
    letter-spacing: ${(props) =>
      getLetterSpacing(`input.${props.variant}`, '0.025em')(props)};
  }

  ${breakpoint(1)`
    width: ${getProp('wrapperWidth', 1)};
    margin-top: ${(props) =>
      getMarginTop(`input.${props.variant}`, '0')(props)};
    margin-right: ${(props) =>
      getMarginRight(`input.${props.variant}`, '1.4rem')(props)};
    margin-bottom: ${(props) =>
      getMarginBottom(`input.${props.variant}`, '2rem')(props)};
    margin-left: ${(props) =>
      getMarginLeft(`input.${props.variant}`, '0')(props)};

    & > * {
      background-color: ${(props) =>
        getBackgroundColor(`input.${props.variant}`, 'initial')(props)};
      font-family: ${(props) =>
        getFontFamily(`input.${props.variant}`, 'inherit')(props)};
      font-weight: ${(props) =>
        getFontWeight(`input.${props.variant}`, 'normal')(props)};
      font-size: ${(props) =>
        getFontSize(`input.${props.variant}`, '1.6rem')(props)};
      letter-spacing: ${(props) =>
        getLetterSpacing(`input.${props.variant}`, '0.025em')(props)};
    }

  `}
`;

class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.styleRef = createRef();
    // this.state = {
    //   isOpen: false,
    //   isFocused: false,
    // };
  }

  focus = () => {
    if (this.props.useInnerRef && this.props.useInnerRef.current)
      this.props.useInnerRef.current.select.focus();
  };

  handleSelectChange(option) {
    console.log('handleSelectChange');
    const {
      onInputChange,
      valueFunctions,
      id,
      nextFocusRef,
      focusNext,
    } = this.props;
    // this.setState({ isOpen: false });
    if (onInputChange) {
      onInputChange();
    } else {
      valueFunctions.set({ [this.props.id]: Number(option.value) });
    }
    if (focusNext) {
      nextFocusRef.current.focus();
    } else {
      this.focus();
    }
  }

  handleFocus(option) {
    if (this.props.onFocus) this.props.onFocus(option);
    // this.setState({ isOpen: true, isFocused: true });
  }

  handleBlur(option) {
    const { onBlur } = this.props;
    // this.setState({ isOpen: false, isFocused: false });
    if (onBlur) onBlur(option);
  }

  icon = () => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
      content: '" "',
      background: getProp('icon')(this.props)
        ? `url(${getProp('icon')(this.props)}) center no-repeat`
        : 'none',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      left: getProp('iconOffset')(this.props),
      height: getProp('iconHeight')(this.props),
      width: getProp('iconWidth')(this.props),
    },
  });

  customStyles = {
    container: (defaultStyles) => ({
      ...defaultStyles,
      position: 'relative',
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      ...this.icon(),
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
      maxHeight: this.props.height, // max height must be set to match input styling
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
    menu: (defaultStyles) => ({
      ...defaultStyles,
      position: 'relative',
      top: 1,
      margin: 0,
      padding: 0,
      border: 'none',
      backgroundColor: 'transparent',
      outline: 'none',
    }),
    menuList: (defaultStyles) => ({
      ...defaultStyles,
      height: 200,
      padding: 0,
      boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.15)',
      // hide scroll bars for multiple browsers
      scrollbarWidth: 'none',
      '::-webkit-scrollbar': {
        height: 0,
        width: 0,
      },
      msOverflowStyle: 'none',
      outline: 'none',
    }),
    option: (defaultStyles, { isSelected, isFocused }) => ({
      ...defaultStyles,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: '4rem',

      borderBottom: '1px dotted var(--secondary)',
      color: isSelected
        ? this.props.theme.colors.white
        : isFocused
        ? this.props.theme.colors.primary
        : this.props.theme.colors.lightText,
      backgroundColor: isSelected
        ? this.props.theme.colors.primary
        : isFocused
        ? this.props.theme.colors.secondary
        : this.props.theme.colors.white,
      fontWeight: isSelected ? 'bold' : 'normal',
    }),
  };

  render() {
    const {
      innerKey,
      name,
      placeholder,
      width,
      options,
      onInputChange,
      useInnerRef,
      variant,
      value,
    } = this.props;

    return (
      <StyledSelect variant={variant} wrapperWidth={width} ref={this.styleRef}>
        <Select
          id={innerKey}
          name={name}
          instanceId={innerKey}
          className="customSelect"
          classNamePrefix="customSelect"
          value={value}
          blurInputOnSelect={false}
          isSearchable={false}
          placeholder={placeholder}
          styles={this.customStyles}
          options={options}
          components={{
            SingleValue: customSingleValue,
            Menu: customMenu,
          }}
          onChange={onInputChange || this.handleSelectChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          ref={useInnerRef}
        />
      </StyledSelect>
    );
  }
}

export default withUseRef(CustomSelect);
