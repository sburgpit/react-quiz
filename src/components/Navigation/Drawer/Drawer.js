import React, { Component } from 'react'
import classes from './Drawer.module.css'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'


class Drawer extends Component {

  renderLinks(links){
    return links.map((link, index) => {
      return (
      <li key={index}>
        <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
          onClick={this.props.onClose}
        >
          {link.label}
        </NavLink>
      </li>
      )
    })
  }

  

  render(){
    const cls = [classes.Drawer]
    
    if(!this.props.isOpen){
      cls.push(classes.close)
    }

    const links = [
      {to: '/', label: 'Quiz List', exact: true},
    ]

    if(this.props.isAuthentication) {
      links.push({to: '/quiz-creator', label: 'Create Quiz', exact: false})
      links.push({to: '/logout', label: 'Log out', exact: false})
    } else {
      links.push({to: '/auth', label: 'Log in', exact: false})
    } 

    return (
      <>
      <nav className={cls.join(' ')}>
        <p>Navigation</p>
        <ul>
          { this.renderLinks(links) }
        </ul>
      </nav>

      { this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    )
  }
}

export default Drawer
