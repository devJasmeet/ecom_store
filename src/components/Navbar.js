import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <div>
      <nav style={{ padding: '10px', backgroundColor: 'black', color: 'white' }}>
        <ul style={{ display:'flex', justifyContent:'space-between', listStyle: 'none', margin: 0, padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '10px' }}>
            <Link className='NavItem' to="/">Home</Link>
          </li>
          <div>
          <li style={{ display: 'inline', marginRight: '10px' }}>
            <Link className='NavItem' to="/about">About</Link>
          </li>
          <li style={{ display: 'inline' }}>
            <Link className='NavItem' to="/contact">Contact</Link>
          </li>
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
