import React, { Component } from "react";
import CitiesList from "./CitiesList";
import "./button.css";
import CityAutoComplete from "./cityautocomplete";


class BackSide extends Component {
    render() {
        return (
            <div className="card-back">

                <CityAutoComplete 
                    onAddCity={this.props.onAddCity}
                />

                <CitiesList
                    cities={this.props.cities}
                    currentCity={this.props.currentCity}
                    onSelect={this.props.onSelect}
                />
                <button className="button" onClick={this.props.onClick}>Flip back</button>
            </div>
        );
    }
}

export default BackSide;