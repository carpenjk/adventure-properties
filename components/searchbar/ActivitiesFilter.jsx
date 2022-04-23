import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import FormikAsyncSelect from '../base/input/FormikAsyncSelect';

const ActivitiesFilter = () => {
  const theme = useContext(ThemeContext);

  async function fetchData(q) {
    const data = await fetch(`/api/activities?q=${q}`);
    const activities = await data.json();
    return activities;
  }

  return (
    <FormikAsyncSelect
      id="nearbyActivities"
      instanceId="nearbyActivities"
      name="nearbyActivities"
      theme={theme}
      key="nearbyActivities"
      placeholder={{
        value: 'Activities',
        translateX: '0px',
        translateY: '-18px',
      }}
      width={['100%', '457px']}
      textOffset="5px"
      getOptionLabel={(val) => val}
      getOptionValue={(val) => val}
      loadOptions={fetchData}
      isMulti
    />
  );
};

export default ActivitiesFilter;
