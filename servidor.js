import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 80;

var strSql = "";
var pool;

// Aqui estou definindo as variáveis padrão para uso na conexão com o servidor mysql local
var srvHost = 'sql.freedb.tech';
var srvPort = '3306';
var srvUser = 'freedb_senac_ps';
var srvPassword = '4@fy*2XkUn#W5QQ';
var srvDatabase = 'freedb_senac_ps';

pool = mysql.createPool({
    host: srvHost,
    port: srvPort,
    user: srvUser,
    password: srvPassword,
    database: srvDatabase
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

app.post('/login', async (req, res) => {

    const { login, senha } = req.body;

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

app.post('/cadastrar', async (req, res) => {

    const { nome, login, senha } = req.body;

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
            message: `Erro de cadastro: ${err}`,
            error: `Erro de cadastro: ${err}`
        });
    }
});

app.post('/pesquisar', async (req, res) => {

    const { pesquisar } = req.body;

    try {
        strSql = "select * from `" + srvDatabase + "`.`tbl_login` where `nome` like '%" + pesquisar + "%' or `login` like '%" + pesquisar + "%' order by `id` asc;";
        var [rows, fields] = await pool.query(strSql);
        if (rows.length > 0) {
            res.json({ 
                message: 'Nome ou login encontrado com sucesso!',
                id: rows[0].id,
                nome: rows[0].nome,
                login: rows[0].login,
                senha: rows[0].senha,
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
    try {
        strSql = "select `id`, `nome`, `login`, `senha` from `" + srvDatabase + "`.`tbl_login` order by `id` asc;";
        var [rows, fields] = await pool.query(strSql);
        if (rows.length > 0) {
            res.json({ 
                message: 'Registros encontrados com sucesso!',
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

app.post('/anterior', async (req, res) => {

    const { id, pesquisar } = req.body;

    var addNomeLogin = "";
    if (pesquisar.length > 0) {
        addNomeLogin = " and `nome` like '%" + pesquisar + "%' or `login` like '%" + pesquisar + "%'";
    }

    try {
        strSql = "select * from `" + srvDatabase + "`.`tbl_login` where `id` < " + id + addNomeLogin + " order by `id` desc;";
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
            message: `Erro de navegação: ${err}`,
            error: `Erro de navegação: ${err}`
        });
    }
});

app.post('/proximo', async (req, res) => {

    const { id, pesquisar } = req.body;

    var addNomeLogin = "";
    if (pesquisar.length > 0) {
        addNomeLogin = " and `nome` like '%" + pesquisar + "%' or `login` like '%" + pesquisar + "%'";
    }

    try {
        strSql = "select * from `" + srvDatabase + "`.`tbl_login` where `id` > " + id + addNomeLogin + " order by `id` asc;";
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
            message: `Erro de navegação: ${err}`,
            error: `Erro de navegação: ${err}`
        });
    }
});

app.post('/ultimo', async (req, res) => {
    try {
        strSql = "select `id`, `nome`, `login` from `" + srvDatabase + "`.`tbl_login` order by `id` desc;";
        var [rows, fields] = await pool.query(strSql);
        if (rows.length > 0) {
            res.json({ 
                message: 'Registros encontrados com sucesso!',
                id: rows[0].id,
                nome: rows[0].nome,
                login: rows[0].login,
                rows: rows
            });
        } else {
            throw ("Não há registro algum na tabela tbl_login!");
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de navegação: ${err}`,
            error: `Erro de navegação: ${err}`
        });
    }
});

app.post('/atualizar', async (req, res) => {

    const { id, nome, login, senha } = req.body;
    var alteracoes = "";

    try {
        if (login.length > 0) {
            strSql = "select * from `" + srvDatabase + "`.`tbl_login` where `login` = '" + login + "';";
            var [rows, fields] = await pool.query(strSql);
            if (rows.length == 1) {
                res.json({ 
                    message: 'Login já cadastrado!',
                    error: 'Favor digitar outro login!'
                });
                throw('Login já cadastrado!');
                // version 1.0.1: correção de bug que permite cadastrar dois usuários com mesmo login
                // depois esta correção se transformará em uma feature (melhoria) que vai ser versionada na próxima versão da feature, ou seja: 
                // version: 1.1.0
            }
        }
        if (nome.length > 0) {
            alteracoes = "`nome` = '" + nome + "'";
        }

        if (login.length > 0) {
            if (alteracoes.length > 0) {
                alteracoes += " and ";
            }
            alteracoes += "`login` = '" + login + "'";
        }

        if (senha.length > 0) {
            if (alteracoes.length > 0) {
                alteracoes += " and ";
            }
            alteracoes += "`senha` = md5('" + senha + "')";
        }

        strSql = "update `" + srvDatabase + "`.`tbl_login` set " + alteracoes + " where `id` = " + id + ";";
        console.log(strSql);
        var [rows, fields] = await pool.query(strSql);

        if (rows.affectedRows > 0) {
            res.json({ message: 'Usuário atualizado com sucesso!' });
        } else {
            throw ('Não foi possível atualizar o usuário!');
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de atualização: ${err}`,
            error: `Erro de atualização: ${err}`
        });
    }
});

app.post('/apagar', async (req, res) => {

    const { id } = req.body;

    try {
        strSql = "delete from `" + srvDatabase + "`.`tbl_login` where `id` = " + id + ";";
        var [rows, fields] = await pool.query(strSql);

        if (rows.affectedRows > 0) {
            res.json({ message: 'Usuário apagado com sucesso!' });
        } else {
            throw ('Não foi possível apagar o usuário!');
        }
    } catch (err) {
        // console.error(err); // aqui não vai aparecer o erro no console, pois este arquivo não é processado pelo frontend, mas sim pelo backend (node server.js)
        res.status(500).json({ 
            message: `Erro de remoção: ${err}`,
            error: `Erro de remoção: ${err}`
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});