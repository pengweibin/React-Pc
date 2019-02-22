import React from 'react'
import logo from '../../image/newspaper.png'

export default class MobileHeader extends React.Component {
  render () {
    return (
      <div id="mobile" className="mobile-header">
        <header>
          <img src={logo} alt="logo"/>
          <span>ReactNews</span>
        </header>
      </div>
    )
  }
}
