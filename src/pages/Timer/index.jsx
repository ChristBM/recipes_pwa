import React, { useState, useEffect, useReducer } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import confeti_anime from '../../assets/confetti.json'

const initialState = {
	isRunning: false,
	time: 0,
}

function reducer(state, action) {
	switch (action.type) {
		case 'init':
			return { ...state, time: action.value }
		case 'start':
			return { ...state, isRunning: true }
		case 'stop':
			return { ...state, isRunning: false }
		case 'reset':
			return { isRunning: false, time: 0 }
		case 'tick':
			return { ...state, time: state.time - 1 }
		default:
			throw new Error()
	}
}

export default function Timer() {
	const [ showInput, setShowInput ] = useState(true)
	const [ confeti, setConfeti ] = useState(false)

	const [ state, dispatch ] = useReducer(reducer, initialState)

	let myTimer

	useEffect(
		() => {
			if (!state.isRunning) {
				return
			}
			if (state.time === 0) {
				dispatch({ type: 'reset' })
				setShowInput(true)
				clearInterval(myTimer)
				sendNotification()
				showConfeti()
			}
			myTimer = setInterval(() => dispatch({ type: 'tick' }), 1000)
			return () => clearInterval(myTimer)
		},
		[ state.isRunning, state.time ]
	)

	const sendNotification = async () => {
		const registration = await navigator.serviceWorker.getRegistration()
		if (!registration) {
			return alert('no hay un service worker instalado')
		}
		registration.showNotification('Timer has finished', {
			body: 'ding dong',
			vibrate: [ 200, 100, 200, 100, 200, 100, 200 ],
			tag: 'vibration-end-timer',
		})
		showConfeti()
	}

	const requestNotification = async () => {
		if (!('Notification' in window) || !('serviceWorker' in navigator)) {
			console.log('el navegador no soporta notificaciones')
		}
		let promise = await Notification.requestPermission()
		if (promise === 'granted') {
			console.log('las notificaciones están permitidas')
			dispatch({ type: 'start' })
			setShowInput(false)
		} else {
			console.log('las notificaciones están bloqueadas')
		}
	}

	const showConfeti = () => {
		setConfeti(true)
		setTimeout(() => setConfeti(false), 3300)
	}

	return (
		<div className='timer'>
			{confeti ? (
				<div className='timer__confeti'>
					<Player
						autoplay={true}
						loop={true}
						hover={false}
						keepLastFrame={false}
						speed={1}
						src={confeti_anime}
						style={{ height: '300', width: '300' }}
					/>
				</div>
			) : null}
			<div className='timer__container'>
				<button className='timer__btn stop' onClick={() => dispatch({ type: 'stop' })}>
					Stop
				</button>
				<button className='timer__btn play' onClick={requestNotification}>
					Play
				</button>
				<button
					className='timer__btn reset'
					onClick={() => {
						dispatch({ type: 'reset' })
						setShowInput(true)
					}}
				>
					Reset
				</button>
				{showInput ? (
					<div className='timer__input_container'>
						<input
							className='timer__input'
							type='number'
							min='0'
							max='999'
							step='1'
							value={state.time}
							onChange={ev => dispatch({ type: 'init', value: ev.target.value })}
						/>
					</div>
				) : (
					<div className='timer__counter'>
						<p className='timer__counter_text'>{state.time}s</p>
					</div>
				)}
			</div>
		</div>
	)
}
