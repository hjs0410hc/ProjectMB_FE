import './App.css';
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";
import 'react-quill/dist/quill.snow.css';
import Pages from './pages/pages';
import React from 'react';
import { Box, Card, CssBaseline, Divider, GlobalStyles, Grid, Typography } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import {lightTheme,theme} from './theme';
import Layout from './components/Layout';
import ListofCategories from './components/ListofCategories';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import katex from 'katex';
import hljs from 'highlight.js';
import '@fontsource-variable/source-code-pro';
import '@fontsource/roboto';
import '@fontsource/noto-sans-kr';


window.katex= katex;
hljs.configure({
    language:['javascript','python','cpp','html']
})

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <CssBaseline />
        <GlobalStyles styles={{
          body: {fontFamily:['Noto Sans KR','Roboto','Helvetica','Arial','sans-serif'].join(',')}
        }}/>
        <ThemeProvider theme={theme}>
          <Layout>
            <Pages />
          </Layout>
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
