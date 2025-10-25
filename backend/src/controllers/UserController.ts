import { UserService } from '@/services/UserService.js'
import Controller from './Controller.js'
import type { IUser } from '@/types/IUser.js'

const userService = new UserService()

export default class UserController extends Controller<IUser> {
	constructor() {
		super(userService)
	}
}
