/* aca se importaria la db from database/conexionDb que seria la conexion a la base de datos */
import {db} from '../database/conexionDb.js'
const create = async (email, password, username,telefono,fecha_nacimiento) =>{
    /**
     * este modelo create, realizaria el proceso de insertar los valores a la base de datos
     */
    console.log("Valores enviados a la base de datos:", { email, password, username,telefono,fecha_nacimiento });
    const query ={
        
        text: `
        INSERT INTO users (email, password, username, telefono, fecha_nacimiento)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING email, username, id, rol_id
        `,
        values: [email,password,username,telefono,fecha_nacimiento]
    }
    const {rows} = await db.query(query)
    return rows

}
const reservar = async(fecha,sillas,hora, id_pelicula, user_id,costo,id_sala) =>{
    /**
     * este model serviria para poder reservar la fecha en la sala de cine
     */
    console.log('reserva enviada a la base de datos',{fecha,sillas,hora,id_pelicula,user_id,costo,id_sala});
    const query ={
        text:`
        INSERT INTO reservas(fecha,sillas,hora,id_pelicula,user_id,costo,id_sala) values($1,$2,$3,$4,$5,$6,$7)
        RETURNING fecha,sillas,hora,id_pelicula,user_id,costo,id_sala,id`,
        values: [fecha,sillas,hora,id_pelicula,user_id,costo,id_sala]
    }
    const {rows} = await db.query(query)
    return rows
} 

const findEmail = async(email) =>{
    /**
     * aca se crearia el model de buscar por email que serviria para sacar la informacion de cierto
     * usuario mediante su email
     */
    const query ={
        text: `SELECT * FROM users where email = $1`,
        values: [email]
    }
    const {rows} = await db.query(query)
    return rows[0]
}
/**
 * esta lo que hara es devolver la informacion de la consulta
 */
const findAll = async() =>{
    const query ={
        text: `
        SELECT 
        reservas.id,
        users.username,
        peliculas.nombre AS pelicula_nombre,
        salas.nombre AS sala_nombre,  
        reservas.fecha,
        reservas.sillas,
        reservas.costo,
        reservas.hora
        FROM
        reservas
INNER JOIN peliculas ON reservas.id_pelicula = peliculas.id
INNER JOIN salas ON peliculas.id_sala = salas.id  
INNER JOIN users ON reservas.user_id = users.id
ORDER BY reservas.id DESC;
        `
    }
    const {rows} = await db.query(query)
    return rows

}
// esta funcion validara si en el caso de que un usuario ingrese una silla que ya este reservada
//en la misma fecha,pelicula y hora, le duvuelva una columna, si es el caso le mostrara un error
const validarSillas = async (id_pelicula, fecha, hora, sillas) => {
    return await db.query(
        `SELECT * FROM reservas 
         WHERE id_pelicula = $1 AND fecha = $2 AND hora = $3 AND $4::text[] && sillas;`,
        [id_pelicula, fecha, hora, sillas]
    );
};

/**
 * aca se exportarian los diferentes modelos para utilizarlos en diferentes partes del proyecto
 */
export const UserModel ={
    create,
    findEmail,
    reservar,
    findAll,
    validarSillas
}
