import DateDisplay from "./DateDisplay";

function conditionEnvironment(value) {
 const red = 'linear-gradient(45deg, #FE6B8B 30%, #990000 90%)'
 const blue = 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)'
 if (value === 'PROD') {
   return { textAlign: 'center', color : 'white', backgroundColor: 'red' ,background : red}} 
else {
    return { textAlign: 'center', color : 'white', backgroundColor: 'blue' ,background : blue}} 
}

export const rows =  [
  
    { id: 'time', numeric: true, disablePadding: true, label: 'Date', style : 'date', display: DateDisplay },
    { id: 'eventid', numeric: true, disablePadding: false, label: 'Event ID' },
    { id: 'host_environment', numeric: false, disablePadding: false, label: 'Environment', style: 'conditional', condition: conditionEnvironment },
    { id: 'host_short_name', numeric: true, disablePadding: false, label: 'Host Name' },
    { id: 'description', numeric: true, disablePadding: false, label: 'Description' },
    { id: 'occurencesEvent1dhost', numeric: true, disablePadding: false, label: 'Occurences 24h' },
    { id: 'proba', numeric: true, disablePadding: false, label: 'Threshold', style : 'progress' },
    { id: 'severity', numeric: true, disablePadding: false, label: 'Severity' }
  ];


 