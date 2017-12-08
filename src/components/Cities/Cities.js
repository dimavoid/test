import React, { Component } from 'react';

import './Cities.css';

class Cities extends Component {
  render() {
    const list = this.props.cities;

    const cities = (list.length) ? list.map((city, index) => {
      return (
        <section className="City" key={index}>
          <p>Name: {city.name}</p>
          <p>ID: {city.id}</p>
        </section>
      );
    }) : <h2 style={{ textAlign: 'center' }} >Loading...</h2>; 

    return (
      <section className="Cities">
        {cities}
      </section>
    );
  }
}

export default Cities;
