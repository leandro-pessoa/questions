import UserController from '@/controllers/UserController.js'
import { loginRequired } from '@/middlewares/loginRequired.js'
import { Router } from 'express'

const router = Router()

const userController = new UserController()

// GET
router.get('/users', (req, res, next) => userController.index(req, res, next))
router.get('/users/:id', (req, res, next) => userController.show(req, res, next))

// POST
router.post('/users', (req, res, next) => userController.store(req, res, next))
router.post('/users/login', (req, res, next) => userController.login(req, res, next))

// PUT
router.put('/users', loginRequired, (req, res, next) => userController.userUpdate(req, res, next))

// DELETE
router.delete('/users', loginRequired, (req, res, next) => userController.userDelete(req, res, next))

export default router
