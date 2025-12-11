import { createGlobalStyle } from 'styled-components'
import { vars } from '@/styles/vars'

export const GlobalStyles = createGlobalStyle`
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed,
	figure, figcaption, footer, header, hgroup,
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure,
	footer, header, hgroup, menu, nav, section {
		display: block;
	}
	body {
		line-height: 1;
		font-family: ${vars.fonts.primaryFont};
		/* background-color: ${(props) => props.theme.colors.primaryBackgroundColor}; */
		background: radial-gradient(
				${(props) => props.theme.colors.tertiaryBackgroundColor},
				${(props) => props.theme.colors.primaryBackgroundColor},
				${(props) => props.theme.colors.secondaryBackgroundColor}
			);
		color: ${(props) => props.theme.colors.primaryFontColor};
		height: 100vh;
		width: 100vw;
	}
	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	body, input, button {
		font-size: .9rem;
	}

	svg.lucide {
		width: 20px;
		height: 20px;
	}

	@media screen and (min-width: ${vars.breakpoints.smartphone}) {
		body, input, button {
			font-size: 1rem;
		}

		svg.lucide {
			width: 22px;
			height: 22px;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.tablet}) {
		body, input, button {
			font-size: 1.1rem;
		}

		svg.lucide {
			width: 24px;
			height: 24px;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.notebook}) {
		body, input, button {
			font-size: 1.2rem;
		}

		svg.lucide {
			width: 25px;
			height: 25px;
		}
	}

	@media screen and (min-width: ${vars.breakpoints.desktop}) {
		svg.lucide {
			width: 26px;
			height: 26px;
		}
	}
`
