import React, { useContext, useEffect } from 'react'
import GlobalContext from '../../contexts/GlobalContext'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import MainCard from '../../components/MainCard'

export default function Home() {

  const { homeCategories, setCategory, query } = useContext(GlobalContext)

  let navigate = useNavigate()

  useEffect(() => {
    query('categories')
  }, [])

  return (
    <>
      <Helmet>
        <title>Recipes</title>
      </Helmet>
      <div className='home'>
        { homeCategories.length !== 0
          ? homeCategories.map( categ =>
              <MainCard
                key={categ.strCategory}
                image={categ.strCategoryThumb}
                title={categ.strCategory}
                onClick={ () => {
                    navigate('/recipes_pwa/category')
                    setCategory(categ.strCategory)
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
