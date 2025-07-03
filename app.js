require('module-alias/register');
const express = require('express');
const morgan = require("morgan")
const dotenv = require("dotenv").config()
const cors = require("cors")
const db = require('./db/knex')
const fs = require('node:fs')
const path = require('node:path')

const mainRouter = require('routes');

class App {

    constructor() {
        this.app = express()
        this.middlewares()
        this.setupMorgan()
        this.listen()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cors())
        this.app.use(mainRouter)
    }

    setupMorgan() {
        const logDirectory = path.join(__dirname, "logs")
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory)
        }

        const accessLogWriteStream = fs.createWriteStream(path.join(logDirectory, "access.log"),
            {
                flags: "a"
            }
        )

        this.app.use(morgan("combined", { stream: accessLogWriteStream }));
        this.app.use(morgan('dev'))
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    }

}

new App()