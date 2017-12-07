import React, { Component } from 'react';

import './Cities.css';

class Cities extends Component {
  render() {
    const cities = this.props.cities.map((city, index) => {
      return (
        <section className="City" key={index}>
          <p>Name: {city.name}</p>
          <p>ID: {city.id}</p>
        </section>
      );
    }); 

    return (
      <section className="Cities">
        {cities}
      </section>
    );
  }
}

export default Cities;
