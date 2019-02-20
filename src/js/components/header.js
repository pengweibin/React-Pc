import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router'

export default class Header extends React.Component {
  constructor () {
    super()
    this.state = {
      minHeader: false
    }
  }
  handleClickHeader () {
    this.setState({
      minHeader: !this.state.minHeader
    })
  }
  render () {
    //      添加样式方式一
    const styleHeader = {
      header: {
        backgroundColor: '#333',
        color: '#fff',
        padding: this.state.minHeader ? '3px 0' : '15px 0'
      }
    }
    return (
      <header style={styleHeader.header} className="header">
        <h1>这里是头部</h1>
        <ul>
          <li><Link to={'/'}>首页</Link></li>
          <li><Link to={'detail'}>嵌套的导航对应页1</Link></li>
          <li><Link to={'nav'}>嵌套的导航对应页2</Link></li>
          <li><Link to={'list'}>列表</Link></li>
        </ul>
      </header>
    )
  }
}
