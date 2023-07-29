const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'siempre7',
  database: 'formulario',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error en la conexion con base datos:', err);
    return;
  }
  console.log('La conexion funciona!');
});

// Configurar el servidor para manejar datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para recibir los datos del formulario y guardarlos en la base de datos
app.post('/guardar-formulario', (req, res) => {
  const { ID, nombreapellido, correoelectronico, telefono, mensaje, FECHA } = req.body;

  const query = 'INSERT INTO datos(ID, nombreapellido, correoelectronico, telefono, mensaje, FECHA) VALUES (? ,? ,? , ?, ?, ?)';
  connection.query(query, [ID, nombreapellido, correoelectronico, telefono, mensaje, FECHA], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data into database' });
    } else {
      res.json({ message: 'Data inserted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

