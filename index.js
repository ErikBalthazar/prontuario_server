var express = require('express')
var bodyParser = require('body-parser')
var mysql      = require('mysql');
var app = express()

const BAD_REQUEST = 400;
const SUCCESS = 200;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const connectionData = {
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'prontuario_beta'
};

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});

app.get('/', function(req, res) {
    res.send('TA FUNCIONANDO!')
});

app.post('/test', function(req, res) {
    let name = req.body.name
    res.json({notes: `Hello ${name}`})
});

// AGORA É SÉRIO

app.post('/login/paciente', function(req, res) {
    let cpf = req.body.login;
    let pass = req.body.pass;

    let query = `SELECT * FROM paciente WHERE cpf = '${cpf}' AND senha = '${pass}'`;

    const connection = mysql.createConnection(connectionData);

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                let data = results[0];
                res.json(
                    {
                        cpf: data.CPF,
                        email: data.EMAIL,
                        name: data.NOME_COMPLETO,
                        birthdate: data.DATA_NASCIMENTO,
                        password: data.SENHA,
                        phoneNumber: data.TELEFONE,
                        gender: data.SEXO,
                        fbid: data.FBID
                    });
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });
}); 

app.post('/login/medico', function(req, res) {
    let crm = req.body.login;
    let pass = req.body.pass;

    let query = `SELECT * FROM medico WHERE crm = '${crm}' AND senha = '${pass}'`;

    const connection = mysql.createConnection(connectionData);

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                let data = results[0];
                res.json(
                    {
                        crm: data.CRM,
                        email: data.EMAIL,
                        name: data.NOME_COMPLETO,
                        birthdate: data.DATA_NASCIMENTO,
                        password: data.SENHA,
                        phoneNumber: data.TELEFONE,
                        gender: data.SEXO,
                        maps: data.MAPS
                    });
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });
}); 

app.post('/paciente/new', function(req, res) {
    let data = req.body;
    let cpf = data.cpf;
    //let bloodType = data.bloodType; // nao esta no form
    let email = data.email;
    let name = data.name;
    let birthdate = data.birthdate;
    let password = data.password;
    let phoneNumber = data.phoneNumber;
    let gender = data.gender;

    let query = `INSERT INTO paciente (CPF, EMAIL, NOME_COMPLETO, DATA_NASCIMENTO, SENHA, TELEFONE, SEXO) ` +
        `VALUES ('${cpf}', '${email}', '${name}', '${birthdate}', '${password}', '${phoneNumber}', '${gender}')`;

    const connection = mysql.createConnection(connectionData);
    
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            res.json({ msg: "Paciente cadastrado com sucesso" });
        });
    });
});

app.post('/paciente/update', function(req, res) {
    let data = req.body;
    let cpf = data.cpf;
    let bloodType = data.bloodType; // nao esta no form
    let email = data.email;
    let name = data.name;
    let birthdate = data.birthdate;
    let password = data.password;
    let phoneNumber = data.phoneNumber;
    let gender = data.gender;

    let query = `UPDATE paciente SET EMAIL = '${email}', NOME_COMPLETO = '${name}', ` + 
        `DATA_NASCIMENTO = '${birthdate}', SENHA = '${password}', ` + 
        `TELEFONE = '${phoneNumber}', SEXO = '${gender}' WHERE CPF = '${cpf}'`;

    const connection = mysql.createConnection(connectionData);
    
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            res.json({ msg: "Paciente atualizado com sucesso" });
        });
    });
});

app.post('/medico/new', function(req, res) {
    let data = req.body;
    let crm = data.crm;
    let email = data.email;
    let name = data.name;
    let birthdate = data.birthdate;
    let password = data.password;
    let phoneNumber = data.phoneNumber;
    let gender = data.gender;

    let query = `INSERT INTO medico (CRM, EMAIL, NOME_COMPLETO, DATA_NASCIMENTO, SENHA, SEXO, TELEFONE) ` +
    `VALUES ('${crm}', '${email}', '${name}', '${birthdate}', '${password}', '${gender}', '${phoneNumber}')`;

    const connection = mysql.createConnection(connectionData);
    
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            res.json({ msg: "Medico cadastrado com sucesso" });
        });
    });
});

