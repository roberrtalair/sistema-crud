// server.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs-extra';
import path from 'path';

const app = express();
const PORT = 80;
const UPLOAD_DIR_TMP = './uploads';

async function ensureDirectoryExists(dirPath) {
    try {
        await fs.ensureDir(dirPath);
        console.log(`Diretório criado ou já existente: ${dirPath}`);
    } catch (err) {
        console.error(`Ocorreu um erro ao criar o diretório: ${err}`);
    }
}

ensureDirectoryExists(UPLOAD_DIR_TMP);

var strSql = "";
var pool;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Aqui estou definindo as variáveis padrão para uso na conexão com o servidor mysql local
var srvHost = '127.0.0.1';
var srvPort = '3306';
var srvUser = 'root';
var srvPassword = 'senac@02';
var srvDatabase = 'salinet';

function validateDomain(domain) {
    if (domain != "localhost") {
        // Aqui estou definindo as variáveis padrão para uso na conexão com o servidor mysql remoto
        srvHost = 'sql.freedb.tech';
        srvPort = '3306';
        srvUser = 'freedb_salinet';
        srvPassword = 'Eecj!x9yxK#ZUkU';
        srvDatabase = 'freedb_salinet';
    }

    pool = mysql.createPool({
        host: srvHost,
        port: srvPort,
        user: srvUser,
        password: srvPassword,
        database: srvDatabase
    });
}

app.post('/cadastro', async (req, res) => {

    const { nome, login, senha, domain } = req.body;

    validateDomain(domain);

    try {
        strSql = "select * from `" + srvDatabase + "`.`tbl_login` where `login` = '" + login + "';";
        var [rows, fields] = await pool.query(strSql);
        if (rows.length == 1) {
            res.json({ 
                message: 'Login já cadastrado!',
                error: 'Favor digitar outro login!'
            });
            // version 1.0.1: correção de bug que permite cadastrar dois usuários com mesmo login
            // depois esta correção se transformará em uma feature (melhoria) que vai ser versionada na próxima versão da feature, ou seja: 
            // version: 1.1.0
        } else {
            var [rows, fields] = await pool.query(
                "insert into `" + srvDatabase + "`.`tbl_login` (`nome`, `login`, `senha`) values ('" + nome + "', '" + login + "', md5('" + senha + "'));"
            );
            if (rows.affectedRows > 0) {
                res.json({ message: 'Usuário cadastrado com sucesso!' });
            } else {
                throw ('Não foi possível cadastrar o usuário!');
            }
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de cadastro: ${err} ${domain}`,
            error: `Erro de cadastro: ${err} ${domain}`
        });
    }
});

app.post('/login', async (req, res) => {

    const { login, senha, domain } = req.body;

    validateDomain(domain);

    try {
        strSql = "select * from `" + srvDatabase + "`.`tbl_login` where `login` = '" + login + "' and `senha` = md5('" + senha + "');";
        var [rows, fields] = await pool.query(strSql);
        if (rows.length == 1) {
            res.json({ 
                message: 'Usuário logado com sucesso! Redirecionando...',
                id: rows[0].id
            });
        } else {
            throw ("Não foi possível logar o usuário! Cadastro inválido ou duplicado.");
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de login: ${err}`,
            error: `Erro de login: ${err}`
        });
    }
});

