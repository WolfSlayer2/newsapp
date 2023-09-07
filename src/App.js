import React, { useState } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App() {
  const pgSize = 6;
  const apiKey = process.env.REACT_APP_API
  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          shadow='true'
          height={3}
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pgSize} country='in' category='general' />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pgSize} country='in' category='business' />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pgSize} country='in' category='entertainment' />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pgSize} country='in' category='general' />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pgSize} country='in' category='health' />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pgSize} country='in' category='science' />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pgSize} country='in' category='sports' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pgSize} country='in' category='technology' />} />
        </Routes>
      </Router>
    </div>
  )
}


