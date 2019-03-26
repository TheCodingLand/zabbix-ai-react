import React from 'react';
import { makeStyles } from '@material-ui/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';

import ReportProblem from '@material-ui/icons/ReportProblem'
import Error from '@material-ui/icons/Error'
import { NavContext } from "./Contexts/NavContext";
//src\components\Contexts\NavContext.jsx
const useStyles = makeStyles({
    root: {
      width: "100%",
     
    },
    icon:{
        color:"secondary" 
    },
    

     stickToBottom: {
          width: '100%',
          position: 'fixed',
          bottom: 0,
     
      },
      actionItemStyles: {
        color:'white',
        "&$selected": {
          color: "rgb(33, 150, 243)",
          background: "rgba(93, 90, 120, .5)"
        }
      },
      // This is required for the '&$selected' selector to work
      selected: {}
   
    
  });
  
  
function Navigation() {
    const classes = useStyles();
    //const [value, setValue] = React.useState(0);
    let { state, dispatch } = React.useContext(NavContext);
    console.log(state)
    return (
      <BottomNavigation
      style={{background : '#990000'}}
        value={state.currentPage}
        onChange={(event, newValue) => {
            //console.log(newValue)
          dispatch({ type: "nav", currentPage: newValue });
        }}
        showLabels
        className={classes.stickToBottom}
      >
        
        <BottomNavigationAction classes={{root: classes.actionItemStyles, selected: classes.selected}} value="Critical" label="Critical" icon={<Error />} />
        <BottomNavigationAction classes={{root: classes.actionItemStyles, selected: classes.selected}} value="Notifications" label="Notifications" icon={<ReportProblem />} />
        <BottomNavigationAction classes={{root: classes.actionItemStyles, selected: classes.selected}} value="Events" label="Events" icon={<RestoreIcon />} />
        
      </BottomNavigation>
    );
  }
  
  export default Navigation;