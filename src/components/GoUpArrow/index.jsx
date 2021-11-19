import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import go_up_arrow from '../../assets/go-up-arrow.json'

export default function GoUpArrow({ onClick }) {
  return (
    <div className='go_up' onClick={onClick}>
      <Player
        autoplay={true}
        loop={true}
        hover={false}
        keepLastFrame={false}
        speed={1}
        src={go_up_arrow}
        style={{ height: '50px', width: '50px' }}
      />
    </div>
  )
}
