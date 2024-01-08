const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } = require("graphql");
const { User } = require("./sampleData");



//1st create the schema of anything you have
const userTypeSchema = new GraphQLObjectType({
    name: "User",
    fields:{
        id: {type: GraphQLID},
        body: {type:GraphQLString},
        userName: {type: GraphQLString}
    }
})



//query banaune just like controller banako

const query= new GraphQLObjectType({
    name:"UserQuery",
    fields:{
        user:{
           type: new GraphQLList(userTypeSchema),
           resolve:()=> User
        },
        userId:{
            type: userTypeSchema,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return User.find((item)=> item.id===args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: query
})

