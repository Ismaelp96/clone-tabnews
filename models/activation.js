import email from "infra/email.js";

async function sendEmailToUser(user) {
  await email.send({
    from: "FinTab <contato@fintab.com.br>",
    to: user.email,
    subject: "Ative seu cadastro no FinTab!",
    text: `${user.username}, clique no link abaixo para atvar seu cadastro no FinTab:
atenciosamente, Equipe FinTab`,
  });
}

const activation = {
  sendEmailToUser,
};

export default activation;
