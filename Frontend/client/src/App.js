// import {useState,React} from 'react'
import React,{useState} from 'react'
// import ReactDOM from 'react-dom'
// import logo from './logo.svg';
import './App.css';

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {orange} from '@mui/material/colors';
import AppHeader from "./components/AppHeader";
import InputForm from "./components/InputForm";
import PredictCharts from "./components/PredictCharts";
import HistoricReport from "./components/HistoricReport";
import Report from "./components/Report";
import {PredictContext} from "./components/context";
// import "@fontsource/roboto";

function ColoredComponent({ color }) {
  return (
    <div
      style={{
        backgroundColor: color,
        color: "white",
        paddingTop: "8px",
        paddingBottom: "8px",
        textAlign: "center"
      }}
    >
      <Typography variant="body1">Sample piece of text</Typography>
    </div>
  );
  }


function App() {

  const [predictData, setPredictData] = React.useState({});
  const [avgConsmptn, setavgConsmptn] = useState('');
  const [landArea, setlandArea] = useState('');


  console.log(" In App predictData: ",predictData);

  const savePredictData = (data) => {

    console.log('save pred',data)
    // setPredictData(prevState => ({
    //   ...prevState,
    //   ...data
    // }))

    setPredictData({'solar':[],'wind':[]})
    // setPredictData(data)
    console.log(predictData);
  }

  // Create a theme instance.
  const theme = createTheme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: orange[500],
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>

        <PredictContext.Provider value={{predictData, setPredictData,avgConsmptn, setavgConsmptn, landArea, setlandArea}} >
          <AppHeader/>
          
          <InputForm />
          <HistoricReport/>

          <PredictCharts/>

          <Report/>
        </PredictContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
