const { Router } = require('express');
const router = Router();
const ControladorSabritas = require('../controlador/ControladorSabritas');

router.get('/',ControladorSabritas.indexS )
       .post('/',ControladorSabritas.agregarS)
       .get('/:key/:value',ControladorSabritas.buscarS,ControladorSabritas.mostrarS)
       .put('/:key/:value',ControladorSabritas.buscarS,ControladorSabritas.actualizarS)
       .delete('/:key/:value',ControladorSabritas.buscarS,ControladorSabritas.eliminarS);

module.exports=router;