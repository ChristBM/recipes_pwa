import { useState, useEffect } from 'react'

const url_base = 'https://www.themealdb.com/api/json/v1/1/'

export default function useGlobal() {
	const [ homeCategories, homeSetCategories ] = useState([])
	const [ categoryRecipes, setCategoryRecipes ] = useState([])
	const [ recipeSelected, setRecipeSelected ] = useState([])

	const [ recipeReady, setRecipeReady ] = useState({})

	const [ category, setCategory ] = useState('')
	const [ recipe, setRecipe ] = useState('')

	const query = async criteria => {
		let response = {}
		let data = []

		switch (criteria) {
			case 'categories':
				response = await fetch(`${url_base}categories.php`)
				data = await response.json()
				homeSetCategories(data.categories)
				break
			case 'category_recipes':
				response = await fetch(`${url_base}filter.php?c=${category}`)
				data = await response.json()
				setCategoryRecipes(data.meals)
				break
			case 'recipe':
				response = await fetch(`${url_base}search.php?s=${recipe}`)
				data = await response.json()
				setRecipeSelected(data.meals)
				break
			default:
				response = {}
				data = []
				homeSetCategories(data)
				setCategoryRecipes(data)
				setRecipeSelected(data)
				break
		}
	}

	useEffect(
		() => {
			if (recipeSelected.length !== 0) {
				setRecipeReady({
					title: recipeSelected[0].strMeal,
					category: recipeSelected[0].strCategory,
					area: recipeSelected[0].strArea,
					instructions: recipeSelected[0].strInstructions,
					image: recipeSelected[0].strMealThumb,
					youtube: recipeSelected[0].strYoutube,
					ingredients: [
						{
							ingredient: recipeSelected[0].strIngredient1,
							measure: recipeSelected[0].strMeasure1,
						},
						{
							ingredient: recipeSelected[0].strIngredient2,
							measure: recipeSelected[0].strMeasure2,
						},
						{
							ingredient: recipeSelected[0].strIngredient3,
							measure: recipeSelected[0].strMeasure3,
						},
						{
							ingredient: recipeSelected[0].strIngredient4,
							measure: recipeSelected[0].strMeasure4,
						},
						{
							ingredient: recipeSelected[0].strIngredient5,
							measure: recipeSelected[0].strMeasure5,
						},
						{
							ingredient: recipeSelected[0].strIngredient6,
							measure: recipeSelected[0].strMeasure6,
						},
						{
							ingredient: recipeSelected[0].strIngredient7,
							measure: recipeSelected[0].strMeasure7,
						},
						{
							ingredient: recipeSelected[0].strIngredient8,
							measure: recipeSelected[0].strMeasure8,
						},
						{
							ingredient: recipeSelected[0].strIngredient9,
							measure: recipeSelected[0].strMeasure9,
						},
						{
							ingredient: recipeSelected[0].strIngredient10,
							measure: recipeSelected[0].strMeasure10,
						},
						{
							ingredient: recipeSelected[0].strIngredient11,
							measure: recipeSelected[0].strMeasure11,
						},
						{
							ingredient: recipeSelected[0].strIngredient12,
							measure: recipeSelected[0].strMeasure12,
						},
						{
							ingredient: recipeSelected[0].strIngredient13,
							measure: recipeSelected[0].strMeasure13,
						},
						{
							ingredient: recipeSelected[0].strIngredient14,
							measure: recipeSelected[0].strMeasure14,
						},
						{
							ingredient: recipeSelected[0].strIngredient15,
							measure: recipeSelected[0].strMeasure15,
						},
						{
							ingredient: recipeSelected[0].strIngredient16,
							measure: recipeSelected[0].strMeasure16,
						},
						{
							ingredient: recipeSelected[0].strIngredient17,
							measure: recipeSelected[0].strMeasure17,
						},
						{
							ingredient: recipeSelected[0].strIngredient18,
							measure: recipeSelected[0].strMeasure18,
						},
						{
							ingredient: recipeSelected[0].strIngredient19,
							measure: recipeSelected[0].strMeasure19,
						},
						{
							ingredient: recipeSelected[0].strIngredient20,
							measure: recipeSelected[0].strMeasure20,
						},
					],
				})
			} else {
				setRecipeReady({})
			}
		},
		[ recipeSelected ]
	)

	return {
		homeCategories,
		setCategory,
		categoryRecipes,
		setRecipe,
		recipeReady,
		query,
	}
}
