import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import Cities from './components/Cities/Cities';
import Pages from './components/Pages/Pages';
import Page from './components/Page/Page';

import './App.css';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      pages: []
    };
  }

  refreshPages = (filter) => {
    console.log('refresh');
    // console.log('filters:', filter);

    let city = '';
    let active = '';
    let search = '';

    if (filter) {
      city = filter.city;
      active = filter.active;
      search = filter.search;

      if (city !== '') {city = `?city=${filter.city}`};
      if (city === '' && active !== '') {active = `?active=${filter.active}`};
      if (city !== '' && active !== '') {active = `&active=${filter.active}`};
      
      if ( (city === '' || active === '') && search !== '') {search = `?search=${filter.search}`};
      if ( (city !== '' || active !== '') && search !== '') {search = `&search=${filter.search}`};
    }

    // console.log('url:', city+active+search);

    fetch(`/api/page/${city+active+search}`)
      .then(res => res.json())
      .then(res => this.setState({ pages: res.results }));
  }

  componentDidMount() {
    fetch('/api/catalog/')
      .then(res => res.json())
      .then(res => this.setState({ cities: res }));

    this.refreshPages();
  }

  onFilter = (request) => {
    this.refreshPages(request);
  }

  render() {
    return (
      <section className="App">
        <Menu />

        <Switch>
          {/* <Route exact path='/' render={ (props) => (
            <h1 style={{ textAlign: 'center' }}>Hello!</h1>
          )}/> */}

          <Route exact path='/cities' render={ (props) => (
            <Cities {...props} cities={this.state.cities} />
          )}/>
          <Route exact path='/pages' render={ (props) => (
            <Pages {...props} pages={this.state.pages} cities={this.state.cities} onFilter={this.onFilter}/>
          )}/>
          <Route exact path='/page/:id' render={ (props) => (
            <Page {...props} onRefresh={this.refreshPages} />
          )}/>
        </Switch>
      </section>
    );
  }
}

export default App;
