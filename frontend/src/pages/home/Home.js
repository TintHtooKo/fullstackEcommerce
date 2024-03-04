import React from 'react'
import './Home.css'

import Hero from '../../components/hero/Hero';
import NewCollection from '../../components/newCollection/NewCollection';
import Offer from '../../components/offer/Offer';


export default function Home() {
  return (
    <>
     <Hero/>
     <NewCollection/>
     <Offer/>
    </>
  )
}
