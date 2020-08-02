import { useRef } from 'react';
const withUseRef = Component => {
  function WithUseRef(props) {
    const useInnerRef = useRef(null);
    const { forwardedRef, ...rest } = props;

    return <Component ref={forwardedRef} useInnerRef={useInnerRef} {...rest} />;
  }
  WithUseRef.displayName = `withUseRef(${Component.displayName})`;

  return React.forwardRef((props, ref) => {
    return <WithUseRef forwardedRef={ref} {...props} />;
  });
};

export default withUseRef;
