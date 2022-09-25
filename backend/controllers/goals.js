const asyncHandler = require('express-async-handler')
const Goals = require('../models/goals')
const Members = require('../models/members')
const {BadRequestError,NotFoundError} = require('../errors/index')
const StatusCodes = require('http-status-codes')
const { query } = require('express')

const authorizedMember = asyncHandler(async(req,res) => {
    const goal = await Goals.findOne({member:req.member.id})
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    if(!req.member){
        res.status(400)
        throw new Error('User not found')
    }
    // console.log(goal)
    if(goal.member.toString()!==req.member.id){
        res.status(401)
        throw new Error('User not authorized')
    }
})

//@desc Get goals
//@route GET /api/v1/goals
//@access Private
const getGoals = asyncHandler(async(req,res) => {
    // authorizedMember(req,res)

    const goal = await Goals.findOne({member:req.member.id})
    if(!goal){
        res.status(StatusCodes.OK).json({goals:0,totalGoals:0,numOfPages:0})
        return
        // throw new Error('Goal not found')
    }
    if(!req.member){
        res.status(400)
        throw new Error('User not found')
    }
    // console.log(goal)
    if(goal.member.toString()!==req.member.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const{sort,search}  = req.query
    const queryObject = {
        member:req.member.id,
    }
    
    if(search){
        queryObject.content = {$regex:search,$options:'i'}
    }
    
    let result = Goals.find(queryObject)
    if(sort === 'latest'){
        result = result.sort('-createdAt')
    }
    if(sort === 'oldest'){
        result = result.sort('createdAt')
    }
    if(sort === 'a-z'){
        result = result.sort('content')
    }
    if(sort === 'z-a'){
        result = result.sort('-content')
    }

    //setup pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    
    const goals = await result
    // const goals = await Goals.find({member:req.member.id})
    const totalGoals = await Goals.countDocuments(queryObject)
    const numOfPages = Math.ceil(totalGoals / limit)

    res.status(StatusCodes.OK).json({
        goals:goals,totalGoals,numOfPages
    })
})

//@desc Create goals
//@route POST /api/v1/goals
//@access Private
const createGoal = asyncHandler(async(req,res) => {    
    authorizedMember(req,res)
    if(!req.body.content){
        res.status(400)
        throw new Error('Please add the note content')
    }
    const goal = await Goals.create({
        content:req.body.content,
        member: req.member.id
    })
    res.status(201).json(goal)
})

//@desc Edit goal
//@route PATCH /api/v1/goals/:id
//@access Private
const editGoal = asyncHandler(async(req,res) => {
    authorizedMember(req,res)
    const {id:goalId} = req.params
    const {content} = req.body
    if(!content){
        throw new BadRequestError('Please provide content')
    }
    const goal = await Goals.findOne({_id:goalId})
    if(!goal){
        throw new NotFoundError(`No goal with id:${goalId}`)
    }

    const updateGoal = await Goals.findOneAndUpdate({_id:goalId},req.body,{
        new:true,
        runValidators:true
    })

    res.status(StatusCodes.OK).json({updateGoal})
})

//@desc Delete goal
//@route DELETE /api/v1/goals/:id
//@access Private
const deleteGoal = asyncHandler(async(req,res) => {
    authorizedMember(req,res)
    const{id:goalId} = req.params
    const goal = await Goals.findOne({_id:goalId})
    if(!goal){
        throw new NotFoundError(`No goal with id:${goalId}`)
    }
    await Goals.findByIdAndDelete({_id:goalId})
    res.status(StatusCodes.OK).json({msg:'Success! Goal removed'})
    
})


module.exports = {getGoals,createGoal,editGoal,deleteGoal}