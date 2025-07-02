require('module-alias/register');
const express = require('express');
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const mainRouter = require('routes'); 
const db = require('./db/knex')

class App {

    constructor(){
        this.app = express()
        this.middlewares()
        this.listen()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(morgan('dev'))
        this.app.use(cors())
        dotenv.config({path:'.env'})
        this.app.use(mainRouter)
    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    }

}

new App()