app.post('/medico/update', function(req, res) {
    let data = req.body;
    let crm = data.crm;
    let email = data.email;
    let name = data.name;
    let birthdate = data.birthdate;
    let password = data.password;
    let phoneNumber = data.phoneNumber;
    let gender = data.gender;

    let query = `UPDATE medico SET EMAIL = '${email}', NOME_COMPLETO = '${name}', ` + 
    `DATA_NASCIMENTO = '${birthdate}', SENHA = '${password}', ` + 
    `SEXO = '${gender}' TELEFONE = ${phoneNumber} WHERE CRM = '${crm}'`;

    const connection = mysql.createConnection(connectionData);
    
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            res.json({ msg: "Medico atualizado com sucesso" });
        });
    });
});


app.post('/paciente/facebook/check', function (req, res) {
    let data = req.body;
    let fbid = data.fbId;

    console.log(data);

    let query = `SELECT * from paciente WHERE fbid = ${fbid}`;
   
    const connection = mysql.createConnection(connectionData);
    
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                res.json({ msg: "Logado com sucesso", signup: false });
            } else {
                res.json({ msg: "Logado com sucesso", signup: true });
            }
        });
    });
});

app.post('/paciente/facebook/new', function (req, res) {
    let data = req.body;
    let cpf = data.cpf;
    let email = data.email;
    let name = data.name;
    let birthdate = data.birthdate;
    let fbid = data.fbId;
    let image = data.image;

    console.log(data);

    let query = `SELECT * from paciente WHERE fbid = ${fbid}`;
   
    const connection = mysql.createConnection(connectionData);
    
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                res.json({ msg: "Logado com sucesso" });
            } else {
                query = `INSERT INTO paciente (cpf, email, nome_completo, data_nascimento, fbid, image) VALUES ('${cpf}', '${email}', '${name}', '${birthdate}', '${fbid}', '${image}')`;
                console.log(query);
                connection.query(query, function(errors2, results2, fields2) {
                    if (errors2) throw errors2;
                    console.log(results2);
                    res.json({ msg: "Logado com sucesso" });
                });
            }
        });
    });
});

app.post('/paciente/google/check', function (req, res) {
    let data = req.body;
    let email = data.email;
    let name = data.name;
    let googleid = data.googleid;
    let image = data.image;

    console.log(data);

    let query = `SELECT * from paciente WHERE googleid = ${googleid}`;
   
    console.log(query);

    const connection = mysql.createConnection(connectionData);
    
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                res.json({ msg: "Logado com sucesso" });
            } else {
                query = `INSERT INTO paciente (email, nome_completo, googleid, image) VALUES ('${email}', '${name}', '${googleid}', '${image}')`;
                console.log(query);
                connection.query(query, function(errors2, results2, fields2) {
                    if (errors2) throw errors2;
                    console.log(results2);
                    res.json({ msg: "Logado com sucesso" });
                });
            }
        });
    });
});

app.post('/paciente/cpf', function(req, res){
    let cpf = req.body.cpf;

    let query = `SELECT * FROM paciente WHERE cpf = '${cpf}'`;

    const connection = mysql.createConnection(connectionData);

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                let data = results[0];
                res.json(
                    {
                        cpf: data.CPF,
                        email: data.EMAIL,
                        name: data.NOME_COMPLETO,
                        birthdate: data.DATA_NASCIMENTO,
                        password: data.SENHA,
                        phoneNumber: data.TELEFONE,
                        gender: data.SEXO,
                        fbid: data.FBID,
                        googleid: data.googleid,
                        image: data.image
                    });
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });  
});

app.post('/paciente/fbid', function(req, res){
    let fbid = req.body.fbid;

    let query = `SELECT * FROM paciente WHERE fbid = '${fbid}'`;

    const connection = mysql.createConnection(connectionData);

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                let jsonResult = {
                    cpf: results[0]
                };
                res.json(jsonResult);
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });  
});

app.post('/paciente/email', function(req, res){
    let email = req.body.email;

    let query = `SELECT * FROM paciente WHERE email = '${email}'`;

    const connection = mysql.createConnection(connectionData);

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                let data = results[0];
                res.json(
                    {
                        cpf: data.CPF,
                        email: data.EMAIL,
                        name: data.NOME_COMPLETO,
                        birthdate: data.DATA_NASCIMENTO,
                        password: data.SENHA,
                        phoneNumber: data.TELEFONE,
                        gender: data.SEXO,
                        fbid: data.FBID,
                        googleid: data.googleid,
                        image: data.image
                    });
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });  
});

