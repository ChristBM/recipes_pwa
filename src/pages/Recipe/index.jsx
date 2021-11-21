import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Player } from '@lottiefiles/react-lottie-player'
import GlobalContext from '../../contexts/GlobalContext'
import share from '../../assets/share.json'

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

  const shareData = {
  title: title,
  text: 'Come and discover incredible and delicious recipes.',
  url: 'https://christbm.github.io/recipes_pwa'
  }

  const handleShare = async() => {
    try{
      await navigator.share(shareData)
    }
    catch(err){
      throw new Error()
    }
  }

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
          <div className='recipe__texts_g1'>
            <h2 className='recipe__title'>{title}</h2>
            <p className='recipe__subtitle'>{category}-{area}</p>
          </div>
          <div className='recipe__texts_g2'>
            <button className='recipe__btn-share' onClick={handleShare}>
              <Player
                autoplay={true}
                loop={true}
                hover={false}
                keepLastFrame={false}
                speed={1}
                src={share}
                style={{ height: '40px', width: '40px' }}
              />
            </button>
            <p className='recipe__btn_subtitle'>Share</p>
          </div>
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
