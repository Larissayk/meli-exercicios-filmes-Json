const app = require("./src/app");
const port = process.env.port || 4000;

app.listen(port, function() {
  console.log(`O app está rodando na porta ${port}`);
});
