const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    res.json({
        msg:err.msg
    })
}

module.exports = errorHandler