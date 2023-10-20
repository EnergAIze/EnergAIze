import React, { useContext } from 'react';
import SimpleBarChart from './SimpleBarChart'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PredictContext } from "./context";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

export default function Report(props) {
  const { predictData, landArea, avgConsmptn } = useContext(PredictContext);

  const header = ['Day', 'Power Consumption (in Watt)']

  const rows = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    [11, 22, 13, 54, 65, 46, 87, 89, 92, 30, 21, 42, 63, 84, 75],
  ];

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#EBF0F6",
      color: "#232323",
      borderBottom: "1px solid #DDE5ED",
      borderTop: "1px solid #DDE5ED",
    },
    '&:nth-of-type(even)': {
      backgroundColor: "#FFFFFF",
      color: "#232323",
      borderBottom: "1px solid #DDE5ED",
    },
    'th:nth-of-type(1)': {
      fontWeight: "bold",
      width: "10%",
    },
    'td:nth-of-type(odd)': {
      width: "6%",
    }, 'td:nth-of-type(even)': {
      width: "6%",
    }
  }));

  return !!predictData?.forecast && (
    <Box sx={{ p: 2, borderRadius: '5px', border: '1px solid #DDE5ED', margin: '25px', background: ' #F6F9FC 0% 0% no-repeat padding-box', textAlign: 'left' }}>

      <Grid container xs={12} >
        {predictData?.forecast?.solar_avg ? (<Grid container xs={6} >
          <Box sx={{ p: 2, borderRadius: '5px', border: '1px solid #DDE5ED', margin: '25px', background: ' #FFFFFF 0% 0% no-repeat padding-box', width: '100%', textAlign: 'left' }}>
            <Typography sx={{ textAlign: 'left', color: '#4E4E4E', fontSize: '18px', marginBottom: '25px' }}>
              Solar
            </Typography>
            <Typography variant="h5" sx={{ color: '#4E4E4E' }}>
              Total Forecasted Power Generation (15 Days): <strong>{(predictData?.forecast?.solar_avg).toFixed(2)} W</strong>
            </Typography>

            <Typography variant="h5" sx={{ color: '#4E4E4E' }}>
              Deficit/Surplus
              <Tooltip title="Deficit/Surplus shows the difference of Avg consumption (approx.) and Avg forecasted generation for 15 days">
                <InfoIcon style={{ width: '0.8em', height: '0.8em' }} />
              </Tooltip>: <strong style={{ fontSize: '700' }}>{(predictData?.forecast?.solar_avg - avgConsmptn).toFixed(2)} W</strong>
            </Typography>

          </Box></Grid>) : ''}

        {predictData?.forecast?.wind_avg ? (<Grid container xs={6} >
          <Box sx={{ p: 2, borderRadius: '5px', border: '1px solid #DDE5ED', margin: '25px 25px 25px 25px', background: ' #FFFFFF 0% 0% no-repeat padding-box', width: '100%', textAlign: 'left' }}>
            <Typography sx={{ textAlign: 'left', color: '#4E4E4E', fontSize: '18px', marginBottom: '25px' }}>
              Wind
            </Typography>
            <Typography variant="h5" sx={{ color: '#4E4E4E' }}>
              Total Forecasted Power Generation (15 Days): <strong>{(predictData?.forecast?.wind_avg).toFixed(2)} W</strong>
            </Typography>
            <Typography variant="h5" sx={{ color: '#4E4E4E' }}>
              Deficit/Surplus
              <Tooltip title="Deficit/Surplus shows the difference of Avg consumption (approx.) and Avg forecasted generation for 15 days">
                <InfoIcon style={{ width: '0.8em', height: '0.8em' }} />
              </Tooltip>: <strong>{(predictData?.forecast?.wind_avg - avgConsmptn).toFixed(2)} W</strong>
            </Typography>
          </Box></Grid>) : ''}

        {/*     
  return !!predictData && (
    <div style={{marginLeft:'25px',marginRight:'25px'}}>
    { predictData?.solar?.avg ? (<Grid container xs={12} >
      <Typography variant="h5"  sx={{color:'#4E4E4E'}}>
      Total Forecasted Solar Power Generated (15 Days): <strong>{predictData?.wind?.avg * landArea}</strong>
      </Typography>
    </Grid>) : '' }

    { predictData?.wind?.avg ? (<Grid container xs={12} >
      <Typography variant="h5"  sx={{color:'#4E4E4E'}}>
      Total Forecasted Wind Power Generated (15 Days): <strong>{predictData?.wind?.avg * landArea}</strong>
      </Typography>
    </Grid>) : '' }

    { predictData?.wind?.avg ? (<Grid container xs={12} >
      <Typography variant="h5"  sx={{color:'#4E4E4E'}}>
      Surplus (Solar): <strong>{predictData?.wind?.avg * landArea - avgConsmptn}</strong>
      </Typography>
    </Grid>) : '' }
    { predictData?.wind?.avg ? (<Grid container xs={12} >
      <Typography variant="h5"  sx={{color:'#4E4E4E'}}>
      Surplus (Wind): <strong>{predictData?.wind?.avg * landArea - avgConsmptn}</strong>
      </Typography>
    </Grid>) : '' } */}



        {/* { predictData?.solar ? (<TableContainer style={{marginTop:'25px',marginBottom:'25px'}} component={Paper}>
      <Table   aria-label="simple table">
        <TableBody>
          {rows.map((row,index) => (
            <StyledTableRow
              key={index}
              
            >
                <TableCell component="th" variant="head">{header[index]}</TableCell>
                {row.map((value) => (
              
                <TableCell component="td" scope="row">
                  {value}
                </TableCell>
                ))} 
              </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>) : '' } */}


      </Grid></Box>
  );
}

