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
  },
};

export const GlobalStyles = () => (
  <style jsx global>
    {`
      @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');
      :root {
        --menu-color__main: E5707A;
        --header-height: 3rem;
        --breakpoint1: 900px;
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
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        color: ${colors.pallette.mainText};
        font-size: 2.6rem;
      }

      h2 {
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        color: ${colors.pallette.secondaryText};
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
        color: ${colors.pallette.mainText};
      }
      .input {
        font-family: 'Poppins', sans-serif;
        font-size: 1.6rem;
        letter-spacing: 0.025em;
        color: ${colors.pallette.lightText};

        height: 4rem;
        background: #ffffff;
        box-shadow: 0px 0px 8px rgba(192, 192, 192, 0.52);
        border-radius: 5px;
        padding: 0;
        border-style: none;
      }
      .smallText1 {
        font-family: 'Poppins', sans-serif;
        font-size: 1.1rem;
      }
      ul {
        padding: 0;
      }
      li {
        font-size: 1.5rem;
        list-style: none;
      }

      a {
        text-decoration: none;
      }
    `}
  </style>
);
