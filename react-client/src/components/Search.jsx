import React from 'react';
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import styles from './Search.styles.css';

const key = require('../../../config/google.js');

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      search: '',
      value: '', 
      longitude: 0,
      latitude: 0, 
      place_id: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectSuggest = this.handleSelectSuggest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(longitude, latitude, placeId) {
    this.setState({longitude, latitude, place_id: placeId}, () => {
      this.props.changePage(longitude, latitude, placeId);
    });
  }
  
  handleInputChange(e) {
    this.setState({search: e.target.value, value: e.target.value})
  }
  
  //need to modify it so it waits for me to select submit button before rendering second page
  handleSelectSuggest (geocodedPrediction, originalPrediction) {
    console.log("this is geocoded", geocodedPrediction, "original prediction", originalPrediction)
    this.setState({search: "", value: geocodedPrediction.formatted_address}, () => {
      console.log("checking geocode b", geocodedPrediction.geometry.viewport.j.j)
      this.handleSubmit(geocodedPrediction.geometry.viewport.j.j, geocodedPrediction.geometry.viewport.l.j, geocodedPrediction.place_id);
    });
  }
  
  render() {
    const {search, value} = this.state
    return (
    <div id={styles.searchParentContainer}>
    <div>
      <ReactGoogleMapLoader params={{ key: key.API_KEY, libraries: "places, geocode" }}
      render={googleMaps =>
        googleMaps && (
          <ReactGooglePlacesSuggest
          googleMaps={googleMaps}
          autocompletionRequest={{
            input: search,
          }}
          onSelectSuggest={this.handleSelectSuggest}
          textNoResults="My custom no results text" // null or "" if you want to disable the no results item
          customRender={prediction => (
            <div className="searchBox">
            {/* <div className="customWrapper"> */}
            {prediction
              ? prediction.description
              : "Beep boop bop beep, Cannot Compute"}
              </div>
            )}
            >
            <div className={styles.headerContainer}>
            <h1 className={styles.title}> Join the Lazy Club, Oh Forgetful One </h1>
            </div>
            
            <div className={styles.queryContainer}>
            <input type="text" value={value} placeholder="Search a location" onChange={this.handleInputChange} />
            </div>

            <div className={styles.searchBtnContainer}>
            <input className={styles.button} type="submit" value="Help Me Help You" onSubmit={this.handleSubmit}/>
            </div>

            </ReactGooglePlacesSuggest>
          )
        }
        />
        </div>
        <div>
        </div>
      </div>
      )
    }
  }
export default Search;