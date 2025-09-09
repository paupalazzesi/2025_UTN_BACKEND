import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongoDB.config.js";
import Users from "./models/user.model.js";
import Workspace from "./models/workspace.model.js";

connectMongoDB()


// you can call functions to insertOne object only when calls function. 
function createUser(name, email, password) {
    Users.insertOne({
        name: name,
        email: email,
        password: password,
    })
}
function createWorkspace(name, url_image) {
    Workspace.insertOne({
        name: name,
        url_image: url_image
    })
}
