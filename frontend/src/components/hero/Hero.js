import React from 'react'
import './Hero.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import Cover1 from '../../assets/cover1.jpg'
import Cover2 from '../../assets/cover2.jpg'
import Cover3 from '../../assets/cover3.jpg'

export default function Hero() {
  return (
    <Carousel
    showThumbs={false}
    autoPlay={true}
    transitionTime={2}
    stopOnHover={false}
    infiniteLoop={true}
    >
        <div>
          <img src={Cover1}/>
          <div className='hero'>
            <h1>H-commerce</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reprehenderit facere, quis minus quod eos maxime eveniet inventore rem corporis sed! Recusandae blanditiis ipsum nam facere fuga sapiente quos nobis!</p>
          </div>
        </div>
        <div>
          <img src={Cover2}/>
          <div className='hero'>
            <h1>H-commerce</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reprehenderit facere, quis minus quod eos maxime eveniet inventore rem corporis sed! Recusandae blanditiis ipsum nam facere fuga sapiente quos nobis!</p>
          </div>
        </div>
        <div>
          <img src={Cover3}/>
          <div className='hero'>
            <h1>H-commerce</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam reprehenderit facere, quis minus quod eos maxime eveniet inventore rem corporis sed! Recusandae blanditiis ipsum nam facere fuga sapiente quos nobis!</p>
          </div>
        </div>
      </Carousel>
      
  )
}
