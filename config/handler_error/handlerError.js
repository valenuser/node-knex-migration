module.exports	= (err,req,res,next)=>{

    console.log(err);

    const status = err.status || 500
    const message = err.isOperational ? err.message : 'Internal Server Error'

    res.status(status).json({status:status,error:message})
    
}