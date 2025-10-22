export interface IQuestion {
	subject: string
	statement: string
	year?: number
	instituition?: string
	position?: string
	wrongAlternatives: string[]
	rightAlternative: string
}
