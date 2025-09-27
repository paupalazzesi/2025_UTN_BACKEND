import express from 'express'
import connectMongoDB from "./config/mongoDB.config.js";
import workspace_router from "./routes/workspace.route.js";
import auth_router from "./routes/auth.route.js";



connectMongoDB()

const app = express()
app.use(express.json())

app.use('/api/workspace', workspace_router)
app.use('/api/auth', auth_router)

app.listen(
    8080, 
    () => {
        console.log("Esto esta funcionado en el puerto 8080")
    }
)




