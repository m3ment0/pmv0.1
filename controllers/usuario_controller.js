const conexion = require('../database/conexion');



exports.mostrar = async (req, res) => {
    conexion.query('SELECT * FROM usuario', (error, results) => {
        if (error) {
            throw error;

        }
        res.render('principal', { registros: results });

    });
}

exports.registro = async (req, res) => {
    const { nombres, documento, telefono, correo, contraseña } = req.body;

    if (!nombres || !documento || !telefono || !correo || !contraseña) {

        res.render('registro-paciente', {
            alert: true,
            alertTitle: "Error!",
            alertMessage: "Campos vacios!",
            alertIcon: 'warning',
            showConfirmButton: false,
            timer: 1500,
            ruta: 'registro-paciente'
        })

    } else {

        try {
            const { nombres, documento, telefono, correo, contraseña } = req.body;

            let passwordHaash = await bcryptjs.hash(contraseña, 8);

            conexion.query('INSERT INTO paciente SET ?', {
                nombres: nombres, num_documento: documento, telefono: telefono, correo: correo,
                contraseña: passwordHaash
            }, (error, results) => {

                if (error) {
                    console.log(error);

                }
                else {
                    res.render('registro-paciente', {
                        alert: true,
                        alertTitle: "Registro Exitoso!",
                        alertMessage: "!Usuario Registrado",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''

                    })



                }



            })

        } catch (error) {
            console.log(error);
        }

    }

}

exports.consultarParametro = async (req, res) => {
    const { id } = req.params;
    try {
        conexion.query(`SELECT * FROM paciente WHERE id_paciente = ?`, [id],
            (error, resultados) => {
                if (error) {
                    res.status(400).send(error);
                }
                res.render('actualizar-paciente', { datos: resultados[0] });
            });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


exports.actualizar = (req, res) => {
    const id = req.params.id_paciente;


    console.log('Algo ' + id)

    //res.redirect('/')

}

exports.eliminar = async (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM paciente WHERE id_paciente = ?', [id], (error, resultados) => {
        if (error) {
            throw error;
        }
        res.redirect('principal');

    })

}

exports.loginAdmin = async (req, res) => {
    const { correo, contraseña, selecrol } = req.body;

    console.log('Datos capturados: ' + correo + contraseña + selecrol)

    if (correo && contraseña && selecrol) {

        conexion.query('SELECT * FROM usuario WHERE correo = ? AND contraseña = ? AND rol = ?', [correo, contraseña, selecrol], function (error, results) {


            if (results.length > 0) {

                res.render('login-administradores', {
                    alert: true,
                    alertTitle: "Ingreso Exitoso!",
                    alertMessage: "Credenciales Correctas!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: "principal"
                })

            } else {

                res.render('login-administradores', {
                    alert: true,
                    alertTitle: "Error!",
                    alertMessage: "Credenciales Incorrectas!",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: "login-administradores"

                }) 
            }
        });
    } else {

        res.render('login-administradores', {
            alert: true,
            alertTitle: "Error!",
            alertMessage: "Campos Vacios!",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: 1500,
            ruta: "login-administradores"

        })
    }
}


/*

exports.loginAdmin = async (req, res) => {
    const { correo, contraseña, selecrol } = req.body;

    console.log('Datos capturados: ' + correo + contraseña + selecrol)
    if (correo && contraseña) {

        conexion.query('SELECT * FROM usuario WHERE correo = ? AND contraseña = ? AND rol = ?', [correo, contraseña, selecrol], function (error, results) {

            if (error) throw error;

            if (results.length > 0) {
                res.redirect('principal');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
}
*/ 