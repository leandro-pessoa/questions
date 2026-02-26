import MailController from '@/controllers/MailController'
import { Router } from 'express'

const router = Router()

const mailController = new MailController()

// POST
router.post('/sendChangePasswordCode', (req, res, next) => mailController.sendChangePasswordCode(req, res, next))
router.post('/confirmPasswordCode', (req, res, next) => mailController.confirmPasswordCode(req, res, next))

export default router
