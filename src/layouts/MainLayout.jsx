import React, { useState, useEffect } from 'react'
import Header from '../containers/Header'
import GoUpArrow from '../components/GoUpArrow'
import TimerIcon from '../components/TimerIcon'

export default function MainLayout({ children }) {

	const [ arrowVisible, setArrowVisible ] = useState(false)
	const [ yScroll, setYScroll ] = useState(0)

	window.onscroll = () => {
		setYScroll(window.scrollY)
	}

	useEffect(
		() => {
			if (yScroll >= 300) {
				setArrowVisible(true)
			} else {
				setArrowVisible(false)
			}
		},
		[ yScroll ]
	)

	const handleGoUp = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<div>
			<Header />
			<main>
				<TimerIcon />
				{children}
			</main>
			{ arrowVisible
					? <GoUpArrow onClick={handleGoUp}/>
					: null
			}
		</div>
	)
}
