import UserController from '@/controllers/UserController.js'
import { Router } from 'express'

const router = Router()

const userController = new UserController()

// GET
router.get('/users', (req, res, next) => userController.index(req, res, next))
router.get('/users/:id', (req, res, next) => userController.show(req, res, next))

// POST
router.post('/users', (req, res, next) => userController.store(req, res, next))

// PUT
router.put('/users/:id', (req, res, next) => userController.update(req, res, next))

// DELETE
router.delete('/users/:id', (req, res, next) => userController.delete(req, res, next))

export default router
