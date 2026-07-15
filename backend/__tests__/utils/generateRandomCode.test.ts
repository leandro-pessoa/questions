import { generateRandomCode } from '../../src/utils/generateRandomCode.ts'

describe('generateRandomCode test', () => {
	it('should return a six digit random code', async () => {
		const code = generateRandomCode(6)
		expect(code).toHaveLength(6)
	})
})
