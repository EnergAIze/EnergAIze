import React,{useState,useContext, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import data from './mock'
// import { useContext } from 'react';
import {PredictContext} from "./context";
import Alert from '@mui/material/Alert';

export default function InputForm(props) {

  const { predictData, setPredictData,avgConsmptn, setavgConsmptn,landArea, setlandArea } = useContext(PredictContext);
  
  
  const formatData = (inputArr,days) =>{
    // console.log(data.values[0]);
    let values = inputArr.map(item => item );
    //console.log(returnVal['values']);
    let avg = values.reduce((total,num) => total+num ) / days;
    return avg;

  }


  // data.forecast['solar_avg'] = formatData(data.forecast.solar,15)
  // data.forecast['wind_avg'] = formatData(data.forecast.wind,15)


  // data.historical['solar_avg'] = formatData(data.historical.solar,3)
  // data.historical['wind_avg'] = formatData(data.historical.wind,3)

  
  // setPredictData(data);
  // console.log("data",data)
  const [disabled, setDisabled] =  useState(true);

  const [loader, setLoader] =  useState(false);

  const [lat, setLat] = useState();
  const [long, setlong] = useState();

  const [showErrorMsg, setError] = useState(false);
  // const [avgConsmptn, setavgConsmptn] = useState('');
  // const [landArea, setlandArea] = useState('');

    
  const latChangeHandler = (event) => {
    setLat(event.target.value);
  }
  const longChangeHandler = (event) => {
    setlong(event.target.value);
  }

  const avgConsmptnChangeHandler = (event) => {
    setavgConsmptn(event.target.value);
  }

  const landAreaChangeHandler = (event) => {
    setlandArea(event.target.value);
  }

  useEffect( () => {
    if(lat && long && avgConsmptn && landArea)

      setDisabled(false);
  },[lat,long,avgConsmptn,landArea])
  const clickHandler = () =>{
    setError(false)
    setLoader(true);
    fetch(`http://127.0.0.1:5100/api/predict?latitude=${lat}&longitude=${long}&area=${landArea}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).
    then(response => response.json())
    .then(res => {
      
      const predictResp = res;
      predictResp.forecast['solar_avg'] = formatData(predictResp.forecast.solar,15)
      predictResp.forecast['wind_avg'] = formatData(predictResp.forecast.wind,15)
    
    
      predictResp.historical['solar_avg'] = formatData(predictResp.historical.solar,3)
      predictResp.historical['wind_avg'] = formatData(predictResp.historical.wind,3)

      
      setPredictData(predictResp);
      setLoader(false);
    },
    err => {
     console.log(err);
     setLoader(false);
     setError(true);
    });
    // setPredictData(res);
  }

  return (
    <Box sx={{ p: 2, marginTop: "4px",borderBottom:"1px solid #DDE5ED",background:"#F6F9FC 0% 0% no-repeat padding-box"}}>
      <Grid container xs={12} spacing={2} >
        <Grid item xs={2} sx={{textAlign: "left"}}>
          <div><FormLabel required>Latitude</FormLabel></div>
          
        </Grid>
        <Grid item xs={2} sx={{textAlign: "left"}}>
          <div><FormLabel required>Longitude</FormLabel></div>
          
        </Grid>
        <Grid item xs={2} sx={{textAlign: "left"}}>
          <div><FormLabel required>Avg consumption (approx. in Watt per 15 days)</FormLabel></div>
          
        </Grid>        
        <Grid item xs={2} sx={{textAlign: "left"}}>
          <div><FormLabel required>Available Land Area (In Sq Mt)</FormLabel></div>
          
        </Grid>
        <Grid item xs={2}>
          <div><FormLabel>&nbsp;</FormLabel></div>
          
        </Grid>
        <Grid item xs={2}>
          <div>&nbsp;</div>
        </Grid>
     </Grid>

     <Grid container xs={12} spacing={2} >
        <Grid item xs={2} sx={{textAlign: "left"}}>
          <div><TextField size="small" label="Enter Value" variant="filled" value={lat}  
          onChange={(e)=>latChangeHandler(e)}
          sx={{border:"1px solid #B8C5DA",borderRadius:"4px"}}></TextField></div>
        </Grid>
        <Grid item xs={2} sx={{textAlign: "left"}}>
          <div><TextField size="small" label="Enter Value" variant="filled" value={long}  
          onChange={(e)=>longChangeHandler(e)}
          sx={{border:"1px solid #B8C5DA",borderRadius:"4px"}}></TextField></div>
        </Grid>
        <Grid item xs={2} sx={{textAlign: "left"}}>
          <div><TextField size="small" label="Enter Value" variant="filled" value={avgConsmptn}
          onChange={(e)=>avgConsmptnChangeHandler(e)}
          sx={{border:"1px solid #B8C5DA",borderRadius:"4px"}}></TextField></div>
        </Grid>        
        <Grid item xs={2} sx={{textAlign: "left"}}>
          <div><TextField size="small" label="Enter Area" variant="filled" value={landArea}
          onChange={(e)=>landAreaChangeHandler(e)}
          sx={{border:"1px solid #B8C5DA",borderRadius:"4px"}}></TextField></div>
        </Grid>
        <Grid item xs={2}>
          <div><Button variant="contained" fullWidth size="large" onClick={clickHandler} disabled={disabled}>
          Search</Button></div>
        </Grid>
        <Grid item xs={2} sx={{textAlign:'left'}}>
          {loader ? <CircularProgress/> : showErrorMsg ? <Alert severity="error">Error: Please Try Again Later!</Alert> : <div> &nbsp; </div> }
          
        </Grid>
     </Grid>
    </Box>

      
  );
}