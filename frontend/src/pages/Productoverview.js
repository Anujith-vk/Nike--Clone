import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import Overview from '../component/Overview/Overview'
import { useParams } from 'react-router-dom'
const Productoverview = () => {
const {id}=useParams()

  return (
    <div>
      <Navbar/>
      <Overview id={id}/>
      <Footer/>
    </div>
  )
}
export default Productoverview