app.post('/leitura', async (req, res) => {

    const { nome, login, domain } = req.body;

    validateDomain(domain);

    try {
        var addNome = "";
        var addLogin = "";
        var addAnd = "";

        if (nome.trim().length > 0) {
            addNome = " `nome` like '%" + nome + "%' ";
        }

        if (login.trim().length > 0) {
            addLogin = " `login` like '%" + login + "%' ";
        }

        if (nome.trim().length > 0 && login.trim().length > 0) {
            addAnd = " and ";
        }

        strSql = "select * from `" + srvDatabase + "`.`tbl_login` where" + 
            addNome + addAnd + addLogin + " order by `id` asc;";
        var [rows, fields] = await pool.query(strSql);
        if (rows.length > 0) {
            res.json({ 
                message: 'Nome ou login encontrado com sucesso!',
                id: rows[0].id,
                nome: rows[0].nome,
                login: rows[0].login,
                linhas: rows
            });
        } else {
            throw ("Não foi possível encontrar o nome ou login!");
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de leitura: ${err}`,
            error: `Erro de leitura: ${err}`
        });
    }
});

app.post('/atualizacao', async (req, res) => {

    const { domain } = req.body;

    validateDomain(domain);

    try {
        strSql = "select * from `" + srvDatabase + "`.`tbl_login` order by `id` asc;";
        var [rows, fields] = await pool.query(strSql);
        if (rows.length > 0) {
            res.json({ 
                message: 'Nome, login e senhas encontrados com sucesso!',
                rows: rows
            });
        } else {
            throw ("Não há registro algum na tabela tbl_login!");
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de atualização: ${err}`,
            error: `Erro de atualização: ${err}`
        });
    }
});

app.post('/atualizar', async (req, res) => {

    const { id, nome, login, senha, domain } = req.body;

    validateDomain(domain);

    try {
        var addId = "";
        var addNome = "";
        var addLogin = "";
        var addSenha = "";

        if (id.trim().length > 0) {
            addId = id;
        }

        if (nome.trim().length > 0) {
            addNome = " `nome` = '" + nome + "' ";
        }

        if (login.trim().length > 0) {
            addLogin = " `login` = '" + login + "' ";
        }

        if (addNome.length > 0) {
            addLogin = " , " + addLogin;
        }

        if (senha.trim().length > 0) {
            addSenha = " `senha` = md5('" + senha + "') ";
        }

        if (addLogin.length > 0 && addSenha.length > 0) {
            addSenha = " , " + addSenha;
        }

        strSql = "update `" + srvDatabase + "`.`tbl_login` set " + 
            addNome + addLogin + addSenha + 
            " where `id` = " + addId + ";";
        var [rows, fields] = await pool.query(strSql);
        if (rows.affectedRows > 0) {
            res.json({ 
                message: 'Registro atualizado com sucesso!'
            });
        } else {
            throw ("Não foi possível atualizar o id: " + addId + " na tabela tbl_login!");
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de atualizar: ${err} - sql: ${strSql}`,
            error: `Erro de atualizar: ${err}`
        });
    }
});

app.post('/remover', async (req, res) => {

    const { id, domain } = req.body;

    validateDomain(domain);

    try {
        var addId = "";

        if (id.trim().length > 0) {
            addId = id;
        }

        strSql = "delete from `" + srvDatabase + "`.`tbl_login` where `id` = " + addId + ";";
        var [rows, fields] = await pool.query(strSql);
        if (rows.affectedRows > 0) {
            res.json({ 
                message: 'Registro removido com sucesso!'
            });
        } else {
            throw ("Não foi possível remover o id: " + addId + " na tabela tbl_login!");
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de remover: ${err}`,
            error: `Erro de remover: ${err}`
        });
    }
});

