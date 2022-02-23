import styled from 'styled-components'
import './index.css'
import { MainPage, Text as MainPageTxt } from './components/threejS/MainPage';
import { Canvas } from '@react-three/fiber';
import { Facilitators } from './components/facilitators/facilitators.js';
import { Upload } from './components/facilitators/upload.js';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';
import { AboutPage, Canvas2 } from './components/threejS/aboutPage';

import React from 'react';
import Navbar from './components/NavBar/navbar';
//import Cursor from './components/cursor';

function App() {
  return (
    <>
      <Router>
        <Navbar fontColor={"black"} />
        
        {/* <Canvas camera={{ position: [0, 0, 3] }}> */}
	      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/inovations" element={<Inovations />} />
          <Route path="/facilitators" element={<Facilitators />} />
          {/*<Route path="/components/assets/" href={<DARL/>} />*/}
          <Route path="/uploads" element={<Upload />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* </Canvas> */}
      </Router>
    </>
  )
}

export default App;

const Home = () => {

  return (
    <>
      <MainPageTxt />
      <MainPage />
    </>
  )
}

const Login = () => {
  return (
    <>
      <div style={{ textAlign: 'center', verticalAlign: 'center' }}>
        <h1 style={{ color: 'red', fontSize: '24px' }}>Login</h1>
      </div>
    </>
  )
}

const Inovations = () => {

  return (
    <>
      <div style={{ textAlign: 'center', verticalAlign: 'center' }}>
        <h1 style={{ color: 'red', fontSize: '24px' }}>Inovations</h1>
      </div>

    </>
  )
}

const About = () => {
  return (
    <>
      <AboutPage />

    </>
  )
}
