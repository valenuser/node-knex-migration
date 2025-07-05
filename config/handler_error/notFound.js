const AppError = require("./AppError")

const notFound =(req,res,next)=>{
    console.log(req)
    const error = new AppError(`Ruta ${req.url} no encontrada o el metodo ${req.method} no esta disponible para esta ruta `,404)
    next(error)
}

module.exports = notFound