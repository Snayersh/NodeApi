const Estados = require("../models/modelEstados")

//nuevo estado
exports.nuevoEstado = async(req,res) =>{
    const {nombre}=req.body
    try {await Estados.create({nombre})
        res.status(201).json({mensaje:"Nuevo estado con exito"})
    } catch (error) {
        res.status(500).json({error:"Error al crear un nuevo estado"})        
    }
}
//todos los estados
exports.obtenerestados = async(req,res)=>{
    try {
        const estados = await Estados.findAll()
        res.status(200).json({estados})
    } catch (error) {
        res.status(500).json({error:"Error al obtener todos los estados"})
        
    }
}
//Actualizar estados
exports.actualizarestados = async(req,res)=>
{
    const {id}=req.params
    try{
        const estados = await Estados.findOne({where:{idestados:id}})
        if(!estados){
            return res.status(400).json({mensake:"Estado no encontraod"})
        }
        if(nombre)estados.nombre = nombre
        await estados.save()
    res.status(200).json({mensaje:"Estado actualizado correctamente"})
    }catch(error){res.status(500).json({error:"Error al actualizar el estado"})}
}
