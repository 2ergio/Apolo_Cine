/*  se importa el paquete {jsonwebtoken} 
en esta parte MIDLEWARE, se hara la respectiva validacion del jsonwebtoken, que entregaran
una respuesta dependiendo si existe el token o no */
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) =>{
    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({error: "token not provided"})
    }
    token = token.split(" ")[1]
    try{
        const {email,rol_id} = jwt.verify(token, process.env.JWT_SECRET)
        req.email = email
        req.rol_id = rol_id
        next()
    } catch (error){
        console.log(error)
        return res.status(400).json({error: "invalid Token"})
    }

}
/**
 * funcion que verificara si el usuario tiene el rol admin, si lo tiene sigue a la otra funcion, de lo contrario el
 * otro usuario no podran realiar la peticion
 */
export const verifyAdmin = (req, res, next) =>{
    if(req.rol_id === 1){
        return next()
    }
    return res.status(403).json({error: "No puedes hacer eso"})
    
}


export const verifyuser = (req, res, next)=>{
    if(req.rol_id === 2 || req.rol_id === 1){
        return next()
    }

    return res.status(403).json({error: "no puedes hacer eso"})

}