import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";
import Users from "./models/user.model.js";
import Workspace from "./models/workspace.model.js";

connectMongoDB()

// Users.insertOne({
//     name: 'pepe',
//     email: 'pepe@gmail.com',
//     password: 'pepe123',
// })

Workspace.insertOne({
    name: 'Test',
    url_image: 'test-value'
})