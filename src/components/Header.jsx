import Paper from '@material-ui/core/Paper'
import React from 'react'
import { Card, CardMedia, CardContent, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import alfredimg from '../img/Alfred_Pennyworth.png'
const styledBy = (property, mapping) => props => mapping[props[property]];

const styles = theme => ({
    root: {
        backgroundColor: 'red',
        background: 'red',
    },
    card: {
    display: 'flex',
    width: '100%',
    position: 'fixed',
    top: 0,
    maxHeight : 150,
    Height : 150
    },

    headerimg: {
        maxHeight: 150,
      },
    content:{
        align: 'center'
    }
})




export default function Header(props) {
    let classes= makeStyles(styles)
    return(
    <div className={classes.root}>
    <Card style={{backgroundColor: '#990000'}} className={classes.card}>
    <Grid container>
    <Grid item xs={1}>
    <img height="100px" src="../img/Alfred_Pennyworth.png" />
    </Grid>

    <Grid item xs={11}> 
    <CardContent className={classes.content}>
          <Typography style={{color:'white'}} component="h5" variant="h5">ALFRED</Typography>
          <Typography style={{color:'#dddddd'}} variant="subtitle1" color="textSecondary">
          Monitoring AI
          </Typography>
    </CardContent>

    </Grid>
    </Grid>
    
    </Card>
    </div>
    )
}
