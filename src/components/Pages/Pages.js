import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Filter from '../Filter/Filter';

import './Pages.css';

class Pages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      request: '',
    };
  }

  onSearch = (e) => {
    const request = e.target.value.toLowerCase();

    this.setState({ request })
  }

  onFilter = (request) => {
    this.props.onFilter(request);
  }

  render() {
    const list = this.props.pages.filter( (page) => {
      return ~page.title.toLowerCase().indexOf(this.state.request);
    });

    const pages = list.map((page, index) => {
      const time = page.created;
      // console.log(time);
      // console.log(page.active);

      return (
        <section className="Card" key={index}>
          <h3 className="Card__title">Title: {page.title}</h3>
          <p className="Card__id"><b>ID:</b> {page.id}</p>
          <p className="Card__text">Text: {page.text}</p>
          <p className="Card__text">
            City: {page.city.name}, cityID: {page.city.id}, Active: {(page.active) ? 'true' : 'false'}
          </p>
          <p className="Card__time">
            <b>Created:</b> {page.created} <b>Updated:</b> {page.modified}
          </p>
          <Link className="Card__link" to={`/page/${page.id}`}>Edit</Link>
        </section>
      );
    }); 

    return (
      <section className="Pages">
        <Filter cities={this.props.cities} onFilter={this.onFilter}/>

        {pages}
      </section>
    );
  }
}

export default Pages;