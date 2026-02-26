import express from 'express'
import WorkspaceController from '../controllers/workspace.controller.js';

// aca estamos creando un enrutador de express
const workspace_router = express.Router()

// GETALL
workspace_router.getAll('/', WorkspaceController.getAll)

// GETbyID
workspace_router.getById('/:workspace_id', WorkspaceController.getById)

// Endpoint para crear workspaces
workspace_router.post('/', WorkspaceController.post)

export default workspace_router