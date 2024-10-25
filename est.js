// Função para cadastrar um estudante
function cadastrarEstudante() {
    // Obter os dados do formulário
    const anoLetivo = document.getElementById('anoLetivo').value;
    const nome = document.getElementById('nome').value;
    const turma = document.getElementById('turma').value;
    const responsaveis = document.getElementById('responsaveis').value;
    const telefoneEstudante = document.getElementById('telefoneEstudante').value;
    const telefoneResponsaveis = document.getElementById('telefoneResponsaveis').value;
    const endereco = document.getElementById('endereco').value;
    const problemaSaude = document.getElementById('problemaSaude').value;
    const cgm = document.getElementById('cgm').value;
    const cpf = document.getElementById('cpf').value;
    const foto = document.getElementById('foto').files[0]; // Obter o arquivo da foto
  
    // Criar um FormData para enviar os dados do formulário
    const formData = new FormData();
    formData.append('anoLetivo', anoLetivo);
    formData.append('nome', nome);
    formData.append('turma', turma);
    formData.append('responsaveis', responsaveis);
    formData.append('telefoneEstudante', telefoneEstudante);
    formData.append('telefoneResponsaveis', telefoneResponsaveis);
    formData.append('endereco', endereco);
    formData.append('problemaSaude', problemaSaude);
    formData.append('cgm', cgm);
    formData.append('cpf', cpf);
    formData.append('foto', foto);
  
    // Fazer a requisição para a API do backend
    fetch('/estudantes', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // Exibir mensagem de sucesso
        alert('Estudante cadastrado com sucesso!');
        // Limpar o formulário
        document.getElementById('form-estudante').reset();
        // Recarregar a lista de estudantes
        listarEstudantes();
      } else {
        // Exibir mensagem de erro
        alert('Erro ao cadastrar estudante!');
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }
  
  // Função para listar estudantes
  function listarEstudantes() {
    // Fazer a requisição para a API do backend
    fetch('/estudantes')
    .then(response => response.json())
    .then(estudantes => {
      // Limpar a tabela
      const tabelaEstudantes = document.getElementById('lista-estudantes').querySelector('tbody');
      tabelaEstudantes.innerHTML = '';
      // Adicionar os estudantes à tabela
      estudantes.forEach(estudante => {
        const linha = tabelaEstudantes.insertRow();
        linha.insertCell().textContent = estudante.cgm;
        linha.insertCell().textContent = estudante.nome;
        linha.insertCell().textContent = estudante.turma;
        // ... outros campos
        // Adicionar botões de ação (ex: editar, excluir)
      });
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }
  
  // Função para registrar uma ocorrência
  function registrarOcorrencia() {
    // Obter os dados do formulário
    const dataOcorrido = document.getElementById('dataOcorrido').value;
    const registro = document.getElementById('registro').value;
    const cgmEstudante = document.getElementById('cgmEstudante').value;
    const adendos = document.getElementById('adendos').value;
    const arquivo = document.getElementById('arquivo').files[0]; // Obter o arquivo
  
    // Criar um FormData para enviar os dados do formulário
    const formData = new FormData();
    formData.append('dataOcorrido', dataOcorrido);
    formData.append('registro', registro);
    formData.append('cgmEstudante', cgmEstudante);
    formData.append('adendos', adendos);
    formData.append('arquivo', arquivo);
  
    // Fazer a requisição para a API do backend
    fetch('/ocorrencias', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // Exibir mensagem de sucesso
        alert('Ocorrência registrada com sucesso!');
        // Limpar o formulário
        document.getElementById('form-ocorrencia').reset();
      } else {
        // Exibir mensagem de erro
        alert('Erro ao registrar ocorrência!');
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }
  
  // Função para pesquisar estudantes
  function pesquisarEstudante() {
    // Obter os dados do formulário
    const criterioPesquisa = document.getElementById('criterioPesquisa').value;
    const valorPesquisa = document.getElementById('valorPesquisa').value;
  
    // Construir a URL da API com os parâmetros de pesquisa
    const url = `/estudantes?criterio=${criterioPesquisa}&valor=${valorPesquisa}`;
  
    // Fazer a requisição para a API do backend
    fetch(url)
    .then(response => response.json())
    .then(estudantes => {
      // Limpar a div de resultados
      const resultadosPesquisa = document.getElementById('resultados-pesquisa');
      resultadosPesquisa.innerHTML = '';
  
      // Exibir os resultados da pesquisa
      if (estudantes.length > 0) {
        const tabelaResultados = document.createElement('table');
        const thead = tabelaResultados.createTHead();
        const row = thead.insertRow();
        row.insertCell().textContent = 'CGM';
        row.insertCell().textContent = 'Nome';
        row.insertCell().textContent = 'Turma';
        // ... outros campos
  
        const tbody = tabelaResultados.createTBody();
        estudantes.forEach(estudante => {
          const linha = tbody.insertRow();
          linha.insertCell().textContent = estudante.cgm;
          linha.insertCell().textContent = estudante.nome;
          linha.insertCell().textContent = estudante.turma;
          // ... outros campos
        });
  
        resultadosPesquisa.appendChild(tabelaResultados);
      } else {
        resultadosPesquisa.textContent = 'Nenhum estudante encontrado.';
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });
  }
  
  // Função para pesquisar ocorrências
  function pesquisarOcorrencia() {
    // Obter os dados do formulário
    const criterioPesquisa = document.getElementById('criterioPesquisaOcorrencia').value;
    const valorPesquisa = document.getElementById('valorPesquisaOcorrencia').value;
  
    // Construir a URL da API com os parâmetros de pesquisa
    const url = `/ocorrencias?criterio=${criterioPesquisa}&valor=${valorPesquisa}`;
  
    // Fazer a requisição para a API do backend
    fetch(url)
    .then(response => response.json())
    .then(ocorrencias => {
      // Limpar a div de resultados
      const resultadosPesquisa = document.getElementById('resultados-pesquisa-ocorrencia');
      resultadosPesquisa.innerHTML = '';
  
      // Exibir os resultados da pesquisa
      if (ocorrencias.length > 0) {
        const tabelaResultados = document.createElement('table');
        const thead = tabelaResultados.createTHead();
        const row = thead.insertRow();
        row.insertCell().textContent = 'Data';
        row.insertCell().textContent = 'Registro';
        row.insertCell().textContent = 'CGM do Estudante';
        // ... outros campos
  
        const tbody = tabelaResultados.createTBody();
        ocorrencias.forEach(ocorrencia => {
          const linha = tbody.insertRow();
          linha.insertCell().textContent = ocorrencia.dataOcorrido;
          linha.insertCell().textContent = ocorrencia.registro;
          linha.insertCell().textContent = ocorrencia.cgmEstudante;
          // ... outros campos