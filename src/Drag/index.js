import React, { Component, cloneElement } from 'react'
import { order } from './helpers'

export default class DnD extends Component {
  state = {
    children: [],
  }
  up = () => {
    const order = this.state.children
      .sort((a, b) => a.props.y - b.props.y)
      .map(e => e.key)

    console.log(order)
  }
  updateIndex = (y, i) => {
    const max = this.state.children.length - 1

    this.setState({
      children: this.state.children.map(e => ({
        ...e,
        props: {
          ...e.props,
          y: order(e.props.y, y, i, max),
        },
      })),
    })
  }
  componentDidMount = () => {
    const children = this.props.children.map((e, i) => ({
      ...e,
      props: {
        ...e.props,
        y: i,
      },
    }))
    this.setState({ children })
  }
  render() {
    return (
      <div
        style={{
          width: 200,
          margin: '200px auto',
          position: 'relative',
        }}
      >
        {this.state.children.map(e =>
          cloneElement(e, {
            y: e.props.y,
            active: this.props.active,
            updateIndex: this.updateIndex,
            up: this.up,
          }),
        )}
      </div>
    )
  }
}