app.post('/medico/crm', function(req, res){
    console.log(req)

    let crm = req.body.crm;

    let query = `SELECT * FROM medico WHERE crm = '${crm}'`;

    const connection = mysql.createConnection(connectionData);

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                let data = results[0];
                res.json(
                    {
                        crm: data.CRM,
                        email: data.EMAIL,
                        name: data.NOME_COMPLETO,
                        birthdate: data.DATA_NASCIMENTO,
                        password: data.SENHA,
                        phoneNumber: data.TELEFONE,
                        gender: data.SEXO,
                        maps: data.MAPS
                    });
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });  
});

app.post('/paciente/facebook/add', function (req, res) {
    let cpf = req.body.cpf;
    let fbid = req.body.fbid;

    let query = `SELECT * FROM paciente WHERE cpf = '${cpf}'`;

    const connection = mysql.createConnection(connectionData);  
    
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                query = `UPDATE paciente SET fbid = ${fbid} WHERE cpf = '${cpf}'`;
                res.json({ msg: "Facebook adicionado ao perfil"});
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });  
});

app.post('/medico/maps/add', function (req, res) {
    let crm = req.body.crm;
    let maps = req.body.maps;

    let query = `SELECT * FROM medico WHERE crm = '${crm}'`;

    const connection = mysql.createConnection(connectionData);  
    
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                query = `UPDATE medico SET maps = '${maps}' WHERE crm = '${crm}'`;
                connection.query(query, function(errors2, results2, fields2) {
                    if (errors2) throw errors2;
                    res.json({ maps: maps});
                });
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });
});

app.post('/paciente/consultas', function (req, res) {
    let cpf = req.body.cpf;

    let query = `SELECT * FROM CONSULTA WHERE cpf = '${cpf}'`;

    const connection = mysql.createConnection(connectionData);

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                // montar json
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });  
});

app.post('/medico/consultas', function (req, res) {
    let crm = req.body.crm;

    let query = `SELECT * FROM CONSULTA WHERE crm = '${crm}'`;

    const connection = mysql.createConnection(connectionData);

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                // montar json
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });
});

app.post('/consulta', function (req, res) {
    let id = req.body.id;

    let query = `SELECT * FROM CONSULTA WHERE id = '${id}'`;

    const connection = mysql.createConnection(connectionData);

    connection.connect(function(err) {
        if (err) throw err;
        connection.query(query, function(errors, results, fields) {
            if (errors) throw errors;
            console.log(results);
            if (results.length > 0) {
                // montar json
            } else {
                res.sendStatus(BAD_REQUEST);
            }
        });
    });
});

/*
CREATE TABLE PACIENTE(
    CPF VARCHAR(11) NOT NULL,
    TIPO_SANGUINEO VARCHAR(3),
    EMAIL VARCHAR(60) NOT NULL,
    NOME_COMPLETO VARCHAR(50) NOT NULL,
    DATA_NASCIMENTO DATE NOT NULL,
    SENHA VARCHAR(20) NOT NULL,
    TELEFONE VARCHAR(12) NOT NULL,
    SEXO CHAR(1) NOT NULL,
    PRIMARY KEY (CPF)
);

CREATE TABLE MEDICO(
    CRM VARCHAR(5) NOT NULL,
    EMAIL VARCHAR(50) NOT NULL,
    TELEFONE VARCHAR(12) NOT NULL,
    SENHA VARCHAR(20) NOT NULL,
    NOME_COMPLETO VARCHAR(50) NOT NULL,
    DATA_NASCIMENTO DATE NOT NULL,
    SEXO CHAR(1),
    PRIMARY KEY (CRM)
);

CREATE TABLE CONSULTA(
    ID INT NOT NULL AUTO_INCREMENT,
    CRM VARCHAR(5) NOT NULL,
    CPF VARCHAR(11) NOT NULL,
    ALTURA FLOAT(3,2),
    PESO FLOAT(4,1),
    PRESSAO FLOAT(3,1),
    DATA_CONSULTA DATE NOT NULL,
    SINTOMAS VARCHAR(200) NOT NULL,
    DIAGNOSTICO VARCHAR(200) NOT NULL,
    TRATAMENTO VARCHAR(200) NOT NULL,

    PRIMARY KEY (ID),
    FOREIGN KEY (CRM) REFERENCES MEDICO(CRM),
    FOREIGN KEY (CPF) REFERENCES PACIENTE(CPF)
);
*/

app.listen(8000)

