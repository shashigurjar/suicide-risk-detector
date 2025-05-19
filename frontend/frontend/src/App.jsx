import React from 'react';
import About from './About';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import PreventionSection from './PreventionSection';
import TryNowPage from './TryNowPage';
import { useState } from 'react';
function App() {
  const [show, setShow] = useState(false);
  return (
    <>
    {show ? <div><TryNowPage/></div> : 
    <div className='home'>
      <Navbar change = {setShow}></Navbar>
      <HeroSection change = {setShow}></HeroSection>
      <PreventionSection></PreventionSection>
      <About></About>
      
      
    </div>}
    </>
      
  )
}

export default App
