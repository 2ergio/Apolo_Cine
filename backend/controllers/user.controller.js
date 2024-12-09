/*Los controllers son las acciones que realizara el servidor cuando se haga la peticion
, en cada controlador se definen las validaciones que son necesarias, para en base a ellas dar unas respuestas */

import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
/* importamos los demas modulos que estan en las otras carpetas, de aqui importamos bcrypt que seria para la encr
iptacion de las contraseñas,
-importamos jwt que seria un paquete que permite generar un token para la web
-importamos usermodel que serian los modelos o las peticiones que se realizarian en el servidor
*/
import { UserModel } from "../models/user.model.js";
import { error } from 'console';

// /api/v1/users/register
const register = async(req,res) =>{
    /*en el controller del registro se declararian las variables necesarias para enviar a la base
de datos, en este se harian las diferentes validaciones que daran su respectivo mensaje,
tambien con el paquete bcrypt para poder encriptar la contraseña que sera enviada a la base de datos */
    try{
        console.log(req.body)
        const {username,email,password,telefono,fecha_nacimiento} = req.body
        if(!username || !email || !password){
            return res.status(400).json({ok: false, msg: 'no'})
        }

        const user = await UserModel.findEmail(email)
        if(user){
            return res.status(409).json({ok: false, msg: 'Email ya existe'})
        }
        const salt = await bcryptjs.genSalt()
        const hashedpassword = await bcryptjs.hash(password,salt)
        const newUser = await UserModel.create(email,hashedpassword,username,telefono,fecha_nacimiento)
        const token = jwt.sign({
            email: newUser.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
        )
        
        return res.status(201).json({ok: true, msg: token})
    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error Servidor'
        })
    }
}
// /api/v1/users/login
/*  en el controller del login 
realizamos las diferentes validaciones y se declaran las diferentes variables necesarias para enviar
a la base de datos, aqui se generaria otro jwb
*/
const login = async(req,res) =>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res
            .status(400)
            .json({error: "requiere email y password"})
        

        }
        const user = await UserModel.findEmail(email)
        if(!user){
            return res.status(400).json({error: "usuario no encontrado"})
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({error: " contraseña invalida"})
        }
        const token = jwt.sign({
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
        
        )
        return res.status(200).json({ok: true, msg: token})

    }catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error Servidor'
        })
    }
}

// /api/v1/users/profile
/*en el controlador de profile se verificara el email,, y enviara la respuesta de el usuario
 */
const profile = async(req, res)=>{
    try{
        const user = await UserModel.findEmail(req.email)
        return res.json({ok: true, msg: user})
    } catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error servidor'
        })
    }
}

// /api/v1/users/reservar
/*en este controlador de reserva, se declararan las diferentes variables necesarias para enviarlas a la base de datos
se haran las respectivas validaciones que entregaran una respuesta  */
const reservar = async(req,res) =>{
    
    
    
    try{
        
        const {fecha,sillas,hora,id_pelicula,user_id,costo} = req.body

    
        
    if(!user_id || !fecha || !id_pelicula || !sillas || !hora ||!costo){
        return res.status(400).json({error: "Todos los campos son necesarios"})
        
    }
    const newReserva = await UserModel.reservar(fecha,sillas,hora,id_pelicula,user_id,costo)
    return res.status(201).json({ok: true, msg: newReserva})
}catch(error){
    console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error servidor'
        })

}
/* aqui se exportan para ser utilizadas en los diferentes archivos del backend */
}
export const UserController ={
    register,
    login,
    profile,
    reservar
}