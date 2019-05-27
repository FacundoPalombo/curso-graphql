'use strict'
const { graphql, buildSchema } = require('graphql')

// definiendo el esquema
const schema = buildSchema(`
    type Query {
        hello: String,
        saludo: String
    }
`)

//configurar los resolvers
const resolvers = {
    hello: ()=> {
        return 'Hello world!'
    },
    saludo: ()=> {
        return 'Hello everyone!'
    }
}

//Ejecutar el query hello
graphql(schema, '{hello, saludo}', resolvers).then((data)=> {
    console.log(data)
})