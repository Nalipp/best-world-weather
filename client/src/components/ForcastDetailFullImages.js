import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideFullPixabayImage } from '../actions';
import './ForcastDetailFullImages.css';

const FullImagesList = ({ pixabayImages }) => {
  return (
    <ul className={'forcast-detail-full-images_list'}>
      {pixabayImages.map(image => {
        return (
          <li 
            alt={image.tags}
            key={image.webformatURL}>
            <img src={image.webformatURL} />
          </li>
        )
      })}
    </ul>
  )
}

class ForcastDetailFullImages extends Component {
  render() {
    return (
      <div 
        onClick={this.props.hideFullPixabayImage}
        className={'forcast-detail-full-images'}>
        <FullImagesList pixabayImages={this.props.pixabayImages}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('state.maps...', state.maps.pixabayImages);
  return {
    pixabayImages: state.maps.pixabayImages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideFullPixabayImage: () => dispatch(hideFullPixabayImage()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForcastDetailFullImages);
