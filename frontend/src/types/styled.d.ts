import 'styled-components'
import { lightTheme } from '@/styles/themeVars'

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: ReturnType<typeof lightTheme>
	}
}
