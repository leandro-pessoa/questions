import { Router } from 'express'
import QuestionController from '@/controllers/QuestionController'
import { adminRequired } from '@/middlewares/adminRequired'

const router = Router()

const questionController = new QuestionController()

// GET
router.get('/questions', (req, res, next) => questionController.index(req, res, next))
router.get('/questions/:id', (req, res, next) => questionController.show(req, res, next))

// POST
router.post('/questions', adminRequired, (req, res, next) => questionController.store(req, res, next))

// PUT
router.put('/questions/:id', adminRequired, (req, res, next) => questionController.update(req, res, next))

// DELETE
router.delete('/questions/:id', adminRequired, (req, res, next) => questionController.delete(req, res, next))

export default router
