const InputBase = props => {
  const { input, spaceAfter, onClick } = props;
  return (
    <React.Fragment>
      <input
        type={input.type}
        className="input"
        id={input.id}
        placeholder={input.placeholder}
        onClick={onClick}
      />
      <style jsx>{`
        #${input.id} {
          width: ${input.width};
          padding-left: ${input.textOffset};
          background: url(${input.icon.url}) no-repeat ${input.icon.offset} 50%;
          margin-right: ${spaceAfter};
        }
      `}</style>
    </React.Fragment>
  );
};

export default InputBase;
