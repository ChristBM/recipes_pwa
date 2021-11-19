import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import error404 from '../../assets/404-error.json'

export default function NotFound() {
	return (
		<div className='not_found'>
			<Player
				autoplay={true}
				loop={true}
				hover={false}
				keepLastFrame={false}
				speed={0.5}
				src={error404}
				background='#beebd0'
				style={{ height: '100vh', width: '100vw' }}
			></Player>
		</div>
	)
}