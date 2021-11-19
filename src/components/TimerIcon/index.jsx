import React from 'react'
import { useNavigate } from 'react-router'
import { Player } from '@lottiefiles/react-lottie-player'
import timer from '../../assets/timer.json'

export default function TimerIcon() {
  let navigate = useNavigate()
  return (
    <div className='timer_icon' onClick={() => navigate('/recipes_pwa/timer')}>
      <Player
        autoplay={true}
        loop={true}
        hover={false}
        keepLastFrame={false}
        speed={1}
        src={timer}
        style={{ height: '80px', width: '80px' }}
      />
    </div>
  )
}
