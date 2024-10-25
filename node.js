document.getElementById('form-estudante').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    // Obter os dados do formulário
    const anoLetivo = document.getElementById('anoLetivo').value;
    const nome = document.getElementById('nome').value;
    // ... outros campos
  
    // Fazer a requisição para a API do backend
    fetch('/estudantes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        anoLetivo: anoLetivo,
        nome: nome,
        // ... outros campos
      })
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
  });
  
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
  
  // Carregar a lista de estudantes ao iniciar a página
  listarEstudantes();