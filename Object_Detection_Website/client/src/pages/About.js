import React from 'react'
import './styles.css'
const About = () => {
  return (
    <div className='container'>
        <h1 className='title'>About App</h1>
        <p className='description'>Greetings, our Object Detection App <br/>takes an image in input and <br/>detects objects using pre-trained YoloV5 Model</p>
    </div>
  )
}

export default About