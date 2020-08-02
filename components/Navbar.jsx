import Link from 'next/link';

//configs

import { NavMenu_config } from '../compConfig';
import { NavToggle_config } from '../compConfig';

//components
import NavMenu from './NavMenu';
import NavToggle from './NavToggle';

//assets
const logo = '../static/assets/LogoMain.svg';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href="/">
        <div className="logoContainer">
          <img src={logo} alt="logo" />
        </div>
      </Link>
      <NavToggle
        position={NavToggle_config.position}
        height="80px"
        maxWidth="350px"
        itemMinWidth="80px"
        items={NavToggle_config.items}
      />
      <NavMenu
        position={NavMenu_config.position}
        height="80px"
        maxWidth="400px"
        itemMinWidth="85px"
        items={NavMenu_config.items}
      />
      <style jsx>
        {`
          .navbar {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 1fr;
            grid-gap: 20px;
            justify-items: stretch;
            align-items: center;
            height: 80px;
            padding: 0 20px 0 20px;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
          }
          .logoContainer {
            grid-column: 0 / 1;
            display: flex;
            justify-content: flex-start;
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;
