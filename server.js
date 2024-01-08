const express = require( "express")
const { graphqlHTTP } = require("express-graphql")
const app = express()
const port = process.env.PORT || 5000
const schema = require("./schema/schema")
const dotenv = require("dotenv")
const mongoConnect = require("./config/db")
dotenv.config()


mongoConnect()

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(port, console.log(`Hello Port ${port}`))