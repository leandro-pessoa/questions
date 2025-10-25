import type { IUser } from '@/types/IUser.js'
import CRUDServices from './CRUDServices.js'
import User from '@/db/models/User.js'

export class UserService extends CRUDServices<IUser> {
	constructor() {
		super(User)
	}
}
