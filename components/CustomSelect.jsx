import React, { Component, createRef } from 'react';
import withUseRef from './WithUseRef';
import Select, { components, NonceProvider } from 'react-select';
import DropDownIncrArrow from './DropDownIncrArrow';
import styled from 'styled-components';

const StyleWrapper = styled.div`
  display: block;
  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
  @media (${(props) => props.mobileBreakpoint}) {
    width: ${(props) => props.width};
  }
`;

class CustomSelect extends Component {
  constructor(props) {
    super(props);
    this.styleRef = createRef();
    this.prevWrapperClass = '';
  }

  // handleChange = (option) => {
  //   const { input, valueFunctions } = this.props;
  //   const { set } = valueFunctions;

  //   set({ [input.id]: Number(option.value) });
  // };

  focus() {
    if (this.props.useInnerRef)
      if (this.props.useInnerRef) this.props.useInnerRef.current.focus();
  }

  //* lifecycle and lifecylce helper **********************************
  addWrapperClass() {
    const input = this.styleRef.current;
    if (this.prevWrapperClass) input.classList.remove(this.prevWrapperClass);
    if (this.props.wrapperClass) {
      input.classList.add(this.props.wrapperClass);
      this.prevWrapperClass = this.props.wrapperClass;
    }
  }
  addHideShowClass() {
    const input = this.styleRef.current;
    if (this.props.hide) {
      input.classList.add('hide');
    } else {
      input.classList.remove('hide');
    }
  }
  componentWillUnmount() {
    console.log('custom select will unmount', this.props.input.id);
  }
  componentDidMount() {
    this.addWrapperClass(this.props.wrapperClass);
    this.addHideShowClass();
  }
  componentDidUpdate() {
    this.addWrapperClass(this.props.wrapperClass);
    this.addHideShowClass();
  }

  render() {
    const {
      input,
      wrapperClass,
      height,
      mobileBreakpoint,
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
        background: `url(${input.icon.url}) center no-repeat`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        left: input.icon.offset,
        height: input.icon.height,
        width: input.icon.width,
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
        paddingLeft: input.textOffset,
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
          color: 'var(--primary)',
        };
      },
      placeholder: (defaultStyles) => ({
        ...defaultStyles,
        color: 'var(--lightText)',
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
        backgroundColor: 'var(--globalWhite)',
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
          ? 'var(--globalWhite)'
          : isFocused
          ? 'var(--primary)'
          : 'var(--lightText)',
        backgroundColor: isSelected
          ? 'var(--primary)'
          : isFocused
          ? 'var(--secondary)'
          : 'var(--globalWhite)',
        fontWeight: isSelected ? 'bold' : 'normal',
      }),
    };

    return (
      <StyleWrapper
        mobileBreakpoint={mobileBreakpoint}
        width={input.width}
        ref={this.styleRef}
      >
        <Select
          instanceId="react-select-1"
          className="input"
          isSearchable={false}
          placeholder={input.placeholder}
          styles={customStyles}
          options={input.options}
          components={{
            SingleValue: customSingleValue,
            Menu: customMenu,
          }}
          onChange={onInputChange}
          onBlur={onBlur}
          ref={useInnerRef}
        />
      </StyleWrapper>
    );
  }
}

export default withUseRef(CustomSelect);
