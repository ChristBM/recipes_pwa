import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet'
import GlobalContext from '../../contexts/GlobalContext'
import MainCard from '../../components/MainCard'

export default function Category() {

  const { categoryRecipes, setRecipe, query } = useContext(GlobalContext)

  let navigate = useNavigate()

  useEffect(() => {
    query('category_recipes')
  }, [])

  return (
    <>
      <Helmet>
        <title>Select A Recipe</title>
      </Helmet>
      <div className='category'>
        { categoryRecipes.length !== 0
          ? categoryRecipes.map( recipe =>
              <MainCard
                key={recipe.strMeal}
                image={recipe.strMealThumb}
                title={recipe.strMeal}
                onClick={ () => {
                    navigate('/category/recipe')
                    setRecipe(recipe.strMeal)
                    }
                  }
              />
            )
          : null
        }
      </div>
    </>
  )
}
