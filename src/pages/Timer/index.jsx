import React, { useState, useEffect, useReducer } from 'react'

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

	return (
		<div className='timer'>
			<div className='timer__container'>
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
					<div className='timer__counter'>{state.time}s</div>
				)}
				<div className='timer__btns_container'>
					<button className='timer__btn' onClick={requestNotification}>
						Play
					</button>
					<button className='timer__btn' onClick={() => dispatch({ type: 'stop' })}>
						Stop
					</button>
					<button
						className='timer__btn'
						onClick={() => {
							dispatch({ type: 'reset' })
							setShowInput(true)
						}}
					>
						Reset
					</button>
				</div>
			</div>
		</div>
	)
}
