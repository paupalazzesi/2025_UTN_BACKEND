import Channel from "../models/user.model.js"
class ChannelRepository {

    static async createUser(name, workspace_id) {
        // logica de interaccion para crear channel
        await Channel.insertOne({
            name: name,
            workspace: workspace_id,
        })
        return true
    }

    static async getAll() {
        //.find es para buscar a todos los channels
        const Channels = await Channel.find()
        return Channels
    }

    static async getByID(channel_id) {
        await Users.findById(channel_id)
        return true
    }

    static async deleteByID(channel_id) {
        await Users.findByIdAndDelete(channel_id)
        return true
    }

    static async UpdateByID(channel_id, new_values) {
        await Users.findByIdAndUpdate(
            channel_id, 
            new_values, 
            {
                new: true
            }
            )
        return channel_updated
    }
}

export default ChannelRepository