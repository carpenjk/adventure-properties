import { theme } from '../../theme';

// export const colors = {
//   menuColor: {
//     primary: '#E5707A',
//     hover: '#F6E8E8',
//   },
//   pallette: {
//     primary: '#7789C8',
//     secondary: '#C6D8FF',
//     action: '#E5707A',
//     lightText: '#979797',
//     mainText: '#444649',
//     secondaryText: '#E5707A',
//     lightBackground: '#F8F8F8',
//     disabledBackground: '#E2E2E2',
//     globalWhite: '#ffffff',
//   },
// };

export const GlobalStyles = () => (
  <style jsx global>
    {`
      @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Walter+Turncoat&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@700&display=swap');
      :root {
        --menu-color__main: #e5707a;
        --header-height: 3rem;
        --breakpoint1: 900px;
        --primary: ${theme.colors.primary};
        --secondary: ${theme.colors.secondary};
        --action: ${theme.colors.action[1]};
        --lightText: ${theme.colors.lightText};
        --mainText: ${theme.colors.mainText};
        --secondaryText: ${theme.colors.secondaryText};
        --lightBackground: ${theme.colors.lightBackground};
        --disabledBackground: ${theme.colors.disabledBackground};
        --globalWhite: ${theme.colors.white};

        --headerFont: 'Poppins', sans-serif;
        --inputFont: 'Poppins', sans-serif;
        --smallFont: 'Poppins', sans-serif;
        --buttonFont: Roboto;
        --menuFont: 'Poppins', sans-serif;
      }
      html {
        height: 100%;
        width: 100%;
        min-width: 320px;
        box-sizing: border-box;
        margin: 0;
        font-family: 'Open Sans', sans-serif;
        font-size: 10px;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        height: 100%;
        width: 100%;
        position: relative;
        margin: 0;
      }

      h1 {
        font-family: ${theme.fonts.poppins};
        font-weight: 700;
        color: ${theme.colors.mainText};
        font-size: ${theme.fontSizes[4]}px;
      }

      h2 {
        font-family: ${theme.fonts.poppins};
        font-weight: 700;
        color: ${theme.colors.secondaryText};
        font-size: ${theme.fontSizes[3]}px;
        letter-spacing: 0.05em;
      }

      h3 {
        font-size: 1.75rem;
      }

      p {
        color: ${theme.colors.mainText};
      }

      ::placeholder {
        color: ${theme.colors.lightText};
        opacity: 100%;
      }
      label {
        font-family: ${theme.fonts.poppins};
        font-size: 1.6rem;
        letter-spacing: 0.025em;
        color: ${theme.colors.primary};
      }
      .smallText1 {
        font-family: ${theme.fonts.poppins};
        font-size: 1.1rem;
      }
      ul {
        padding: 0;
      }
      li {
        list-style: none;
      }

      a {
        text-decoration: none;
      }
      button {
        font-family: ${theme.fonts.roboto};
        font-style: normal;
        font-weight: bold;
        border: none;
        cursor: pointer;
      }
      .actionButton {
        font-weight: bold;
        font-size: 1.8rem;
        box-shadow: 0px 1px 2px rgba(116, 108, 108, 0.25);
        border-radius: 10px;
        display: flex;
        align-items: center;
        text-align: center;
        padding: 1.5rem;
      }
      .cardHeader {
        flex: none;
        font-family: Open Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 1.8rem;
        letter-spacing: 0.025em;
        color: ${theme.colors.mainText};
        display: flex;
        align-items: center;
      }
    `}
  </style>
);
