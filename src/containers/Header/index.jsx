import React, { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import arrow_back from '../../assets/arrow-back.json'

const initialState = {
	title: 'Delicious Dishes',
	btn_back: false,
}

const reducer = (state, action) => {
	switch (action.type) {
		case '/recipes_pwa/':
			return { title: 'Delicious Dishes', btn_back: false }
		case '/recipes_pwa/category':
			return { title: 'Select A Recipe', btn_back: true }
		case '/recipes_pwa/category/recipe':
			return { title: 'Recipe', btn_back: true }
		case '/recipes_pwa/timer':
			return { title: 'Timer', btn_back: true }
		default:
			return { title: 'Back Home', btn_back: false }
	}
}

export default function Header() {

	const [ offline, setOffline ] = useState(false)
	const [ state, dispatch ] = useReducer(reducer, initialState)

	window.addEventListener('offline', () => {
		setOffline(!offline)
	})

	window.addEventListener('online', () => {
		setOffline(!offline)
	})

	let location = useLocation()
	let navigate = useNavigate()

	useEffect(
		() => {
			dispatch({ type: location.pathname })
		},
		[ location ]
	)

	const handleBack = () => {
		location.pathname === '/recipes_pwa/category/recipe'
			? navigate('/recipes_pwa/category')
			: navigate('/recipes_pwa/')
	}

	return (
		<header className='header'>
			{state.btn_back ? (
				<button onClick={handleBack} className='header__arrow_link'>
					<Player
						autoplay={true}
						loop={true}
						hover={false}
						keepLastFrame={false}
						speed={0.5}
						src={arrow_back}
						style={{ height: '30px', width: '40px' }}
					/>
				</button>
			) : null}
			<Link to='/recipes_pwa/' className='header__link'>
				{state.title}
			</Link>
			{ offline
					? <p className='header__offline'>Offline</p>
					: null
			}
		</header>
	)
}
