import './App.css';
import '@fontsource/roboto';
import { Box, TextField, Button, CircularProgress, InputAdornment, FormControlLabel, Typography, Paper} from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';


const useStyles = makeStyles({
  form:{
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    padding:" 1rem 1.8rem",
    margin:"0.4rem 0.9rem"

  },
  flex:{
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    padding:" 1rem 1.8rem",
    margin:"0.4rem 0.9rem"

  },
  label:{
    fontWeight:"500",
    fontSize:"39px",
    margin:"0.9rem 0",
    padding:"0.9rem 0"
  },
  info:
{
  display: "flex",
  justifyContent:"center",
  alignItems:"center",
  padding:"0.6rem 0",
  flexDirection:"column"
}

});






function App() {

const classes = useStyles();



const location = useState("east london");
const [error, setError] = useState(false);
const [text, setText ] =useState("");
const [loading, setLoading] = useState(true);
const [ data, setData] = useState(false);
const [ uri, setUri ] = useState(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=15b76655a4ecf1a25ee22293d7e576f3&units=metric`);


const handleSubmit=(e)=>{
   e.preventDefault();
   setUri(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=15b76655a4ecf1a25ee22293d7e576f3&units=metric`);

 }

 useEffect(()=>{
  fetch(uri)
  .then( response =>{

    if(!response.ok){
      setLoading(false)
      throw Error ('City/town not found...')
    }else{
      return response.json();
    }

  })
  .then( data =>{
      setLoading(false);
      setError(false);
      setData(data);
  })
  .catch( err =>{
      setLoading(false);
      setError(err.message)
      setData(null)
  })
}, [uri])



  return (
    <Box component="div" className={ classes.flex }>
          <Box component="form" autoComplete="off" className={ classes.form } onSubmit={(e)=> handleSubmit(e)}>
                  <label className={ classes.label}>WeatherApp</label>
                  <FormControlLabel 
                  labelPlacement="top"
                  label="Search city/town name"
                  control={
                    <TextField  sx={{ margin: 2 }} 
                      label="city/town"
                      
                      variant="outlined" 
                      placeholder="East london"
                      helperText="e.g East london, etc"
                      required
                      onChange={(e=>{
                        
                        setText(e.target.value);
                      
                      })}
                      InputProps={{
                        startAdornment:(<InputAdornment position="start">{<LocationOn />}</InputAdornment>),
                      }}
                    />

                  } />
            { loading && <p><CircularProgress color="info" size={ 30 } thickness={ 2.3 } /></p> }
            { error &&<p>{ error }</p>}
            
            <Button  size="small" type="submit" variant="contained" disableElevation color="primary">search</Button >
            </Box>
            
            { data && 
                <Paper elevation={ 4 } variant="outline" className={ classes.form }>
                   <Typography sx={{margin: "0.9rem 0", letterSpacing:"1px" , fontSize:"20px"}}><LocationOn />{ data.name }, { data.sys.country}</Typography>
                   
                   <Paper sx={{ minWidth: 136, padding:"0.4rem 1rem" }} component="div" className={ classes.info }>
                    <Typography align="center">{ data.weather[0].description}</Typography>
                     <Typography component="div" align="center" sx={{ width: 50, height: 50, margin:0, padding:0}}>
                        <img alt="icon" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
                     </Typography>
                    
                    <Typography align="center">{ data.main.temp} &deg;C</Typography>
                    </Paper>
                  
                </Paper>
            }
            
    </Box>
  );
}

export default App;
