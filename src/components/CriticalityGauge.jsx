


import React from 'react';

import { withStyles } from '@material-ui/core';



const styles = theme => ({

    root: {
      flexGrow: 1,
      margin: theme.spacing.unit * 1,

    },
    linearBarColorPrimary: {
        background: 'linear-gradient(45deg, #99FF8B 30%, #FF0000 50%)',
      },
      
    })


let colors = []
let red = 255; //i.e. FF
let green = 0;
let stepSize = 15//how many colors do you want?
while(green < 255)
    {
    green += stepSize;
    if(green > 255) { green = 255; }
      colors.push(`rgba(${red},${green},0,1`)
}
while(red > 0)
{
    red -= stepSize;
    if(red < 0) { red = 0; }
    colors.push(`rgba(${red},${green},0,1`) 
}


function CriticalityGauge(props) {
    const classes = props.classes
    let criticality = props.criticality
    let criticalityColor = colors[ 30 - Math.round( props.criticality*30/100 )]

    //console.log(classes)
    return (
        //<div className={classes.root}>
        
        <div>
        <svg width='100%' height='60px'>
        <g class='bars'>
    <rect fill='rgba(0,0,0,0)' width='100%' height='25px'></rect>;
    <rect fill={criticalityColor} width={`${props.criticality}%`} height='35px'></rect>
  </g>
  <g class='markers'>
    <rect fill='#001f3f' x='0%' y='0' width='2' height='40'></rect>
    <rect fill='#001f3f' x='25%' y='0' width='2' height='40'></rect>
    <rect fill='#001f3f' x='50%' y='0' width='2' height='40'></rect>
    <rect fill='#001f3f' x='75%' y='0' width='2' height='40'></rect>
    <rect fill='#001f3f' x='100%' y='0' width='2' height='40'></rect>
</g>
<g text-anchor='middle'>
  <text text-anchor='start' fill='#ff0000' x='0' y='60'>0%</text>
  <text fill='#ff0000' x='25%' y='60'>25%</text>
  <text fill='#ff0000' x='50%' y='60'>50%</text>
  <text fill='#ff0000' x='75%' y='60'>75%</text>
  <text text-anchor='end' fill='#ff0000' x='100%' y='60'>100%</text>
</g>

</svg>    
          
         </div>
       //</div>
      );
    }
  


  
export default withStyles(styles)(CriticalityGauge);