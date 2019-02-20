import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header'
import Body from './components/body'
import Footer from './components/footer'
import "antd/dist/antd.css"

export default class Index extends React.Component{
	constructor () {
		super()
		this.state = {
			userid: true
		}
	}
	componentWillMount () {
		console.log('indexWill')
	}
	componentDidMount () {
		console.log('indexDid')
	}
	render () {
    let component = <Footer></Footer>
		// 用处
		// if (用户未登录) {
		// 	component = 其他组件
		// }
		return (
			<div>
				<Header></Header>
				<Body userid={123}></Body>
				<div>{this.props.children}</div>
				{component}
			</div>
		)
	}
}
