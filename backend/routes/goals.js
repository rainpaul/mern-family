const express = require('express')
const router = express.Router()
const {getGoals,createGoal,editGoal,deleteGoal} = require('../controllers/goals')
const protect = require('../middleware/auth')

router.get('/',protect,getGoals)
router.post('/',protect,createGoal)
router.patch('/:id',protect,editGoal)
router.delete('/:id',protect,deleteGoal)

module.exports = router