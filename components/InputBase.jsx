import { Component, useRef, createRef } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding-left: ${(props) => props.input.textOffset};
  background-image: url(${(props) => props.input.icon.url});
  background-repeat: no-repeat;
  background-position: ${(props) => props.input.icon.offset} 50%;

  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
  @media (${(props) => props.mobileBreakpoint}) {
    width: ${(props) => props.input.width};
  }
`;

class InputBase extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.prevWrapperClass = '';
  }
  handleBlur = (e) => {
    const { nextFocusRef, onInputChange } = this.props;
    onInputChange(e);
    if (nextFocusRef) nextFocusRef.focus();
  };
  focus() {
    const { inputRef } = this.props;
    if (inputRef.current) inputRef.current.focus();
  }

  //* lifecycle and lifecylce helper **********************************
  addWrapperClass() {
    const input = this.inputRef.current;
    if (this.prevWrapperClass) input.classList.remove(this.prevWrapperClass);
    if (this.props.wrapperClass) {
      input.classList.add(this.props.wrapperClass);
      this.prevWrapperClass = this.props.wrapperClass;
    }
  }
  addHideShowClass() {
    const input = this.inputRef.current;
    if (this.props.hide) {
      input.classList.add('hide');
    } else {
      input.classList.remove('hide');
    }
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
      value,
      hide,
      valueFunctions,
      wrapperClass,
      mobileBreakpoint,
      onClick,
      onBlur,
      onFocus,
    } = this.props;
    //const { get } = valueFunctions;

    return (
      <React.Fragment>
        <Input
          type="text"
          value={value}
          input={input}
          className="input"
          mobileBreakpoint={mobileBreakpoint}
          id={input.id}
          placeholder={input.placeholder}
          onClick={onClick}
          onBlur={this.handleBlur}
          onFocus={onFocus}
          ref={this.inputRef}
        />
      </React.Fragment>
    );
  }
}

export default InputBase;
