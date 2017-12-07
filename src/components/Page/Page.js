import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import './Page.css';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      text: '',
      city: '',
      btn: 'Create'
    }
  }

  request = () => {
    fetch(`/api/page/detail/${this.props.match.params.id}/`)
      .then(res => {
        if (res.status === 404) {
          this.setState({
            title: '',
            text: '',
            city: '',
            btn: 'Create'
          });
          
        } else {
          return res.json();
        }
      })
      .then(res => {
        if (res) {
          this.setState({
            id: res.id,
            title: res.title,
            text: res.text,
            city: res.city.id,
            btn: 'Update'
          });
        }
      });
  }

  componentDidMount() {
    this.request();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevID = prevProps.match.params.id;
    const ID = this.props.match.params.id;

    if (prevID !== ID) {
      this.request();
    }
  }

  handleChange = (e) => {
    switch (e.target.name) {
      case 'title':
        this.setState({ title: e.target.value });
        break;

      case 'text':
        this.setState({ text: e.target.value });
        break;

      case 'city':
        this.setState({ city: e.target.value });
        break;

      default:
        break;
    }
  }

  create = (e) => {
    e.preventDefault();

    const data = {
      active: true,
      title: this.state.title,
      text: this.state.text,
      city: this.state.city,
    }

    const method = (this.state.id) ? 'put' : 'post';
    const type = (this.state.id) ? `update/${this.state.id}` : 'create';

    fetch(`/api/page/${type}/`, {  
      method: method,  
      headers: {  
        "Content-type": 'application/json'
      },  
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {  
        console.log('res', res);

        this.props.history.push(`/page/${res.id}`)
        this.props.onRefresh(); 
      })
  }

  render() {
    return (
      <section className="Page">
        <form className="Page__form" onSubmit={this.create}>
          <label className="Page__label">Title: 
            <input
              className="Page__input"
              type="text" name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>

          <label className="Page__label">Text: 
            <input
              className="Page__input"
              type="text" name="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </label>

          <label className="Page__label">City: 
            <input
              className="Page__input"
              type="text" name="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </label>

          <button className="Page__btn">{this.state.btn}</button>
        </form>
      </section>
    );
  }
}

export default withRouter(Page);