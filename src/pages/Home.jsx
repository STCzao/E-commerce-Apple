import React from 'react'
import Hero from '../Components/Hero/Hero'
import Lanzamientos from '../Components/Lanzamientos/Lanzamientos'
import Carrousel from '../Components/Carrousel/Carrousel'

const Home = () => {
  return (
    <div>
        <Hero/>
        <div className='flex justify-center items-center mt-40 mb-40'>
          <Carrousel/> 
        </div>
    </div>
  )
}

export default Home