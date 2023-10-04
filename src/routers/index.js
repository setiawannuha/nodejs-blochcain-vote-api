const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const candidateController = require('../controllers/candidate.controller')
const userController = require('../controllers/user.controller')
const voteController = require('../controllers/vote.controller')
const {auth, isAdmin, isUser} = require("../middlewares/auth")
const {parser} = require("../middlewares/multer")

router.post('/api/login', authController.login)

router.get('/api/user', auth, isAdmin, userController.all)
router.post('/api/user', auth, isAdmin, userController.insert)
router.put('/api/user/:id', auth, isAdmin, userController.update)
router.delete('/api/user/:id', auth, isAdmin, userController.destroy)

router.get('/api/candidate', auth, isAdmin, candidateController.all)
router.post('/api/candidate', auth, isAdmin, parser.single('picture'), candidateController.insert)
router.put('/api/candidate/:id', auth, isAdmin, parser.single('picture'), candidateController.update)
router.delete('/api/candidate/:id', auth, isAdmin, candidateController.destroy)

router.get('/api/vote/:voteid', auth, isUser, voteController.get)
router.post('/api/vote/:voteid', auth, isUser, voteController.create)
router.post('/api/vote', auth, isUser, voteController.vote)

module.exports = router