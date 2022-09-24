const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Members = require('../models/members')
const asyncHandler = require('express-async-handler')
const {UnAuthenticatedError, BadRequestError} = require('../errors/index')
const StatusCodes = require('http-status-codes')

//@desc Register new member
//@route POST /api/v1/members/
//@access Public
const RegisterMember = asyncHandler(async(req,res) => {
    
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(404)
        throw new Error('Please fill in all fields')
    }
    //Check if member exists
    const memberExist = await Members.findOne({email})
    if(memberExist){
        res.status(400)
        throw new Error('User already exists')
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const member = await Members.create({
        name,
        email,
        password: hashedPassword
    })
    if(member){
        res.status(200).json({
            _id:member.id,
            user:{
                name:member.name,
                email:member.email,
            },
            token:generateToken(member._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }    
})

//@desc Login
//@route POST /api/v1/members/login
//@access Public
const Login = asyncHandler(async(req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        res.status(404)
        throw new Error('Please fill in both email and password')
    }

    //Check if email exist
    const member = await Members.findOne({email})
    if(member && await bcrypt.compare(password,member.password)){
       res.json({
        _id:member.id,
        user:{
            name:member.name,
        email: member.email,
        dob:member.dob
        },
        token: generateToken(member._id)
       })     
    } else{
        res.status(401).json({msg:'Invalid credential'})
        
    }
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.EXPIRE_DATE
    })
}


const getAllMembers = asyncHandler(async(req,res) => {
    const allMembers = await Members.find({})
    res.status(200).json(allMembers)
})

//@desc Update member
//@route PATCH /api/v1/members/:id
//@access Private
const updateMember = asyncHandler(async(req,res) => {
    const {email,name,dob} = req.body
    // console.log('email' + email)
    if(!email || !name || !dob){
        throw new BadRequestError('Please provide all values')
    }
    const{id:memberId} = req.params
    const member = await Members.findById({_id:memberId})
    
    member.email = email
    member.name = name
    member.dob = dob
    
    await member.save()
    const token = generateToken(member._id)
    res.status(StatusCodes.OK).json({member,token})
})

module.exports = {getAllMembers,
RegisterMember,
Login,
updateMember}