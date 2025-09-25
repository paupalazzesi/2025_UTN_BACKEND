import Users from "../models/user.model.js"
class UserRepository {

    static async createUser(name, email, password) {
        // logica de interaccion para crear usuario
        await Users.insertOne({
            name: name,
            email: email,
            password: password,
        })
        return true
    }

    static async getAll() {
        //.find es para buscar a todos
        const users = await Users.find()
        return users
    }

    static async getByID(user_id) {
       const user_found = await Users.findById(user_id)
       return user_found;
    }

    static async deleteByID(user_id) {
        await Users.findByIdAndDelete(user_id)
        return true
    }

    static async UpdateByID(user_id, new_values) {
        await Users.findByIdAndUpdate(
            user_id, 
            new_values, 
            {
                new: true
            }
            )
        return user_updated
    }

    static async getByEmail (email) {
        const userFound = await Users.findOne({email: email})
        return userFound
    }
}

export default UserRepository