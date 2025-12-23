export const shuffleArray = (array: string[] | number[]) => {
	let currentIndex = array.length

	// Enquanto há elementos para randomizar
	while (currentIndex != 0) {
		// Pega o elemento restante
		const randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// E troca algum elemento de lugar com o elemento atual
		;[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		]
	}

	return array
}
