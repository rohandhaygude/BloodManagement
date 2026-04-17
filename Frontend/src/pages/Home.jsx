import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Blood from '../components/Blood'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <div>
      <Hero 
        title="Welcome to Online Blood Management System" 
        imageUrl="/hero.png"
      />

      <Biography imageUrl="/about.png"/>

      <Blood/>
      <MessageForm/>
    </div>
  )
}

export default Home