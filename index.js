// Importando o módulo Express
import express from 'express'
const app = express();
const port = 3000; // Porta do servidor

// Lista de produtos fictícios
const produtos = [
  { id: 1, nome: "Notebook", preco: 2000.00 },
  { id: 2, nome: "Mouse", preco: 100.00 },
  { id: 3, nome: "Teclado", preco: 150.00 }
];

// Rota para a página inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor Node.js!');
});

// Rota para listar todos os produtos
app.get('/produtos', (req, res) => {
  const listaProdutos = produtos.map(prod => prod.nome);
  res.json(listaProdutos);
});

// Rota para buscar produto pelo ID
app.get('/produto/:id', (req, res) => {
  const { id } = req.params;
  const produto = produtos.find(p => p.id == id);

  if (!produto) {
    return res.status(404).send('Produto não encontrado');
  }

  res.json(produto);
});

// Rota para calcular o total com base no produto, preço e quantidade
app.get('/total/:id_produto/:preco/:qtde', (req, res) => {
  const { id_produto, preco, qtde } = req.params;
  const produto = produtos.find(p => p.id == id_produto);

  if (!produto) {
    return res.status(404).send('Produto não encontrado');
  }

  const valorTotal = parseFloat(preco) * parseFloat(qtde);
  res.json({
    produto: produto.nome,
    preco: parseFloat(preco),
    quantidade: parseFloat(qtde),
    total: valorTotal.toFixed(2)
  });
});

// Rota para exibir um menu de navegação
app.get('/menu', (req, res) => {
  res.send(`
    <h1>Menu</h1>
    <ul>
      <li><a href="/">Página Inicial</a></li>
      <li><a href="/produtos">Lista de Produtos</a></li>
      <li><a href="/produto/1">Produto 1 (Exemplo: Notebook)</a></li>
      <li><a href="/produto/2">Produto 2 (Exemplo: Mouse)</a></li>
      <li><a href="/produto/3">Produto 3 (Exemplo: Teclado)</a></li>
      <li><a href="/total/1/2000/2">Calcular Total para o Produto 1 (Notebook) - Exemplo</a></li>
    </ul>
  `);
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Servidor rodando em http://localhost:${port}/menu`);
});
