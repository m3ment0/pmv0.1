const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
//const PdfDocument = require('pdfkit');



app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.locals.datos = "";
app.locals.registros = "";

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require('./routes/routes'));
app.use("/login-administradores", require('./routes/routes'));
app.use("/login-pacientes", require('./routes/routes'));
app.use("/registro-paciente", require('./routes/routes'));
app.use("/editar-paciente", require('./routes/routes'));
app.use("/login-admin", require('./routes/routes'));
app.use("/principal", require('./routes/routes'));
app.use("/buscar-pacienteid", require('./routes/routes'));






app.listen(6500, () => {
    console.log('Servidor Activo' + __dirname);
});





module.exports = app;