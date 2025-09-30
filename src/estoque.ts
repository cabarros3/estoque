// import promptSync from "prompt-sync";
import promptSync = require("prompt-sync");
const entradaUser = promptSync({ sigint: false });

// criar classe produto
class Produto {
  private nome: string;
  private codigo: string;
  private preco: number;
  private estoqueBaixo: boolean = false;
  private quantidade: number;

  constructor(nome: string, codigo: string, preco: number, quantidade: number) {
    this.nome = nome;
    this.codigo = codigo;
    this.preco = preco;
    this.quantidade = quantidade;
    this.verficarEstoqueBaixo(); // vai verificar se na inicialização já começa com estoque baixo
  }

  get getNome() {
    return this.nome;
  }

  get getCodigo() {
    return this.codigo;
  }

  get getPreco() {
    return this.preco;
  }

  get getEstoqueBaixo() {
    return this.estoqueBaixo;
  }

  get getQuantidade() {
    return this.quantidade;
  }

  set setQuantidade(valor: number) {
    this.quantidade = valor;
    this.verficarEstoqueBaixo();
  }

  // adiciona um produto a quantidade
  adicionarEstoque(qtd: number): void {
    this.quantidade += qtd;
    this.verficarEstoqueBaixo();
  }

  // remove produtos da quantidade e verifica estoque baixo. trata erro de remoção maior que estoque disponível.
  removerEstoque(qtd: number): void {
    if (this.quantidade - qtd < 0) {
      throw new Error("Quantidade solicitada maior que o estoque disponível");
    }

    this.quantidade -= qtd;
    console.log("Saída registrada com sucesso!");
    this.verficarEstoqueBaixo();
  }

  // verifica se o estoque de um produto está baixo
  public verficarEstoqueBaixo(): void {
    this.estoqueBaixo = this.quantidade <= 5; // delimita que a partir de 5 p estoque está baixo
  }
}

// classe abstrata
abstract class Movimentacao {
  protected produto: Produto;
  protected quantidade: number;
  protected data: Date = new Date();

  constructor(produto: Produto, quantidade: number) {
    this.produto = produto;
    this.quantidade = quantidade;
  }

  get getProduto(): Produto {
    return this.produto;
  }

  get getQuantidade() {
    return this.quantidade;
  }

  get getData() {
    return this.data;
  }

  registrar(estoque: Estoque): void {}
}

// classe concreta
class Entrada extends Movimentacao {
  registrar(estoque: Estoque): void {
    this.getProduto.adicionarEstoque(this.getQuantidade);
    estoque.registrarMovimentacao(this); // esse this se refere a instância
    console.log(`Entrada registrada com sucesso`);
  }
}

// classe concreta
class Saida extends Movimentacao {
  registrar(estoque: Estoque): void {
    try {
      this.getProduto.removerEstoque(this.getQuantidade);
      estoque.registrarMovimentacao(this);
    } catch (erro) {
      if (erro instanceof Error) {
        console.error("Falha ao remover estoque:", erro.message);
      }
    }
  }
}

// classe de estoque que funciona como gerenciador do estoque
class Estoque {
  private listaProdutos: Produto[] = [];
  private listaMovimentacoes: Movimentacao[] = [];

  get getListaProdutos() {
    return this.listaProdutos;
  }

  // adiciona um produto ao estoque (array listaProdutos)
  adicionarProduto(produto: Produto): void {
    this.listaProdutos.push(produto);
  }

  // adiciona ao array de movimentações as movimentações realizadas (listaMovimentacoes)
  registrarMovimentacao(mov: Movimentacao) {
    this.listaMovimentacoes.push(mov);
  }

  //lista todos os produtos cadastrados (código e nome do produto)
  listarProdutos(): void {
    if (this.listaProdutos.length === 0) {
      console.log("Nenhum produto cadastrado ainda.");
      return;
    }

    console.log("========= Lista de todos os Produtos Cadastrados =======");
    for (const p of this.listaProdutos) {
      if (!p) continue; // evita erro se tiver algo inválido
      console.log(`Código: ${p.getCodigo} | Nome do Produto: ${p.getNome}`);
    }
    console.log("========================================================");
  }

  // gera relatório com código, nome, preço, quantidade, total do produto e flag de estoque baixo. Além do valor total do estoque completo.
  gerarRelatorio(): void {
    console.log("===== RELATÓRIO DE ESTOQUE =====");
    this.listaProdutos.forEach((produto) => {
      const subtotal = produto.getPreco * produto.getQuantidade;
      console.log(`Código: ${produto.getCodigo}`);
      console.log(`Nome: ${produto.getNome}`);
      console.log(`Preço: R$ ${produto.getPreco}`);
      console.log(`Quantidade: ${produto.getQuantidade}`);
      console.log(`Subtotal: R$ ${subtotal.toFixed(2)}`);
      console.log(
        produto.getEstoqueBaixo ? "⚠️  Estoque baixo" : "Estoque normal"
      );
      console.log("--------------------------------");
    });
    console.log(
      `Valor total em estoque: R$ ${this.calcularValorTotal().toFixed(2)}`
    );
    console.log("================================");
  }

  // imprime no console um relatório de todas as movimentações feitas
  relatorioMovimentacoes(): void {
    console.log("===== RELATÓRIO DE MOVIMENTAÇÕES =====");
    this.listaMovimentacoes.forEach((m) => {
      // instanceof é um método que retorna true se o objeto for uma instância ou herda de alguma classe/construtor
      const tipo = m instanceof Entrada ? "Entrada" : "Saída";
      console.log(
        `${tipo} | Código: ${m.getProduto.getCodigo} | Produto: ${
          m.getProduto.getNome
        } | Qtde: ${m.getQuantidade} | Data: ${m.getData.toLocaleString()}`
      );
    });
    console.log("======================================");
  }

