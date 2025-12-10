export const flex = (
	direction: 'row' | 'column' = 'row',
	justify: string = 'auto',
	align: string = 'auto',
	gap: string = 'auto',
) => {
	return `
		display: flex;
		flex-direction: ${direction};
		justify-content: ${justify};
		align-items: ${align};
		gap: ${gap};
	`
}
