import React, { useEffect, useState } from 'react';
import { Header, Page } from 'components';
import axios from 'utils/publicAxios';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Plot from 'react-plotly.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  alert:{
    marginBottom: '1%'
  },
  progress: {
    marginBottom: '1%'
  }
}));

const Data = () => {
  const classes = useStyles();

  const [newAlert, setNewAlert] = useState(false);  
  const [data, setData] = useState(null);
  const [chartOptions, setChartOptions] = useState([]);
  const [progress, setProgress] = useState(true);
  const [layout, setLayout] = useState({});

  useEffect(()=>{
    let mounted = true;

    const fetchData = () => {
      axios.get('data.json')
        .then((res)=>{
          if (mounted) {
            setData(res.data)
          }
        })
        .catch(()=>{
          setNewAlert(true);
        })    
    };

    fetchData();

    return () => {
      mounted = false;
    };
  },[])

  useEffect(()=>{
    if(data){
      const others = {
        title: data.title,
        xaxis: {
          autorange: true,
          title: {
            text: data.x_label,
          }
        },
        yaxis: {
          autorange: true,
          title: {
            text: data.y_label,
          }
        }
      }

      setLayout(others)

      const chart = [
        {
          x: data.data.plot_x,
          y: data.data.plot_y,
          mode: 'markers',
          name: 'Plot',
          marker: {
            color: data.data.thickness,
            autocolorscale: false,      
            colorscale:[
              [data.thresholds.start_of_red, 'rgb(0,255,0)'],
              [data.thresholds.start_of_green, 'rgb(255,0,0)'],
            ],                 
          }  
        }
      ]
      setChartOptions(chart);
      setProgress(false)
    }
  },[data])

  return (
    <Page
      title="Data"
    >
      <Header title={'Data'} />
      {newAlert && (
        <Alert
          className={classes.alert}
          severity="error"
        >Error getting information from server!</Alert>
      )}
      {progress ? 
        <Box
          className={classes.progress}
          mr={1}
          width="100%"
        >
          <CircularProgress />
        </Box>
        :
        <Plot
          data={chartOptions}
          layout={layout}
        />}
    </Page>
  );
};

export default Data;
