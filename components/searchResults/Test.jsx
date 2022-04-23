import useHasMounted from '../hooks/UseHasMounted';

const Test = (props) => {
  const { FiltersMenu, DashboardMenuLayout, ...fwdProps } = props;
  console.log('🚀 ~ file: Test.jsx ~ line 5 ~ Test ~ FiltersMenu', FiltersMenu);
  console.log(
    '🚀 ~ file: Test.jsx ~ line 5 ~ Test ~ DashboardMenuLayout',
    DashboardMenuLayout
  );
  const hasMounted = useHasMounted;
  return (
    <div>
      <FiltersMenu />
    </div>
  );
};

export default Test;
