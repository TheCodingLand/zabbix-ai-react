import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import { green, red, blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core';
import config from '../config'
import { NavContext, NavContextProvider } from './Contexts/NavContext'
import EnhancedTable from './EventTable/EnhancedTable';
import {rows} from './models'
import posed, { PoseGroup } from 'react-pose';
//import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: { 
    type: 'dark',
    primary: red,
    secondary: green,
    textPrimary: blue,
    
  }}
);

const styles = {
  root: {
    flexGrow: 1,

  }
}

/* async function fetchItems(table) {
    let result = await axios(`${config.scheme}://rest.${config.apiRoot}/zabbix/${table}/`)
    let res = result.data._embedded.map(e => { e.time = e.time.$date; return e})
    console.log(res)
    return res
     } */


function MonitoringPage(props) {
    const [events, setEvents] = useState( [] );
    
    posed.div({enter: { opacity: 1, delay: 300, beforeChildren: 300 },
    exit: { opacity: 0 } } )

    
    useEffect(() => { 
      const fetchItems = async () => { 
        const result = await axios(
          `${config.scheme}://rest.${config.apiRoot}/zabbix/events/`,)
          //console.log(result.data._embedded)
          let res = result.data._embedded.map(e => { e.time = e.time.$date; e.id = parseInt(e.eventid); return e })
      
          setEvents(res)
    }
    fetchItems()
  }, [])


    
    //('events').then(data => setEvents(data)), [])
    //let result = await axios(`${config.scheme}://rest.${config.apiRoot}/zabbix/events/?filter={ "proba":{ "$gt" : 0.05 } }`, )
    
    const [tickets, setTickets] = useState( [] )

    useEffect(() => { 
      const fetchItems = async () => { 
        const result = await axios(
          `${config.scheme}://rest.${config.apiRoot}/zabbix/tickets/`,)
          let res = result.data._embedded.map(e => { e.time = e.time.$date ;e.id = parseInt(e.eventid); return e})
      
      setTickets(res)
    }
    fetchItems()
  }, [])

  
  const [notifications, setNotifications] = useState( [] )
  useEffect(() => { 
    const fetchItems = async () => { 
      const result = await axios(
        `${config.scheme}://rest.${config.apiRoot}/zabbix/notifications/`,)
        let res = result.data._embedded.map(e => { e.time = e.time.$date ;e.id = parseInt(e.eventid); return e})
    
    setNotifications(res)
  }
  fetchItems()
}, [])



    //useEffect(() => fetchItems('tickets').then(data => setTickets(data)), [])
    
    
    //useEffect(() => fetchItems('notifications').then(data => setNotifications(data)), [])

    let nav = useContext(NavContext)
    
    let TBL=null
    let Notifications = <EnhancedTable selectable={true} rows={rows} title="Notifications" data={notifications}/>
    let Critical = <EnhancedTable rows={rows} title="Critical" data={tickets}/>
    let Events = <div display><EnhancedTable selectable={true} selectMultiple={true} rows={rows} title="Events" data={events}/></div>
    let routes = { 'Events' : Events, 'Critical' : Critical, 'Notifications' : Notifications }
    if (nav.state.currentPage === 'Events' ) {
      
    }
    if (nav.state.currentPage === 'Critical') {
     
    }
    if (nav.state.currentPage === 'Notifications') {
     
    }
    const RoutesContainer = posed.div({
      enter: { opacity: 1, delay: 250},
      exit: { opacity: 0, delay: 200 }
    });
    
    return ( 
    <React.Fragment>
      <ThemeProvider theme={theme}>
      <CssBaseline  />
      <PoseGroup> 
      <RoutesContainer key={nav.state.currentPage}>
        {routes[nav.state.currentPage]}
      </RoutesContainer></PoseGroup>
      {TBL}
      </ThemeProvider>
      </React.Fragment>
  );
}
export default withStyles(styles)(MonitoringPage);