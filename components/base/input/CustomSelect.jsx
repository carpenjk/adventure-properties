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
  getPaddingTop,
  getPaddingRight,
  getPaddingBottom,
  getBoxShadow,
  getBorderRadius,
} from 'themeweaver';
import { getProp } from 'dataweaver';
import DropDownIncrArrow from '../DropDownIncrArrow';
import withUseRef from '../../WithUseRef';
import InputWrapper from './InputWrapper';
import InsetPlaceholder from './InsetPlaceholder';

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
  position: relative;
  display: block;
  width: 100%;
  background-color: ${getBackgroundColor({}, 'white')};
  border-radius: ${getBorderRadius({}, '5px')};
  cursor: pointer;

  &:focus-within {
    outline: 3px solid ${({ theme }) => `${theme.colors.link[0]}`};
  }

  & > .customSelect {
    color: ${getColor({}, 'inherit')};

    height: ${getHeight({}, '0')};
    box-shadow: ${getBoxShadow({}, '0px 0px 8px rgba(192, 192, 192, 0.52)')};
    border-radius: ${getBorderRadius({}, '5px')};
    padding-top: ${getPaddingTop({}, '0')};
    padding-right: ${getPaddingRight({}, '0')};
    padding-bottom: ${getPaddingBottom({}, '0')};
    border-style: none;
  }

  & input {
    height: ${getHeight({}, '0')};
  }

  & > * {
    font-family: ${getFontFamily({}, 'inherit')};
    font-weight: ${getFontWeight({}, 'normal')};
    font-size: ${getFontSize({}, '1.6rem')};
    letter-spacing: ${getLetterSpacing({}, '0.025em')};
  }

  ${breakpoint(1)`
    width: 100%;
    background-color: ${getBackgroundColor({}, 'white')};

    & > * {
      font-family: ${getFontFamily({}, 'inherit')};
      font-weight: ${getFontWeight({}, 'normal')};
      font-size: ${getFontSize({}, '1.6rem')};
      letter-spacing: ${getLetterSpacing({}, '0.025em')};
    }

  `}
`;

const DEFAULT_TW = {
  semKey: 'select',
};

class CustomSelect extends Component {
  customStyles = {
    container: (defaultStyles) => ({
      ...defaultStyles,
      position: 'relative',
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      ...this.icon(),
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',

      // This line disable the blue border
      boxShadow: 'none',
    }),
    valueContainer: (defaultStyles) => ({
      ...defaultStyles,
      padding: `0 0 0 ${getProp('textOffset')(this.props)}`,
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
        margin: 0,
      };
    },
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: this.props.showInsetPlaceholder
        ? 'transparent'
        : getColor('select.searchBar', 'inherit'),
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
      maxHeight: 200,
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

  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    const { value } = this.props;
    if (this.inputRef) {
      this.inputRef.current.value = '';
    }
    if (value) {
      this.setState({ isActive: true });
    }
  }

  handleSelectChange(option) {
    const { onChange, nextFocusRef, focusNext } = this.props;

    if (onChange) {
      onChange(option);
    }

    if (focusNext) {
      nextFocusRef.current.focus();
    } else {
      this.focus();
    }
  }

  handleFocus(option) {
    const { onFocus } = this.props || false;
    this.setState({ isActive: true });
    if (onFocus) onFocus(option);
  }

  handleBlur(option) {
    const { onBlur, innerRef } = this.props || false;
    if (innerRef && innerRef.current && !innerRef.current.state.value) {
      this.setState({ isActive: false });
    }
    if (onBlur) onBlur(option);
  }

  focus = () => {
    const { innerRef } = this.props || false;
    if (innerRef && innerRef.current) innerRef.current.select.focus();
  };

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

  render() {
    const {
      id,
      instanceId,
      innerRef,
      name,
      placeholder,
      width,
      options,
      showInsetPlaceholder,
      textOffset,
      tw,
      variant,
      value,
    } = this.props;
    const { inputRef } = this;

    const { isActive } = this.state;
    const mergedTW = { ...DEFAULT_TW, ...tw };

    return (
      <InputWrapper tw={mergedTW} width={width}>
        <StyledSelect tw={mergedTW} variant={variant} wrapperWidth={width}>
          {showInsetPlaceholder && (
            <InsetPlaceholder
              tw={mergedTW}
              isActive={isActive}
              offset={textOffset}
              translateX={placeholder.translateX}
              translateY={placeholder.translateY}
            >
              {placeholder.value}
            </InsetPlaceholder>
          )}

          <Select
            id={id}
            instanceId={instanceId}
            name={name}
            className="customSelect"
            classNamePrefix="customSelect"
            value={value}
            blurInputOnSelect={false}
            isSearchable={false}
            placeholder={
              placeholder && placeholder.value ? placeholder.value : placeholder
            }
            styles={this.customStyles}
            options={options}
            components={{
              SingleValue: customSingleValue,
              Menu: customMenu,
            }}
            onChange={this.handleSelectChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            ref={inputRef}
          />
        </StyledSelect>
      </InputWrapper>
    );
  }
}

export default withUseRef(CustomSelect);
