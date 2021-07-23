import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="list-group list-group-horizontal d-flex position-absolute top-0 start-0 p-1 bg-primary border-top dropdown">
            <button className="btn btn-primary btn-lg dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button">Navbar</button>
              <ul className="dropdown-menu p-0">
                  <Link to="/" className="list-group-item list-group-item-action list-group-item-info dropdown-item">Home</Link>
                  <Link to="/edit" className="list-group-item list-group-item-action list-group-item-info dropdown-item">Edit</Link>
              </ul>
        </div>
    )
}

export default Header
