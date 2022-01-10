import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showFullPixabayImage } from '../actions';
import WeatherIcon from './WeatherIcon';
import WeatherIconList from './WeatherIconList';
import ForcastDetailFullImages from './ForcastDetailFullImages';
import './ForcastDetail.css';
import addCommas from '../helpers/general';

class ForcastDetail extends Component {
  render() {
    const { singleForcast, filteredForcasts} = this.props;
    let forcast;

    if (singleForcast) {
      forcast = singleForcast;
    } else if (filteredForcasts) {
      forcast = filteredForcasts[0];
    }

    return (
      <div className={`forcast-detail-container`}>
        <div>
          {this.props.pixabayFullDisplayOn && <ForcastDetailFullImages />}
          {forcast && <div className={'forcast-detail'}>
            <div className={`forcast-detail_heading`}>
              <h1>{forcast.cityName}</h1>
              <span>{Math.floor(forcast.apparentTemperature)}</span>
              <span><WeatherIcon size={'medium'} icon={forcast.icon}/></span>
            </div>
            <div className={`forcast-detail_list-heading`}>
              <h2>Upcomming forcast</h2>
              <WeatherIconList allIcons={forcast.allIcons} size="medium" />
            </div>
            <div className={`forcast-detail_image-container`}>
              <ul>
                <li>
                  <p>Country</p>
                  <p>{forcast.country ? forcast.country : 'NA'}</p>
                </li>
                <li>
                  <p>Population estimate</p>
                  <p>{forcast.population ? addCommas(forcast.population) : 'NA'}</p>
                </li>
                <li>
                  <p>Average max</p>
                  <p>{forcast.averageMaxTemp}</p>
                </li>
                <li>
                  <p>Average min</p>
                  <p>{forcast.averageMinTemp}</p>
                </li>
                <li>
                  <p>Average feels like</p>
                  <p>{forcast.averageApparentTemperatureMaxMin}</p>
                </li>
                <li>
                  <p>Total sunlight hours</p>
                  <p>{forcast.sunlightHours}</p>
                </li>
                <li>
                  <p>Flight cost estimate</p>
                  <p>${forcast.flights ? Math.round(forcast.flights.SFO.cost) : 'NA'}</p>
                </li>
              </ul>
            <div className={`forcast-detail_images`}>
              <ul>
                {this.props.pixabayImages.map(image => (
                  <li key={image.webformatURL}>
                    <img
                      width="200"
                      onClick={this.props.showFullPixabayImage}
                      alt={image.tags}
                      src={image.webformatURL}/>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>}
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleForcast: state.forcasts.singleForcast,
    filteredForcasts: state.forcasts.filteredForcasts,
    pixabayImages: state.maps.pixabayImages,
    pixabayFullDisplayOn: state.maps.pixabayFullDisplayOn,
    mapLocation1: state.maps.mapLocation1,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showFullPixabayImage: () => dispatch(showFullPixabayImage()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastDetail);
