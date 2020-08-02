const DropDownIncrArrow = props => {
  return (
    <div className={`arrowContainer `}>
      <div className="downArrow">Increment Guests</div>
      <style jsx>
        {`
          .arrowContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            align-content: center;
            height: 3rem;
            width: 100%;
            background: rgba(255, 255, 255, 0.85);
            border-radius: 0 0 3px 3px;
          }
          .downArrow {
            height: 1px;
            width: 1px;
            margin-top: 0.9rem;
            overflow: hidden;
            border: 0.9rem solid transparent;
            border-top-color: var(--lightText);
            border-radius: 5px;
          }
          .activeColor {
            background: var(--globalWhite);
          }
        `}
      </style>
    </div>
  );
};

export default DropDownIncrArrow;
