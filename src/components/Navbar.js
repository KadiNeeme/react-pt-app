import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import '../App.css';

class Navbar extends Component {
  
    render() {

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar" style={{'background-color': '#4ABEEC'}}>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
      </button>
            <Link className="navbar-brand" to="/"></Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-link">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link className="nav-link" to="/customers">
                            Customers
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link className="nav-link" to="/trainings">
                            Trainings
                        </Link>
                    </li>
                    <li className="nav-link">
                        <Link className="nav-link" to="/calendar">
                            Calendar
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;