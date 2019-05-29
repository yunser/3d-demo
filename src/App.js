import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    url: '/static/xr/4_0.png',
    angle: 20
  }

  render() {
    const { angle } = this.state
    const _this = this

    console.log('render', angle)

    let idx = Math.floor(angle / 100 * 18) % 18
    let url = `/static/xr/4_${idx}.png`

    function onMouseDown(e) {
      console.log('onMouseDown', e.pageX)
      // _this.setState({
      //   url: '/static/xr/4_1.png'
      // })
      _this.isDown = true
      _this.downX = e.pageX
      _this.downAngle = angle
      return false
    }

    function onMouseMove(e) {
      console.log('onMouseMove')
      if (!_this.isDown) {
        return
      }
      let x = e.pageX
      let offsetX = x - _this.downX
      let angle = (_this.downAngle - offsetX / window.innerWidth * 360) % 360
      if (angle < 0) {
        angle += 360
      }
      console.log('set render', angle)
      _this.setState({
        angle,
      })
      return false
    }

    function onMouseUp() {
      console.log('onMouseUp')
      _this.isDown = false
      // _this.setState({
      //   url: '/static/xr/4_1.png'
      // })
      return false
    }

    function onChange(e) {
      console.log('onChange', e.target.value)
      _this.setState({
        angle: e.target.value
      })
    }

    return (
      <div className="App">
        <header className="App-header">
          <img className="lightImg" draggable="false" src={url}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove} />
          <input type="range" value={angle} id="myRange" onChange={onChange} />
        </header>
      </div>
    )
  }
}

// function App() {
//   const { url } = this.state

// }

export default App;
