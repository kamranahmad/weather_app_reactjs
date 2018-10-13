import React, { Component } from "react";
import FrontSide from "./FrontSide";
import BackSide from "./BackSide";
import "./panel.css";
import citiesList from "./cities.json";
import _ from 'lodash';

class App extends Component {

  state = {
    flipped: false,
    currentCity: citiesList[0],
    selectedOption: null,
    allCities: citiesList,
    count: 2123272
  };

  onFlip = () => {
    this.setState({ flipped: !this.state.flipped });
  };
  onAddCity = newCity => {
    console.log("new city-------------");
    console.log(this.state.count);

    console.log(newCity);
    const theNewCity = {
      title: (_.startCase(newCity.City) + ', '
      + ((newCity.Country === 'us') ? newCity.Region.toUpperCase() +
      ', ' + newCity.Country.toUpperCase() : newCity.Country.toUpperCase())),
      location_type: "City",
      woeid: this.state.count + 1,
      latt_long: newCity.Latitude + "," + newCity.Longitude
    };

    this.setState({ allCities: [...this.state.allCities, theNewCity] });
    this.setState({ count: this.state.count+1 });
  };
  onSelectCity = city => {
    this.setState({ currentCity: city });
  };


  render() {

    return (
      <div className={`panel ${this.state.flipped ? "flip" : ""}`}>
        <div className="panel-front">
          <FrontSide
            onClick={this.onFlip}
            currentCity={this.state.currentCity}
          />
        </div>
        <div className="panel-back">
          <BackSide
            cities={this.state.allCities}
            onClick={this.onFlip}
            currentCity={this.state.currentCity}
            onSelect={this.onSelectCity}
            onAddCity={this.onAddCity}
          />
        </div>

      </div>
    );
  }
}

export default App;