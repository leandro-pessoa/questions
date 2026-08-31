import { login } from "./testUsers"

const adminEmail = process.env.APP_ADMIN_EMAIL
const adminPassoword = process.env.APP_ADMIN_PASS

export const getAdminToken = async () => {
	return await login(adminEmail as string, adminPassoword as string)
		.then(res => res.body.token as string)
}
