export const getTheme = () => {
	const deviceTheme =
		window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'

    const theme = localStorage.getItem('questions-theme')
    return theme !== null ? JSON.parse(theme) : deviceTheme
}
