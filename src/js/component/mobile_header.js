import React from 'react'
import logo from '../../image/newspaper.png'
import { Link } from 'react-router'
import { Icon, Tabs, message, Form, Input, Button, Modal } from 'antd'

const TabPane = Tabs.TabPane

class MobileHeader extends React.Component {
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
  componentWillMount () {
    this.setState({
      logined: localStorage.userid
    })
    this.setState({
      userId: localStorage.userid,
      userName: localStorage.nickname || ''
    })
  }
  setModalVisible (bool) {
    this.setState({
      visible: bool
    })
  }
  callback (key) {
    this.setState({
      action: key === '1' ? 'login' : 'register'
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let fetchOption = {
          method: 'GET'
        }
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=${this.state.action}&username=${values.userName}&password=${values.password}&r_userName=${values.r_username}&r_password=${values.r_password}&r_confirmPassword=${values.r_confirmPassword}`, fetchOption)
        .then(response => response.json())
        .then(json => {
          console.log('json', json)
          this.setState({
            userName: json.NickUserName,
            userId: json.UserId
          })
          localStorage.userid = json.UserId
          localStorage.nickname = json.NickUserName
        })
        if (this.state.action === 'login') {
          this.setState({
            logined: true
          })
        }
        message.success('请求成功')
        this.setModalVisible(false)
      }
    })
  }
  logout () {
    message.success('退出成功')
    localStorage.userid = ''
    localStorage.nickname = ''
    this.setState({
      logined: false
    })
  }
  render () {
    let { getFieldDecorator } = this.props.form
    const userShow = this.state.logined
    ?
    <Link>
      <Button style={{float: 'right'}} type="primary" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
      <Icon type="inbox"></Icon>
    </Link>
    :
    <Icon type="setting" onClick={this.setModalVisible.bind(this, true)}></Icon>
    return (
      <div id="mobile" className="mobile-header">
        <header>
          <img src={logo} alt="logo"/>
          <span className="mobile-logo">ReactNews</span>
          {userShow}
        </header>
        <Modal
          title="用户中心"
          visible={this.state.visible}
          onOk={this.setModalVisible.bind(this, false)}
          okText="关闭"
          onCancel={this.setModalVisible.bind(this, false)}
          warpClassName="vertical-center-modal">
          <Tabs type="card" defaultActiveKey="1" onChange={this.callback.bind(this)}>
            <TabPane tab="登录" key="1">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label="用户">
                  {getFieldDecorator('userName', {
                    rules: [{required: this.state.action === 'login', message: '账号不能为空'}]
                  })(
                    <Input placeholder="请输入您的账号" />
                  )}
                </Form.Item>
                <Form.Item label="密码">
                  {getFieldDecorator('password', {
                    rules: [{required: this.state.action === 'login', message: '密码不能为空'}]
                  })(
                    <Input type="password" placeholder="请输入您的密码"/>
                  )}
                </Form.Item>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Item label="用户">
                  {getFieldDecorator('r_username', {
                    rules: [{required: this.state.action === 'register', message: '账号不能为空'}]
                  })(
                    <Input placeholder="请输入您的账号" />
                  )}
                </Form.Item>
                <Form.Item label="密码">
                  {getFieldDecorator('r_password', {
                    rules: [{required: this.state.action === 'register', message: '密码不能为空'}]
                  })(
                    <Input type="password" placeholder="请输入您的密码"/>
                  )}
                </Form.Item>
                <Form.Item label="确认密码">
                  {getFieldDecorator('r_confirmPassword', {
                    rules: [{required: this.state.action === 'register', message: '请再次输入密码'}]
                  })(
                    <Input type="password" placeholder="请再次输入您的密码"/>
                  )}
                </Form.Item>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default MobileHeader = Form.create({})(MobileHeader)
