import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import GlobalContext from '../../contexts/GlobalContext'

export default function Recipe() {

  let { recipeReady, query } = useContext(GlobalContext)

  useEffect(() => {
    query('recipe')
  }, [])

  let {
    title,
    category,
    area,
    instructions,
    image,
    youtube,
    ingredients
  } = recipeReady

  console.log(recipeReady)

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className='recipe'>

        <div className='recipe__image_container'>
          <img src={image} alt={title} className='recipe__image' loading='lazy' />
        </div>

        <div className='recipe__texts'>
          <h2 className='recipe__title'>{title}</h2>
          <p className='recipe__subtitle'>{category}-{area}</p>
        </div>

        <ul className='recipe__ingredients_list'>
          { (ingredients)
            ? ingredients.map( ingred =>
                {
                  if( ingred.ingredient !== null && ingred.ingredient !== '' ){
                    return (
                      <li
                        key={ingred.ingredient}
                        className='recipe__ingredients_elem'
                      >
                        <p className='recipe__ingredients_elem-ingred'>{ingred.ingredient}</p>
                        <span className='recipe__ingredients_elem-measure'>{ingred.measure}</span>
                      </li>
                    )
                  }
                }
              )
            :null
          }
        </ul>

        <div className='recipe__instructions'>
          <p className='recipe__instructions_text' >{instructions}</p>
        </div>

        <a className='recipe__youtube_link' href={youtube} target="_blank" rel="noreferrer" >Watch on Youtube</a>

      </div>
    </>

  )
}
