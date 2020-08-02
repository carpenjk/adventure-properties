export const colors = {
  menuColor: {
    primary: '#E5707A',
    hover: '#F6E8E8',
  },
  pallette: {
    primary: '#7789C8',
    secondary: '#C6D8FF',
    action: '#E5707A',
    lightText: '#979797',
    mainText: '#444649',
    secondaryText: '#E5707A',
    lightBackground: '#F8F8F8',
    disabledBackground: '#E2E2E2',
    globalWhite: '#ffffff',
  },
};

export const GlobalStyles = () => (
  <style jsx global>
    {`
      @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Walter+Turncoat&display=swap');
      :root {
        --menu-color__main: #e5707a;
        --header-height: 3rem;
        --breakpoint1: 900px;
        --primary: ${colors.pallette.primary};
        --secondary: ${colors.pallette.secondary};
        --action: ${colors.pallette.action};
        --lightText: ${colors.pallette.lightText};
        --mainText: ${colors.pallette.mainText};
        --secondaryText: ${colors.pallette.secondaryText};
        --lightBackground: ${colors.pallette.lightBackground};
        --disabledBackground: ${colors.pallette.disabledBackground};
        --globalWhite: ${colors.pallette.globalWhite};

        --headerFont: 'Poppins', sans-serif;
        --inputFont: 'Poppins', sans-serif;
        --smallFont: 'Poppins', sans-serif;
        --buttonFont: Roboto;
        --menuFont: 'Poppins', sans-serif;
      }
      html {
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
        margin: 0;
      }

      h1 {
        font-family: var(--headerFont);
        font-weight: 700;
        color: var(--mainText);
        font-size: 2.6rem;
      }

      h2 {
        font-family: var(--headerFont);
        font-weight: 700;
        color: var(--secondaryText);
        font-size: 2rem;
        letter-spacing: 0.05em;
      }

      h3 {
        font-size: 1.75rem;
        color: teal;
      }

      p {
        font-size: 1.6rem;
        letter-spacing: 0.25em;
        line-height: 150%;
        color: var(--mainText);
      }
      .input,
      input {
        font-family: var(--inputFont);
        font-size: 1.6rem;
        letter-spacing: 0.025em;
        color: var(--primary);

        height: 4rem;
        background-color: var(--globalWhite);
        box-shadow: 0px 0px 8px rgba(192, 192, 192, 0.52);
        border-radius: 5px;
        padding: 0;
        border-style: none;
      }
      ::placeholder {
        color: var(--lightText);
        opacity: 100%;
      }
      label {
        font-family: var(--inputFont);
        font-size: 1.6rem;
        letter-spacing: 0.025em;
        color: var(--primary);
      }
      .smallText1 {
        font-family: var(--smallFont);
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
        font-family: var(--buttonFont);
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
        color: var(--mainText);
        display: flex;
        align-items: center;
      }
    `}
  </style>
);
