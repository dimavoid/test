import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

class Menu extends Component {
  render() {
    return (
      <nav className="Menu">
        <ul className="Menu__list">
          {/* <li><Link className="Menu__link" to='/'>Home</Link></li> */}
          <li><Link className="Menu__link" to='/cities'>Cities</Link></li>
          <li><Link className="Menu__link" to='/pages'>Pages</Link></li>
          <li><Link className="Menu__link" to='/page/create'>Create page</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Menu;