const express = require('express');
const router = express.Router();
const conexion = require('../database/conexion');
const controller_paciente = require('../controllers/paciente_controller');
const controller_usuario = require('../controllers/usuario_controller');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/principal', (req, res) => {

    res.render('principal');
});


router.get('/login-administradores', (req, res) => {
    res.render('login-administradores');
});




/*Rutas Pacientes*/

router.get('/login-pacientes', (req, res) => {
    res.render('login-pacientes');
});

router.get('/registro-paciente', (req, res) => {
    res.render('registro-paciente');
});

router.get('/actualizar-paciente', (req, res) => {
    res.render('actualizar-paciente');
});

router.get('/tabla', (req, res) => {
    res.render('prueba')
});

/*
router.get('/tabla-principal', (req, res) => {
    res.render('principalTabla')
});
*/



router.get('/carta', controller_paciente.mostrarcard);

router.get('/mostrar-pacientes', controller_paciente.mostrar);

router.get('/parametro-paciente/:id_paciente', controller_paciente.consultarParametro);

router.get('/cargar-paciente/:id', controller_paciente.consultarParametro);

router.get('/cargar-pacienteid/:id', controller_paciente.consultarPaciente);

router.post('/buscar-paciente', controller_paciente.consultarPacienteid);

/*Generar Pdf*/

router.get('/reporte-paciente', controller_paciente.crearReporte);


/*Rutas Pacientes y Controladores*/
router.post('/registro', controller_paciente.registro);

router.post('/login', controller_paciente.login)

router.post('/login-admin', controller_usuario.loginAdmin)

router.post("/editar-paciente", controller_paciente.actualizar);

router.get('/eliminar-paciente/:id', controller_paciente.eliminar);



module.exports = router;