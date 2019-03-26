import React from 'react';

import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import { TablePagination, TableCell, TableRow, TableBody, Table, Checkbox } from '@material-ui/core'
import EnhancedTableToolbar from './EnhancedToolbars';
import EnhancedTableHead from './EnhancedTableHead';
import { getSorting, stableSort } from './TableSorting'
import {useEffect} from 'react'
import CriticalityGauge from '../CriticalityGauge'

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 1,
      marginBottom: theme.spacing.unit * 5
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  }));


function EnhancedTable(props) {
    
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('time');
    const [selected, setSelected] = React.useState([]);
    let rows = props.rows
    let data = props.data
    useEffect(() => { setSelected([]) },[props.title] )
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    function handleRequestSort(event, property) {
      const isDesc = orderBy === property && order === 'desc';
      setOrder(isDesc ? 'asc' : 'desc');
      setOrderBy(property);
    }
  
    function handleSelectAllClick(event) {
      if (event.target.checked) {
        
        const newSelecteds = data.map(n => n);
        console.log (newSelecteds)
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    }
    
    function handleClick(event, id) {
      if (props.selectable) {
      console.log(id)

      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
      if (props.selectMultiple) {
      if (selectedIndex === -1) {
        
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    }
    else {
      if (id === selected[0]) {
        setSelected([])
      }
      else {setSelected([id])}
    }}
    }
  
    function handleChangePage(event, newPage) {
      setPage(newPage);
    }
  
    function handleChangeRowsPerPage(event) {
      setRowsPerPage(event.target.value);
    }
  
    const isSelected = id => selected.indexOf(id) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar title={props.title} numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              selectable={props.selectable}
              selectMultiple={props.selectMultiple}
              rows={rows}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
           
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isItemSelected = isSelected(n);
                  return (
                    <TableRow 
                    
                    
                      hover
                      onClick={event => handleClick(event, n)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={n.eventid}
                      selected={isItemSelected}
                    >
                    {props.selectable &&
                      <TableCell padding="checkbox">
                        
                        <Checkbox checked={isItemSelected} />
                      </TableCell>}

                      {rows.map(row => { 
                          
                          if (row.numeric===true) {
                            
                            
                            if (row.style === 'progress') { return <TableCell key={n.eventid}><CriticalityGauge criticality={n[row.id]*100} /></TableCell>}
                            else if (row.style === 'date') { return <TableCell key={row.id+row.label} align='right'>{ row.display(n[row.id]) }</TableCell> }
                            
                            else { return <TableCell key={row.id+row.label} align='right'>{n[row.id]}</TableCell>}
                          }
                          else
                          {
                            
                            if (row.style ==='conditional') { 
                                //console.log(row.condition(n[row.id]))

                                return <TableCell key={row.id+row.label} style={row.condition(n[row.id])} component="th" scope="row" padding="none">{n[row.id]} </TableCell> 
                            }
                            
                            else { return <TableCell key={row.id+row.label} component="th" scope="row" padding="none">{n[row.id]} </TableCell>}
                          }
                          
                      }
                      )}
                      
                      
                   
                    </TableRow>
                  );
                })}
              
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
                
              )}
              
              
            </TableBody>
            
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
  
  export default EnhancedTable;