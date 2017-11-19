import React, { Component, cloneElement } from 'react'

export default class Row extends Component {
  state = {
    selected: false,
  }
  down = e => {
    if (!this.props.active) return

    const { top } = this.e.getBoundingClientRect()
    const { offsetY } = e.nativeEvent

    const initialPosition = top + offsetY

    this.setState({
      selected: true,
      initialPosition,
      cursorPosition: initialPosition,
      initialIndex: this.props.y,
    })
  }
  up = () => {
    if (this.state.selected && this.props.active) {
      this.props.up()
      this.setState({ selected: false })
    }
  }
  move = e => {
    if (!this.props.active) return

    if (this.state.selected) {
      const { initialPosition, initialIndex } = this.state
      const { clientY } = e

      const delta = initialPosition - clientY

      let i = Math.round(initialIndex - delta / 100)
      i = i < 0 ? 0 : Math.abs(i)

      this.props.updateIndex(this.props.y, i)
      this.setState({ cursorPosition: clientY })
    }
  }
  componentDidMount = () => {
    window.addEventListener('mouseup', this.up)
    window.addEventListener('mousemove', this.move)
  }
  componentWillUnmount = () => {
    window.removeEventListener('mouseup', this.up)
    window.removeEventListener('mousemove', this.move)
  }
  render() {
    const {
      selected,
      initialIndex,
      initialPosition,
      cursorPosition,
    } = this.state

    const selectedY = initialIndex * 100 - initialPosition + cursorPosition
    const y = this.props.y * 100

    const tY = selected ? selectedY : y
    const scale = selected ? 1.1 : 1

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: selected ? 1 : 0,
          transform: `translateY(${tY}px) scale(${scale})`,
          transition: selected ? '' : 'all .5s',
          userSelect: selected ? 'none' : 'auto',
          display: 'flex',
          alignItems: 'center',
        }}
        ref={e => (this.e = e)}
        onMouseDown={this.down}
      >
        {cloneElement(this.props.children, { selected })}
      </div>
    )
  }
}
