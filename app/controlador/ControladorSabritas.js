const modeloSabritas = require('../modelo/ModeloSabritas')

function indexS(req,res) {
    console.log('ok');
    modeloSabritas.find({})
    .then(sabritas => {
        if(sabritas.length) return res.status(200).send({sabritas});
        return res.status(204).send({message:'No hay contenido'});
    }).catch(error => res.status(500).send({error}));
}

function agregarS(req,res) {
    console.log(req.body);
    new modeloSabritas(req.body).save()
    .then(sabritas => {
        res.status(200).send({sabritas})
    }).catch(error => res.status(500).send({error, message: "Codigo duplicado"}));
}

function buscarS(req,res,next) {
    let consulta ={};
    consulta[req.params.key]=req.params.value;
    modeloSabritas.find(consulta).then(sabritas =>{
        if(!sabritas.length) return next();
        req.body.sabritas= sabritas;
        return next();
        
    }).catch(error => {
        req.body.error=error;
        next();
    })
}

function mostrarS(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.sabritas) return res.status(404).send({message: 'No hay datos que mostrar'});
    let sabritasObj = req.body.sabritas;
    return res.status(200).send({sabritasObj});
    
}

function actualizarS(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.sabritas) return res.status(404).send({message: 'No hay datos para actualizar'});
    let sabritasObjeto = req.body.sabritas[0];
    sabritasObjeto=Object.assign(sabritasObjeto,req.body);
    sabritasObjeto.save().then(sabritasAlta => {
        res.status(200).send({message: 'Los datos se actalizaron correctamente',sabritasAlta});
    }).catch(error => res.status(500).send({error}));
}

function eliminarS(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.sabritas) return res.status(404).send({message: 'No hay datos para eliminar'});
    req.body.sabritas[0].remove().then(sabritasEliminar =>{
        res.status(200).send({message: 'La informacion se elimino correctamente', sabritasEliminar})
    }).catch(error => res.status(500).send({error}));
}

module.exports={
    indexS,
    agregarS,
    buscarS,
    mostrarS,
    actualizarS,
    eliminarS
}