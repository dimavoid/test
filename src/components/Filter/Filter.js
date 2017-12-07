import React, { Component } from 'react';

import './Filter.css';

class Filter extends Component {
  handleChange = (e) => {
    this.handleSubmit(e)
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const form = (e.target.name === 'filter') ? e.target : e.target.parentElement;

    const active = form.active.value;
    const city = form.city.value;
    const search = form.search.value;

    const request = {
      city,
      active,
      search
    };

    this.props.onFilter(request);
  }

  render() {
    const cities = this.props.cities.map((city, index) => {
      return (
        <option value={city.id} key={index}>{city.name}</option>
      );
    });

    return (
      <form className="Filter" name="filter" onSubmit={this.handleSubmit}>
        <label htmlFor="city">City:</label>
        <select name="city" id="city" onChange={this.handleChange}>
          <option value="">None</option>
          {cities}
        </select>
      

        <label htmlFor="active">Active:</label>
        <select name="active" id="active" onChange={this.handleChange}>
          <option value="">None</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>

        <label htmlFor="search">Search:</label>
        <input name="search" type="text" id="search" onChange={this.handleChange} placeholder=""/>
      </form>
    );
  }
}

export default Filter;