 if (process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

//const app = require("http").createServer((req, res) => res.sendDate("Hola"));
 
const { Pool } = require('pg');

const express = require('express');
const app = express();

// Importando librería
const jwt = require("jsonwebtoken");


app.use(express.urlencoded({extended: false}));
app.use(express.json());
//const app = require('express')();

//Usará el puerto definido en el archivo de
//variables de entorno o en el puerto 3000

const PORT = process.env.PORT || 3000; 

console.log(process.env.TOKEN);
console.log(process.env.NODE_ENV);
console.log(process.env.USUARIO);
console.log(process.env.DB);




app.listen(PORT, () => {
    console.log(`Servidor está escuchando en puerto ${PORT}`)
})


const config = {
  user: process.env.USUARIO,
  host: process.env.URL_SERVIDOR,
  database: process.env.DB,
  password: process.env.CLAVE,
  port: process.env.PUERTO, // El puerto por defecto es 5432
};

/* const pool = new Pool(config);

pool.query('SELECT * FROM usuarios', (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log(result.rows);
  }
}); */

app.get('/', (req, res) => {
    res.send(`<html>
                <head>
                    <title>Login</title>
                </head>
                <body>
                    <form method="POST" action="/auth">
                        Nombre de usuario: <input type="text" name="text"><br>
                        Contraseña: <input type="password" name="password"><br>
                        <input type="submit" value="Iniciar sesión"/>
                    </form>
                </body>
            </html>`
    );
});

app.get("/api", (req, res) => {
    res.json({
        tuits: [
            {
                id:0,
                text: "ESte es mi primer tuit",
                username: "Juan"

            },
            {
                id:0,
                text: "Hola a todos",
                username: "José"

            }       
        ]
    });
});

app.post("/auth", (req, res) => {

    const {username, password} = req.body;

    //Consultar BD y validar que existen tanto
    //username como password

    const user = {username: username};

    //Creación de Token
    const accessToken = generateAccessToken(user);
 });

 function generateAccessToken(user){
    /* Primer argumento es el "payload"... información que se quiere encriptar*/
    return jwt.sign(user, process.env.PALABRA_SECRETA, {expiresIn: '5m'});
 }