  // busca um produto pelo título e mostra uma lista com os produtos de títulos iguais. Informações detalhadas dos produtos encontrados.
  pesquisarProduto(termoDeBusca: string): void {
    const encontrados: Produto[] = [];

    for (const produto of this.listaProdutos) {
      // usando o includes para pegar todos os produtos que possuem o termo
      if (produto.getNome.toLowerCase().indexOf(termoDeBusca.toLowerCase())) {
        encontrados.push(produto);
      }
    }

    if (encontrados.length === 0) {
      console.log("Nenhum produto foi encontrado com esse termo");
      return;
    }

    console.log("========= Produto(s) Encontrado(s) ==========");
    for (const p of encontrados) {
      console.log(`Código: ${p.getCodigo}`);
      console.log(`Nome: ${p.getNome}`);
      console.log(`Preço: ${p.getPreco}`);
      console.log(`Quantidade: ${p.getQuantidade}`);
      // p.verficarEstoqueBaixo();
      console.log("");
    }
    console.log("=============================================");
  }

  // calcula o total dos produtos (preço * quantidade)
  // imprime no console se for true e se for false só atualiza
  calcularValorTotal(imprimir: boolean = false): number {
    const total = this.listaProdutos.reduce(
      (acc, p) => acc + p.getPreco * p.getQuantidade,
      0
    );
    if (imprimir) {
      console.log(`O valor total do estoque é R$ ${total.toFixed(2)}`);
    }
    return total;
  }

  // mostra apenas os produtos com estoque baixo
  mostrarProdutosEstoqueBaixo(): void {
    const estoqueBaixo: Produto[] = [];

    for (const p of this.listaProdutos) {
      if (!p) continue; // evita erro se p for undefined
      if (p.getEstoqueBaixo) {
        estoqueBaixo.push(p);
      }
    }

    if (estoqueBaixo.length === 0) {
      console.log("Nenhum produto com estoque baixo.");
      return;
    }

    console.log("==== PRODUTOS COM ESTOQUE BAIXO ====");
    for (const prod of estoqueBaixo) {
      console.log(`Código: ${prod.getCodigo}`);
      console.log(`Nome: ${prod.getNome}`);
      console.log(`Preço: ${prod.getPreco}`);
      console.log(`Quantidade: ${prod.getQuantidade}`);
      console.log("--------------------------------");
    }
  }
}

// instância do estoque
const estoque = new Estoque();

// função para criar o produto
function criarProduto(): Produto | null {
  const nome = entradaUser("Nome do produto: ")?.trim();
  const codigo = entradaUser("Código do produto: ")?.trim();
  const preco = Number(entradaUser("Preço: "));
  const quantidade = Number(entradaUser("Quantidade: "));

  if (!nome || !codigo || isNaN(preco) || isNaN(quantidade)) {
    console.log("⚠️ Dados inválidos, produto não criado.");
    return null;
  }

  return new Produto(nome, codigo, preco, quantidade);
}

// função para escolher um produto pelo código
function escolherProduto(): Produto | null {
  const codigo = entradaUser("Informe o código do produto: ")!;
  const produto = estoque.getListaProdutos.find((p) => p.getCodigo === codigo);
  if (!produto) console.log("Produto não encontrado!");
  return produto || null;
}

// criando um menu principal dentro de uma function para executar somente se for chamado
function menu() {
  let opcao = "";

  while (opcao !== "0") {
    console.log("\n=== MENU ESTOQUE ===");
    console.log("1 - Adicionar produto");
    console.log("2 - Registrar entrada");
    console.log("3 - Registrar saída");
    console.log("4 - Listar produtos");
    console.log("5 - Gerar relatório de estoque");
    console.log("6 - Mostrar produtos com estoque baixo");
    console.log("7 - Pesquisar produto");
    console.log("0 - Sair");
    opcao = entradaUser("Escolha uma opção: ")!;

    switch (opcao) {
      case "1":
        const novoProduto = criarProduto();
        if (novoProduto) {
          estoque.adicionarProduto(novoProduto);
          console.log("Produto adicionado com sucesso!");
        }
        break;

      case "2":
        const prodEntrada = escolherProduto();
        if (prodEntrada) {
          const qtdEntrada = Number(entradaUser("Quantidade de entrada: "));
          const entrada = new Entrada(prodEntrada, qtdEntrada);
          entrada.registrar(estoque);
        }
        break;

      case "3":
        const prodSaida = escolherProduto();
        if (prodSaida) {
          const qtdSaida = Number(entradaUser("Quantidade de saída: "));
          const saida = new Saida(prodSaida, qtdSaida);
          saida.registrar(estoque);
        }
        break;

      case "4":
        estoque.listarProdutos();
        break;

      case "5":
        estoque.gerarRelatorio();
        break;

      case "6":
        estoque.mostrarProdutosEstoqueBaixo();
        break;

      case "7":
        const termo = entradaUser("Digite o nome do produto para buscar: ")!;
        estoque.pesquisarProduto(termo);
        break;

      case "0":
        console.log("Saindo...");
        break;

      default:
        console.log("Opção inválida! Tente novamente.");
    }
  }
}

// iniciar menu
menu();
