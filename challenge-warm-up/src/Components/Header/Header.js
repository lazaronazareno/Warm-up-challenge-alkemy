import React from 'react'
import { Link } from 'react-router-dom';
import './headerStyles.scss'

function Header() {
    return (
        <div className=" container-fluid list-group list-group-horizontal mb-4 red dropdown">
            <button className="btn btn-lg dropdown-toggle" data-bs-toggle="dropdown" href="#">Menu</button>
              <ul className="dropdown-menu p-0">
                  <Link to="/" className="list-group-item list-group-item-action list-group-item-danger dropdown-item">Home</Link>
                  <Link to="/edit/:id" className="list-group-item list-group-item-action list-group-item-danger dropdown-item">Edit</Link>
              </ul>
        </div>
    )
}

export default Header
