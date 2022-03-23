import React from 'react';
import './ForcastTable.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { connect } from 'react-redux';
import WeatherIconList from './WeatherIconList';
import { setSortedBy,
         setLocationDetail,
         showLocationDetail 
       } from '../actions';


function ForcastTable({ 
    filteredForcasts, 
    setSortedBy, 
    setLocationDetail, 
    showLocationDetail 
  }) {

  function handleSort(evt) {
    const sortBy = evt.target.id;
    setSortedBy(sortBy);
  }

  function setMaxChar(str, num) {
    return str.length > num ? str.slice(0, num) + '..' : str;
  }

  function handleSetSingleForcast(forcast) {
    setLocationDetail(forcast, forcast.cityName);
    showLocationDetail();
  }

  return (
    <TableContainer className={'forcast-table'} component={Paper}>
      <Table 
        sx={{ minWidth: 500 }} 
        size="small" aria-label="a dense table of Forcast Locations"
      >
        <TableHead>
          <TableRow onClick={handleSort}>
            <TableCell id="cityName">city</TableCell>
            <TableCell id="iconPoints">icon</TableCell>
            <TableCell id="averageMaxTemp">avg max</TableCell>
            <TableCell id="humidity">humid</TableCell>
            <TableCell id="cost">flight cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredForcasts.map((forcast) => (
            <TableRow 
              onClick={handleSetSingleForcast.bind(this, forcast)}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              key={forcast.cityName}
            >

              <TableCell>{setMaxChar(forcast.cityName, 9)}</TableCell>
              <TableCell>
                <ul>
                  <WeatherIconList allIcons={forcast.allIcons} />
                </ul>
              </TableCell>
              <TableCell>{forcast.averageMaxTemp}</TableCell>
              <TableCell>{Math.round(forcast.humidity * 100)}</TableCell>
              {forcast.flights 
                && forcast.flights.SFO 
                && forcast.flights.SFO.cost !== 'NA' 
                ?
                <TableCell>$ {Math.round(forcast.flights.SFO.cost)}</TableCell>
                :
                <TableCell></TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}


const mapStateToProps = state => {

  const { 
    singleForcast,
    sortedBy,
    filteredForcasts,
    currentFlightOrigin 
  } = state.forcasts;

  return {
    singleForcast,
    filteredForcasts,
    sortedBy,
    currentFlightOrigin,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLocationDetail: forcast => dispatch(setLocationDetail(forcast)),
    setSortedBy: sortBy => dispatch(setSortedBy(sortBy)),
    showLocationDetail: () => dispatch(showLocationDetail()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastTable);
