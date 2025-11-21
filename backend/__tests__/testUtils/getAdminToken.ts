import { login } from "./testUsers"

const adminEmail = process.env.ADMIN_EMAIL
const adminPassoword = process.env.ADMIN_PASSWORD

export const getAdminToken = async () => {
	return await login(adminEmail as string, adminPassoword as string)
		.then(res => res.body.token as string)
}
