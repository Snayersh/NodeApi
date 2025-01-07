const Estados = require("../models/modelEstados")
const sequelize = require("../config/database")


//nuevo estado
exports.nuevoEstado = async(req,res) =>{
    const {nombre}=req.body
    try {
        await sequelize.query(
            `exec p_insertarestados @nombre = :nombre`,
            { replacements: { nombre }, type: sequelize.QueryTypes.INSERT }
          );
        res.status(201).json({mensaje:"Nuevo estado con exito"})
    } catch (error) {
        res.status(500).json({error:"Error al crear un nuevo estado"})        
    }
}
//todos los estados
exports.obtenerestados = async(req,res)=>{
    try {
        const estados = await Estados.findAll()
        res.status(200).json(estados)
    } catch (error) {
        res.status(500).json({error:"Error al obtener todos los estados"})
        
    }
}
//Actualizar estados
exports.actualizarestados = async (req, res) => {
    const { id } = req.params;
    const {nombre} = req.body
    try {
      const [estados] = await sequelize.query(
         ` exec p_actualizarestaods @idestados = :idestados,
          @nombre = :nombre       `,
        { replacements: { idestados:id,nombre },type: sequelize.QueryTypes.UPDATE,
      }
      );
      if (!estados) {
        return res.status(400).json({ mensaje: "Estado no encontrado" });
      }
      res.status(200).json({ mensaje: "Estado actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el estado" });
    }
  };
