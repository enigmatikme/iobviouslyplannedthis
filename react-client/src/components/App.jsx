import React from 'react';
import $ from 'jquery';
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
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePage = this.updatePage.bind(this);
  }
  
  // componentDidMount() {
  //   $.ajax({
  //     url: '/items', 
  //     success: (data) => {
  //       this.setState({
  //         items: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }
  
  updatePage(longitude, latitude, placeID) {
    this.setState({ page: this.state.page += 1, longitude, latitude, place_id: placeID});
    console.log('placeID in APP', placeID);
  }
  // handleChange(event) {
  //   this.setState({
  //     search: event.target.value
  //   });
  
  //   this.handleSubmit(event, this.state.search)
  // }
  // https://maps.googleapis.com/maps/api/place/autocomplete/xml?input=Amoeba&types=establishment&location=37.76999,-122.44696&radius=500&key=YOUR_API_KEY
  
  // handleSubmit(event, query) {
  //   event.preventDefault();
  //   // $.ajax({
  //   //   method: 'GET',
  //   //   url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=${key.API_KEY}`, 
  //   //   success: (data) => {
  //   //     console.log("++++ WORKED", data)
  //   //   }, 
  //   //   error: (err) => {
  //   //     console.log('err in get req', err);
  //   //   }
  //   // })
  // }
  
    render () {
      if (this.state.page === 0) {
      return (
        <div className={styles.appContainer}>
      <div id='app'>
        <Search changePage={this.updatePage} />
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