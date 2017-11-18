import React, { Component, cloneElement } from 'react'
import logo from './logo.svg'
import './App.css'

const algo = (currentIndex, selectedIndex, newSelectedIndex) => {
  return currentIndex === selectedIndex
    ? newSelectedIndex
    : selectedIndex < currentIndex && newSelectedIndex >= currentIndex
      ? currentIndex - 1
      : selectedIndex > currentIndex && newSelectedIndex <= currentIndex
        ? currentIndex + 1
        : currentIndex
}

class Row extends Component {
  state = {
    selected: false,
  }
  down = e => {
    const { top } = this.e.getBoundingClientRect()
    const { offsetY } = e.nativeEvent
    const init = top + offsetY
    this.setState({
      selected: true,
      init,
      cursorPosition: init,
      initialIndex: this.props.y,
    })
  }
  up = () => {
    if (this.state.selected) {
      this.props.updateIndex(this.props.y, this.state.i)
      this.setState({ selected: false })
    }
  }
  move = e => {
    if (this.state.selected) {
      const { clientY } = e
      const delta = -(this.state.init - clientY)

      console.log(this.state.initialIndex)
      let i = Math.round(this.state.initialIndex + delta / 100)
      i = i < 0 ? 0 : Math.abs(i)

      this.props.updateIndex(this.props.y, i)
      this.setState({ i, cursorPosition: clientY })
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
    const { selected, initialIndex } = this.state

    const a = this.state.initialIndex * 100
    const d = this.state.init - this.state.cursorPosition
    const b = this.props.y * 100

    console.log(b)

    const tY = selected ? a - d : b
    const scale = selected ? 1.1 : 1

    console.log(tY)
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: 100,
          zIndex: this.state.selected ? 100 : 0,
          transform: `translateY(${tY}px) scale(${scale})`,
          transition: selected ? '' : 'all .5s',
          userSelect: 'none',
        }}
        ref={e => (this.e = e)}
        onMouseDown={this.down}
      >
        <div
          style={{
            height: 90,
            background: this.state.selected ? '#ddd' : '#eee',
          }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

class DnD extends Component {
  state = {
    children: [],
  }
  updateIndex = (y, i) => {
    this.setState({
      children: this.state.children.map(e => ({
        ...e,
        props: {
          ...e.props,
          y: algo(e.props.y, y, i),
        },
      })),
    })
  }
  select = selected => {
    this.setState({ selected })
  }
  componentDidMount = () => {
    this.setState({ children: this.props.children })
  }
  render() {
    return (
      <div
        style={{
          width: 200,
          margin: '100px auto',
          position: 'relative',
        }}
      >
        {this.state.children.map(e =>
          cloneElement(e, {
            y: e.props.y,
            updateIndex: this.updateIndex,
          }),
        )}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <DnD>
        {data.map(e => (
          <Row key={e.id} y={e.y}>
            {e.id}
          </Row>
        ))}
      </DnD>
    )
  }
}

const data = [
  { id: 1, y: 0 },
  { id: 2, y: 1 },
  { id: 3, y: 2 },
  { id: 4, y: 3 },
  { id: 5, y: 4 },
]

export default App
