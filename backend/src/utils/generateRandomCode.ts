// retorna um código aleatório com a quantidade de dígitos informada no parâmetro
export const generateRandomCode = (length: number) => {
	return (Math.random() * 1000000000000000).toFixed(0).substring(0, length)
}
