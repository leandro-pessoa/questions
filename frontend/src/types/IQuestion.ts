export interface IQuestion {
	_id: string
	subject: string
	statement: string
	year?: number
	instituition?: string
	position?: string
	examiningBoard?: string
	wrongAlternatives: string[]
	rightAlternative: string
}
