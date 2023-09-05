import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pgSize = 6;

  state = {
    progress: 0
  }

  setProgress = (prog)=> {
    this.setState({ progress: prog })
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            shadow='true'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key='general' pageSize={this.pgSize} country='in' category='general' />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key='business' pageSize={this.pgSize} country='in' category='business' />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key='entertainment' pageSize={this.pgSize} country='in' category='entertainment' />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key='general' pageSize={this.pgSize} country='in' category='general' />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key='health' pageSize={this.pgSize} country='in' category='health' />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key='science' pageSize={this.pgSize} country='in' category='science' />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key='sports' pageSize={this.pgSize} country='in' category='sports' />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key='technology' pageSize={this.pgSize} country='in' category='technology' />} />
          </Routes>
        </Router>
      </div>
    )
  }
}


