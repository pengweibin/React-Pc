import React from 'react'
import { Row, Col } from 'antd'
import logo from '../../image/newspaper.png'
import { Menu, Icon } from 'antd';

export default class PCHeader extends React.Component {
  constructor () {
    super()
    this.state = {
      current: 'top'
    }
  }
  handleClick (e) {
    console.log('click', e)
    this.setState({
      current: e.key
    })
  }
  render () {
    return (
      <header>
         <Row>
            <Col span={2}></Col>
            <Col span={4}>
              <a href="/" className="logo">
                <img src={logo} alt="logo"/>
                <span>ReactNews</span>
              </a>
            </Col>
            <Col span={16}>
              <Menu
                onClick={this.handleClick.bind(this)}
                selectedKeys={[this.state.current]}
                mode="horizontal"
              >
                <Menu.Item key="top"><Icon type="mail"/>头条</Menu.Item>
                <Menu.Item key="shehui"><Icon type="mail"/>社会</Menu.Item>
                <Menu.Item key="guonei"><Icon type="mail"/>国内</Menu.Item>
                <Menu.Item key="guoji"><Icon type="mail"/>国际</Menu.Item>
                <Menu.Item key="yule"><Icon type="mail"/>娱乐</Menu.Item>
                <Menu.Item key="tiyu"><Icon type="mail"/>体育</Menu.Item>
                <Menu.Item key="keji"><Icon type="mail"/>科技</Menu.Item>
              </Menu>
            </Col>
            <Col span={2}></Col>
         </Row>
      </header>
    )
  }
}
