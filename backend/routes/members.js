const express = require('express')
const router = express.Router()
const {getAllMembers,RegisterMember,Login,updateMember} = require('../controllers/members')

router.get('/',getAllMembers)
router.post('/register',RegisterMember).post('/login',Login).patch('/:id',updateMember)

module.exports = router