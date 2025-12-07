import 'styled-components'

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			primaryBackgroundColor: string,
			secondaryBackgroundColor: string,
			tertiaryBackgroundColor: string,
			primaryFontColor: string,
			secondaryFontColor: string
		}
	}
}
