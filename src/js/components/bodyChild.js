import React from 'react'

export default class BodyChild extends React.Component {
  render () {
    return (
      <div>
        <div>父页面props：{this.props.userid}</div>
        <p>子页面输入：<input type="text" onChange={this.props.onValueChange}/></p>
      </div>
    )
  }
}