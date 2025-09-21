import WorkspacesRepository from '../repositories/workspace.repository.js';
import { ServerError } from '../utils/customError.utils.js'
import { validarId } from '../utils/validations.utils.js'

class WorkspaceController {

    static async getAll(request, response) {
        try {
            const workspaces = await WorkspacesRepository.getAll()
            response.json(
                {
                    status: 'OK',
                    message: 'Lista de espacios de trabajo obtenida correctamente',
                    data: {
                        workspaces: workspaces
                    }
                }
            )           

        } catch(error) {
            console.log(error)
            return response.status(500).json(
                {
                    ok: false,
                    status: 500,
                    message: 'Error interno del servidor'
                }
            )
        } 
    }

    static async getById(request, response) {
        try {
            
            const workspace_id = request.params.workspace_id

            if (validarId(workspace_id)) {
                const workspace = await WorkspacesRepository.getById(workspace_id)

                if (!workspace) {                
                    throw ServerError(
                    400,
                    `Workspace con id ${workspace_id} no encontrado`
                ) 
                }
                else {
                    return response.json(
                        {
                            ok: true,
                            message: `Workspace con id ${workspace._id} obtenido`,
                            data: {
                                workspace: workspace
                            }
                        }
                    )
                }
            }
            else {
                throw ServerError(
                    400,
                    'workspace_id debe ser un id valido'
                )            
            }

        } catch(error) {
            console.log(error)
            return response.status(500).json(
                {
                    ok: false,
                    status: 500,
                    message: 'Error interno del servidor'
                }
            )
        } 
    }

    static async post(request, response) {
         try{
            const name = request.body.name
            const url_img = request.url_img

            if(!name || typeof(name) !== 'string' || name.length > 30){            
                throw ServerError(
                    400,
                    "el campo 'name' debe ser un string de menos de 30 caracteres"
                )
            }
            else if(!url_img || typeof(url_img) !== 'string' ){           
                throw ServerError(
                    400,
                    "el campo 'name' debe ser un string de menos de 30 caracteres"
                )
            }
            else{
                await WorkspacesRepository.createWorkspace(name, url_img)

                return response.status(201).json({
                    ok: true,
                    status: 201,
                    message: 'Workspace creado con exito'
                })
            }
        }
        catch(error){
            console.log(error) // para saber que fallo
            return response.status(500).json(
                {
                    ok: false,
                    status: 500,
                    message: 'Error interno del servidor'
                }
            )
        }
    }  
}

export default WorkspaceController