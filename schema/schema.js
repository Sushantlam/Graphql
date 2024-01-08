const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull } = require("graphql");
const { User } = require("./sampleData");
const userModel = require("../models/client");

//Before mongo connect

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

// const query= new GraphQLObjectType({
//     name:"UserQuery",
//     fields:{
//         user:{
//            type: new GraphQLList(userTypeSchema),
//            resolve:()=> User
//         },
//         userId:{
//             type: userTypeSchema,
//             args: {id: {type: GraphQLID}},
//             resolve(parent,args){
//                 return User.find((item)=> item.id===args.id)
//             }
//         }
//     }
// })


//build a Schema  of Client 

const userSchema = new GraphQLObjectType({
    name:"Usertype",
    fields:{
        id:{type: GraphQLID},
        email: {type: GraphQLString},
        userName:{type: GraphQLString},
        phoneNumber:{type:GraphQLString}
    }
})

const query= new GraphQLObjectType({
    name:"UserQuery",
    fields:{
        user:{
           type: new GraphQLList(userSchema),
           resolve:()=> userModel.find({})
        },
        userId:{
            type: userSchema,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return User.find((item)=> item.id===args.id)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name:"mutation",
    fields:{
        addUser:{
            type: userSchema,
            args:{
                email:{type: new GraphQLNonNull(GraphQLString)},
                userName:{type:new GraphQLNonNull(GraphQLString)},
                phoneNumber:{type:new GraphQLNonNull(GraphQLString)}

            },
            resolve(parent,args){
                const Client= new userModel({
                    email: args.email,
                    userName: args.userName,
                    phoneNumber: args.phoneNumber
                })
                return Client.save()
            }
        }

    }

})




//afterMongoConnected

module.exports = new GraphQLSchema({
    query: query,
    mutation
})

