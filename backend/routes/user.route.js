/**
 * se importan los diferentes modulos que servirian para definir las rutas de cada
 * controlador que servirian para realizar los diversos procesos de pedido y respuesta
 */
import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import {verifyAdmin, verifyToken} from "../middlewares/jwtMiddleware.js"
const router = Router()

router.post('/register',UserController.register)
router.post('/login', UserController.login)
router.post('/profile',verifyToken,UserController.profile)
// en la parte profile, primero haria una verificacion del token para seguir con el controlador
router.post('/reservar',UserController.reservar)
//  ruta del admin en donde el usuario administrador podra observar las reservas
router.get('/reservas',verifyToken, verifyAdmin, UserController.findAll)
export default router;