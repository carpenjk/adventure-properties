import { colors } from '../global/base';
import InputBase from './InputBase';

//configs

import { SearchBar_config } from '../compConfig';

const icon = './static/assets/search-container/icon/location.svg';
const SearchBar = () => {
  const { inputs } = SearchBar_config;
  return (
    <div className="searchBar">
      {inputs.map((input, index) => {
        return (
          <InputBase
            key={input.id}
            input={input}
            spaceAfter={index === inputs.length - 1 ? '0' : '1.3rem'}
          />
        );
      })}
      <style jsx>
        {`
          .searchBar {
            position: relative;
            width: 72.2rem;
            top: 20px;
            margin: auto;
            padding: 0.5rem;
            border-radius: 8px;
            background: ${colors.pallette.lightBackground};
          }
        `}
      </style>
    </div>
  );
};

export default SearchBar;
