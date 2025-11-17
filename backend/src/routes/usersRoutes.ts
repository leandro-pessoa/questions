import UserController from '@/controllers/UserController'
import { adminRequired } from '@/middlewares/adminRequired'
import { loginRequired } from '@/middlewares/loginRequired'
import { Router } from 'express'

const router = Router()

const userController = new UserController()

// GET
router.get('/users', loginRequired, adminRequired, (req, res, next) => userController.index(req, res, next))
router.get('/users/:id', loginRequired, adminRequired, (req, res, next) => userController.show(req, res, next))

// POST
router.post('/users', (req, res, next) => userController.userStore(req, res, next))
router.post('/users/login', (req, res, next) => userController.login(req, res, next))

// PUT
router.put('/users', loginRequired, (req, res, next) => userController.userUpdate(req, res, next))
router.put('/users/:id', loginRequired, adminRequired, (req, res, next) => userController.update(req, res, next))

// DELETE
router.delete('/users', loginRequired, (req, res, next) => userController.userDelete(req, res, next))
router.delete('/users/:id', loginRequired, adminRequired, (req, res, next) => userController.delete(req, res, next))

export default router