app.post('/anterior', async (req, res) => {

    const { id, nome, login, domain } = req.body;

    validateDomain(domain);

    try {
        var addId = "";
        var addNome = "";
        var addLogin = "";

        if (typeof(nome) != undefined) {
            addNome = " `nome` like '%" + nome + "%' ";
        }

        if (typeof(login) != undefined) {
            addLogin = " `login` like '%" + login + "%' ";
        }

        if (typeof(nome) != undefined && typeof(login) != undefined) {
            addLogin = " and " + addLogin;
        }

        if (typeof(id) != undefined) {
            addId = " `id` < " + id + " ";
        }

        if (typeof(nome) != undefined && typeof(id) != undefined) {
            addId = " and " + addId;
        } else if (typeof(login) != undefined && typeof(id) != undefined) {
            addId = " and " + addId;
        }

        strSql = "select * from `" + srvDatabase + "`.`tbl_login` where" + 
            addNome + addLogin + addId + " order by `id` desc;";
        var [rows, fields] = await pool.query(strSql);
        if (rows.length > 0) {
            res.json({
                message: 'Nome ou login encontrado com sucesso!',
                id: rows[0].id,
                nome: rows[0].nome,
                login: rows[0].login,
                linhas: rows
            });
        } else {
            throw ("Não foi possível encontrar o nome ou login!");
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de anterior: ${err}`,
            error: `Erro de anterior: ${err}`
        });
    }
});

app.post('/proximo', async (req, res) => {

    const { id, nome, login, domain } = req.body;

    validateDomain(domain);

    try {
        var addId = "";
        var addNome = "";
        var addLogin = "";

        if (typeof(nome) != undefined) {
            addNome = " `nome` like '%" + nome + "%' ";
        }

        if (typeof(login) != undefined) {
            addLogin = " `login` like '%" + login + "%' ";
        }

        if (typeof(nome) != undefined && typeof(login) != undefined) {
            addLogin = " and " + addLogin;
        }

        if (typeof(id) != undefined) {
            addId = " `id` > " + id + " ";
        }

        if (typeof(nome) != undefined && typeof(id) != undefined) {
            addId = " and " + addId;
        } else if (typeof(login) != undefined && typeof(id) != undefined) {
            addId = " and " + addId;
        }

        strSql = "select * from `" + srvDatabase + "`.`tbl_login` where" + 
            addNome + addLogin + addId + " order by `id` asc;";
        var [rows, fields] = await pool.query(strSql);
        if (rows.length > 0) {
            res.json({
                message: 'Nome ou login encontrado com sucesso!',
                id: rows[0].id,
                nome: rows[0].nome,
                login: rows[0].login,
                linhas: rows
            });
        } else {
            // throw ("Não foi possível encontrar o nome ou login!");
            throw ("Não foi possível encontrar o nome ou login!");
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de próximo: ${err}`,
            error: `Erro de próximo: ${err}`
        });
    }
});

app.post('/ultimo', async (req, res) => {

    const { nome, login, domain } = req.body;

    validateDomain(domain);

    try {
        var addNome = "";
        var addLogin = "";
        var addAnd = "";

        if (nome.trim().length > 0) {
            addNome = " `nome` like '%" + nome + "%' ";
        }

        if (login.trim().length > 0) {
            addLogin = " `login` like '%" + login + "%' ";
        }

        if (nome.trim().length > 0 && login.trim().length > 0) {
            addAnd = " and ";
        }

        strSql = "select * from `" + srvDatabase + "`.`tbl_login` where" + 
            addNome + addAnd + addLogin + " order by `id` desc;";
        var [rows, fields] = await pool.query(strSql);
        if (rows.length > 0) {
            res.json({
                message: 'Nome ou login encontrado com sucesso!',
                id: rows[0].id,
                nome: rows[0].nome,
                login: rows[0].login,
                linhas: rows
            });
        } else {
            // throw ("Não foi possível encontrar o nome ou login!");
            throw ("Não foi possível encontrar o nome ou login! sql: " + strSql);
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de último: ${err}`,
            error: `Erro de último: ${err}`
        });
    }
});

app.post('/upload/file', async (req, res) => {

    // Configuração do Multer para onde os arquivos serão armazenados
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_DIR_TMP); // Os arquivos serão salvos na pasta 'uploads'
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    });
    const uploadDir = multer({ storage: storage });

    const { nomeArquivo, tipoArquivo, conteudoBase64, id, nome, domain } = req.body;
    const filename = req.headers['file-name'];

    validateDomain(domain);

    try {
        const filePath = path.join(uploadDir, filename);
        let data = [];

        req.on('data', chunk => {
            data.push(chunk);
        });

        req.on('end', () => {
            const buffer = Buffer.concat(data);

            fs.writeFile(filePath, buffer, err => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ 
                        message: `Ocorreu um erro ao salvar arquivo!`,
                        error: `Erro do servidor: ${err}`
                    });
                }
                res.json({
                    message: 'Arquivo enviado com sucesso!',
                    filename: filePath.split('/').pop()
                });
            });
        });

        req.on('error', err => {
            console.error(err);
            res.status(500).json({ 
                message: `Erro de envio do arquivo durante o upload!`,
                error: `Erro do servidor: ${err}`
            });
        });
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de envio de arquivo: ${err}`,
            error: `Erro de envio de arquivo: ${err}`
        });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});