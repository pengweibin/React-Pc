import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import BodyChild from './bodyChild'
import ReactMixin from 'react-mixin'
import MixinLog from './mixins'

const defaultProps = {
  userid: 111
}

export default class Body extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: 'wrysun'
    }
  }
  componentWillMount () {
    // 页面将要加载
    console.log('will')
  }
  componentDidMount () {
    // 页面加载完成
    console.log('did')
  }
  onChange () {
    this.refs.button.style.color = 'red'
    this.setState({
      username: '未登录'
    })
    MixinLog.log()
  }
  onValueChange (event) {
    this.setState({
      username: event.target.value
    })
  }
  render () {
    // let userName = 'Wrysun'
    // let boolInput = false
    // let html = "lesson&nbsp;123"
    // 可以用uncode将html自负床汇总的特殊符号进行转码
    return (
      <div>
        <h2>这是主体部分内容</h2>
        <p>{this.state.username} | {this.props.userid}</p>
        <input ref="button" type="button" value="提交" onClick={this.onChange.bind(this)} />
        <BodyChild {...this.props} onValueChange={this.onValueChange.bind(this)}/>
        {/* <p>{userName || '未登录'}</p>
        <p><input type="button" value={userName} disabled={boolInput}/></p>
        <p>{html}</p> */}
        {/* 解析html中的特殊符号，不推荐使用 */}
        {/* <p dangerouslySetInnerHTML={{__html: html}}></p> */}
      </div>
    )
  }
}

// 设置 userid 校验
// Body.propTypes = {
//   userid: PropTypes.number.isRequired
// }

// 设置默认值
Body.defaultProps = defaultProps

ReactMixin(Body.prototype, MixinLog)