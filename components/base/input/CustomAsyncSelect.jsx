import React, { Component, createRef } from 'react';
import { components } from 'react-select';
import AsyncSelect from 'react-select/async';
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
  & .customSelect__input {
    color: ${getColor({})};
  }

  & input {
    height: ${getHeight({}, '0')};
  }

  & > * {
    width: 100%;
    font-family: ${getFontFamily({}, 'inherit')};
    font-weight: ${getFontWeight({}, 'normal')};
    font-size: ${getFontSize({}, '1.6rem')};
    letter-spacing: ${getLetterSpacing({}, '0.025em')};
  }

  ${breakpoint(1)`
    width: 100%;
    background-color: ${getBackgroundColor({}, 'white')};

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
    & .customSelect__input {
      color: ${getColor({})};
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

  `}
`;

const DEFAULT_TW = {
  semKey: 'select',
};

class CustomAsyncSelect extends Component {
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
        ? this.props.theme.colors.white
        : this.props.theme.colors.lightText,
      backgroundColor: isSelected
        ? this.props.theme.colors.primary[0]
        : isFocused
        ? this.props.theme.colors.primary[0]
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
    const { onBlur } = this.props || false;
    const { inputRef } = this;
    console.log('blur', inputRef);
    if (inputRef && !inputRef.current.select.state.value) {
      this.setState({ isActive: false });
    }
    if (onBlur) onBlur(option);
  }

  focus = () => {
    const { inputRef } = this;
    if (inputRef && inputRef.current) inputRef.current.select.focus();
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
      name,
      placeholder,
      width,
      showInsetPlaceholder,
      textOffset,
      tw,
      variant,
      value,
      loadOptions,
      getOptionLabel,
      getOptionValue,
      isMulti,
    } = this.props;
    const { inputRef } = this;
    const { isActive } = this.state;
    const mergedTW = { ...DEFAULT_TW, ...tw };

    return (
      <InputWrapper tw={mergedTW} width={width}>
        <StyledSelect
          tw={mergedTW}
          variant={variant}
          wrapperWidth={width}
          ref={this.styleRef}
        >
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

          <AsyncSelect
            isMulti={isMulti}
            isSearchable
            loadOptions={loadOptions}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            id={id}
            instanceId={instanceId}
            name={name}
            className="customSelect"
            classNamePrefix="customSelect"
            value={value}
            blurInputOnSelect={false}
            placeholder={
              placeholder && placeholder.value ? placeholder.value : placeholder
            }
            styles={this.customStyles}
            components={{
              // SingleValue: customSingleValue,
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

export default withUseRef(CustomAsyncSelect);
