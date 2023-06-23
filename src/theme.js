import { blue, blueGrey, pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const lightTheme = createTheme({
    typography:{
        "fontFamily":'"Noto Sans KR","roboto"'
    },
    palette: {
        background:{
            default:'#035831'
        },
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

 const theme = createTheme({
    palette:{
        background:{
            default:blue[300]
        },
        primary:{
            main:blueGrey[600]
        }
    },
    typography:{
        fontFamily:["Noto Sans KR","Roboto"].join(',')
    },
 }) 

export {lightTheme,theme};