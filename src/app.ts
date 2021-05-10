import express from "express";

const app = express();
app.use(express.json());

const users: Array<any> = [];

app.get("/dropAllUsers", (req, res) => {
  users.splice(0, users.length);
  return res.status(200).json(users);
});

// TODO - Refatorar TS
app.get("/user", (req, res) => {
  return res.status(200).json(users);
});

// TODO - Refatorar TS
//        Retornar unico usuário;
app.get("/user/:cpf", (req, res) => {
  const { cpf } = req.params;
  const user = "";
  return res.status(200).json(user);
});

// TODO - Refatorar TS
//        Não permitir cadastrar usuário caso já exista (cpf duplicado);
app.post("/user", (req, res) => {
  const { name, email, cpf } = req.body;

  const user = {
    name,
    email,
    cpf,
  };

  users.push(user);

  return res.status(200).json(user);
});


// TODO - Refatorar TS
//        Atualizar dados do usuário;
app.put("/user/:cpf", (req, res) => {
  const { name, email } = req.body;
  const { cpf } = req.params;

  const user = "";

  return res.status(200).json(user);
});


// TODO - Refatorar TS
//        Remover usuário;
app.delete("/user/:cpf", (req, res) => {
  const { cpf } = req.params;

  const userExists = "";

  if (userExists) {
    return res.status(200).json(users);
  } else {
    return res.status(400).json({ error: "Erro ao apagar o usuário" });
  }
});

export default app;
