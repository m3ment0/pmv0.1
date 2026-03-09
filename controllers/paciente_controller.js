const PDF = require('pdfkit-construct');
const conexion = require('../database/conexion');





exports.mostrarcard = async (req, res) => {

    conexion.query('SELECT * FROM paciente', (error, results) => {
        if (error) {
            throw error;

        }
        res.render('principalTabla', { registro: results });

    });
}





exports.mostrar = async (req, res) => {

    conexion.query('SELECT * FROM paciente', (error, results) => {
        if (error) {
            throw error;

        }
        res.render('tabla-paciente', { registros: results });

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

            conexion.query('INSERT INTO paciente SET ?', {
                nombres: nombres, num_documento: documento, telefono: telefono, correo: correo,
                contraseña: contraseña
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

exports.consultarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        conexion.query(`SELECT * FROM paciente WHERE id_paciente = ?`, [id],
            (error, resultados) => {
                if (error) {
                    res.status(400).send(error);
                }
                res.render({ registros: resultados[0] });
            });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.consultarPacienteid = async (req, res) => {


    const entrada = req.body.entrada;
    const entradaid = req.body.entradaid;

    try {
        conexion.query(`SELECT * FROM paciente WHERE nombres LIKE '%${entrada}%'  AND id_paciente LIKE '%${entradaid}%'  `, [entradaid, entrada],
            (error, resultados) => {
                if (error) {
                    res.status(400).send(error);
                }

                res.render('tabla-paciente', { registros: resultados });

            });
    } catch (error) {
        res.status(500).send(error.message);

    }
}


exports.actualizar = (req, res) => {
    const { id } = req.body;
    const { nombres, documento, telefono, correo, contraseña } = req.body;

    //console.log('Hay: ' , JSON.stringify(id)+nombres);

    conexion.query('UPDATE  paciente SET ? WHERE id_paciente = ?',
        [{ nombres: nombres, num_documento: documento, telefono: telefono, correo: correo, contraseña: contraseña }, id], (error, resultados) => {
            if (error) {
                throw error;

            } else {

                res.render('actualizar-paciente',
                    {
                        alert: true,
                        alertTitle: "Edicion Exitosa!",
                        alertMessage: "!Paciente Actualizado!",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1800,
                        ruta: ''
                    })
            }
        })
}

exports.eliminar = async (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM paciente WHERE id_paciente = ?', [id], (error, resultados) => {
        if (error) { throw error; }


        else {

            res.render('actualizar-paciente',
                {
                    alert: true,
                    alertTitle: "Eliminacion Exitosa!",
                    alertMessage: "!Paciente Eliminado!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1800,
                    ruta: ''
                })
        }

    })

}


exports.login = async (req, res) => {

    //console.log(correo + contraseña)//Datos capturados

    try {

        const { correo, contraseña } = req.body;

        //console.log('Datos capturados: ' + correo + contraseña)
        if (correo && contraseña) {

            conexion.query('SELECT * FROM paciente WHERE correo = ? AND contraseña = ? ', [correo, contraseña], function (error, results) {

                if (error) throw error;

                if (results.length > 0) {

                    res.render('login-pacientes', {
                        alert: true,
                        alertTitle: "Ingreso Exitoso!",
                        alertMessage: "Credenciales Correctas!",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: "principal"
                    })




                } else {

                    res.render('login-pacientes', {
                        alert: true,
                        alertTitle: "Error!",
                        alertMessage: "Credenciales Inorrectas!",
                        alertIcon: "error",
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: "login-pacientes"

                    })

                    console.log('Incorrect Username and/or Password!');
                }

            });
        } else {

            res.render('login-pacientes', {
                alert: true,
                alertTitle: "Error!",
                alertMessage: "Campos Vacios!",
                alertIcon: "warning",
                showConfirmButton: true,
                timer: 1500,
                ruta: "login-pacientes"

            })

            //console.log('Please enter Username and Password!');

        }





    } catch (error) {
        console.log(error)
    }
}

/*Pdf*/
exports.crearReporte = async (req, res) => {

    const doc = new PDF({ bufferPage: true }, { size: 'A4' });
    const filename = `datospacientes${Date.now()}.pdf`;

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${filename}`

    });

    doc.on('data', (data) => { stream.write(data) });
    doc.on('end', () => { stream.end() })

    doc.setDocumentHeader(

        {
            height: '12%',

        }, () => {

            doc.lineJoin('miter')
                .rect(0, 0, doc.page.width, doc.header.options.heightNumber).fill("#2986CC");

            doc.fill("#ffffff").fontSize(20)
                .text('PACIENTES', 55, 50, {
                    width: 450,
                    fontSize: 5,
                    align: 'center'
                }

                );
        });

    doc.setDocumentFooter(

        {//height: '5%' 

        }, () => {

            doc.lineJoin('miter')
                .rect(0, 710, doc.page.width, 80).fill("#c2edbe");

            doc.fill("#7416c8")
                .fontSize(8)
                .text("© 2025 OdontoSoft", 250, 710);

        });
    conexion.query('SELECT * FROM paciente', function (error, results) {
        if (error) throw error;

        const registros = results.map(o => {

            const registro = {
                id: o.id_paciente,
                nombres: o.nombres,
                num_Documento: o.num_documento,
                telefono: o.telefono,
                correo: o.correo

            }

            return registro;

        });

        doc.addTable(
            [
                { key: 'id', label: 'Id', align: 'left' },
                { key: 'nombres', label: 'nombres', align: 'left' },
                { key: 'num_Documento', label: 'Num Documento', align: 'left' },
                { key: 'telefono', label: 'Telefono', align: 'left' },
                { key: 'correo', label: 'Correo', align: 'right' }
            ],
            registros, {
            border: null,
            width: "fill_body",
            striped: true,
            stripedColors: ["#f6f6f6", "#d6c4dd"],
            cellsPadding: 5,
            cellsAlign: 'center',
            marginLeft: 45,
            marginRight: 45,

            headAlign: 'center',
            headBackground: '#4346eb',
            headColor: '#ffffff'

        });

        doc.render();
        doc.end();

    });

}



