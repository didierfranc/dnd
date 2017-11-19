import React, { Component } from 'react'
import DnD from './Drag'
import Row from './Drag/Row'

const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]

const Element = ({ children, selected }) => (
  <div
    style={{
      width: '100%',
      height: 90,
      borderRadius: 3,
      padding: 10,
      boxSizing: 'border-box',
      transition: 'all .5s',
      background: selected ? '#ccc' : '#eee',
      color: selected ? 'white' : 'grey',
    }}
  >
    {children}
  </div>
)

class App extends Component {
  state = {
    active: false,
  }
  dragEnd = e => {
    console.log(e)
  }
  toggle = () => {
    this.setState({ active: !this.state.active })
  }
  render() {
    const { active } = this.state
    return (
      <div>
        <button onClick={this.toggle}>{active ? 'Disable' : 'Enable'}</button>

        <DnD onDragEnd={this.dragEnd} active={this.state.active}>
          {data.map(e => (
            <Row key={e.id}>
              <Element>{e.id}</Element>
            </Row>
          ))}
        </DnD>
      </div>
    )
  }
}

export default App
