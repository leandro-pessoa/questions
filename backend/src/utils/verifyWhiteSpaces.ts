// util para validar se há espaços vazios antes ou após uma string em um campo do banco de dados
// recebe o nome do campo como parâmetro para exibir na mensagem
export const verifyWhiteSpaces = (fieldName: string) => {
	const regexp = /^[^\s]+(?:$|.*[^\s]+$)/

	return {
		validator: (value: string) => {
			return regexp.test(value)
		},
		message: `Espaços vazios inválidos no campo ${fieldName}`,
	}
}
