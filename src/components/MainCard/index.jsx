import React from 'react'
import PropTypes from 'prop-types'

export default function MainCard(props) {

  let { image, title, onClick } = props

  return (
    <div className='category_card' onClick={onClick}>
      <div className='category_card__img_container'>
        <img src={image} alt={title} className='category_card__img' loading='lazy' />
      </div>
      <div className='category_card__title_container'>
        <h3 className='category_card__title'>{title}</h3>
      </div>
    </div>
  )
}

MainCard.defaultProps = {
  image: null,
  title: 'Recipe/Category',
  onClick: () => null
}

MainCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}