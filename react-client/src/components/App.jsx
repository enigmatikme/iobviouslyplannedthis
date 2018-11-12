import React from 'react';
import Search from './Search.jsx';
import SecondPage from './SecondPage.jsx';
import styles from './App.styles.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      page: 0,
      longitude: 0,
      latitude: 0,
      place_id: ''
    }
    this.updatePage = this.updatePage.bind(this);
  }
  
  updatePage(longitude, latitude, placeID) {
    this.setState({ page: this.state.page += 1, longitude, latitude, place_id: placeID});
  }
  
  render () {
    if (this.state.page === 0) {
      return (
        <div className={styles.appContainer}>
          <div id='app'>
            <Search updatePage={this.updatePage} />
          </div> 
        </div>
      )} else {
        return (
          <div id="testing">
            <div id='map' className={styles.map}>
            </div>
            <SecondPage className="map-styles" longitude={this.state.longitude} latitude={this.state.latitude} placeId={this.state.place_id}/>
          </div>
        )
      }
    }
  }
  
  export default App;