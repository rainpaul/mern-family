const mongoose = require('mongoose')

const goals = new mongoose.Schema({
    member:{  
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Members'
    },
    content:{
      type: String,
      required:[true,'Please add goal content']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Goals',goals)