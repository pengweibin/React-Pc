import React from 'react'
import { Row, Col } from 'antd'
import logo from '../../image/newspaper.png'
import { Link } from 'react-router-dom'
import { Menu, Icon, Tabs, message, Form, Input, Button, Modal } from 'antd'
import { Module } from 'module'
import { from } from 'rxjs'

const TabPane = Tabs.TabPane

class PCHeader extends React.Component {
  constructor () {
    super()
    this.state = {
      current: 'top',
      visible: false,
      action: 'login',
      logined: false,
      userName: '',
      userId: 0
    }
  }
  handleClick (e) {
    this.setState({
      current: e.key
    })
    if (e.key === 'register') {
      this.setModalVisible(true)
    }
  }
  setModalVisible (bool) {
    this.setState({
      visible: bool
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let fetchOption = {
          method: 'GET'
        }
        console.log('Received values of form: ', values)
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=${values.userName}&password=${values.password}&r_userName=${values.r_username}&r_password=${values.r_password}&r_confirmPassword=${values.r_confirmPassword}`, fetchOption)
        .then(response => response.json())
        .then(json => {
          console.log('json', json)
          this.setState({
            userName: json.NickUserName,
            userId: json.UserId
          })
        })
        message.success('请求成功')
        this.setModalVisible(false)
      }
    })
  }
  callback (key) {
    this.setState({
      action: key === '1' ? 'login' : 'register'
    })
  }
  render () {
    let { getFieldDecorator } = this.props.form
    const userShow = this.state.logined
    ?
    <Menu.Item key="logout" className="register">
      <Button type="primary" htmlType="button">{this.state.userName}</Button>
      &nbsp;&nbsp;
      <Link target="_blank">
        <Button type="dashed" htmlType="button"></Button>
      </Link>
      &nbsp;&nbsp;
        <Button type="ghost" htmlType="button">退出</Button>
    </Menu.Item>
    :
    <Menu.Item key="register" className="register">
      <Icon type="appstore"></Icon>注册/登录
    </Menu.Item>
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
                {userShow}
              </Menu>
              <Modal
                title="用户中心"
                visible={this.state.visible}
                onOk={this.setModalVisible.bind(this, false)}
                okText="关闭"
                onCancel={this.setModalVisible.bind(this, false)}
                warpClassName="vertical-center-modal">
                <Tabs type="card" defaultActiveKey="1" onChange={this.callback.bind(this)}>
                  <TabPane tab="登录" key="1">Content of Tab Pane 1</TabPane>
                  <TabPane tab="注册" key="2">
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                      <Form.Item label="用户">
                        {getFieldDecorator('r_username', {
                          rules: [{required: true, message: '账号不能为空'}]
                        })(
                          <Input placeholder="请输入您的账号" />
                        )}
                      </Form.Item>
                      <Form.Item label="密码">
                        {getFieldDecorator('r_password', {
                          rules: [{required: true, message: '密码不能为空'}]
                        })(
                          <Input type="password" placeholder="请输入您的密码"/>
                        )}
                      </Form.Item>
                      <Form.Item label="确认密码">
                        {getFieldDecorator('r_confirmPassword', {
                          rules: [{required: true, message: '请再次输入密码'}]
                        })(
                          <Input type="password" placeholder="请再次输入您的密码"/>
                        )}
                      </Form.Item>
                      <Button type="primary" htmlType="submit">注册</Button>
                    </Form>
                  </TabPane>
                </Tabs>
              </Modal>
            </Col>
            <Col span={2}></Col>
         </Row>
      </header>
    )
  }
}

export default PCHeader = Form.create({})(PCHeader)
