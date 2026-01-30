// obtém o tema do dispositivo ou do local storage
export const getTheme = () => {
	// verifica se o tema dark está definido pelo dispositivo
	// se não houver, irá retornar o light
	const deviceTheme =
		window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'

	// verifica se há algum tema salvo no local storage
    const theme = localStorage.getItem('questions-theme')

	// caso tenha salvo no local storage, ele será o preferencial
	// caso não, retorna o tema do dispositivo
    return theme !== null ? JSON.parse(theme) : deviceTheme
}
