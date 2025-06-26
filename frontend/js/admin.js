// js/admin.js

document.addEventListener('DOMContentLoaded', () => {
  const articlesTableBody = document.getElementById('articlesTableBody');
  const token = localStorage.getItem('grock_access_token');

  // Função para carregar e renderizar os artigos na tabela
  async function carregarArtigos() {
    try {
      // 1. Busca todos os artigos na API (endpoint público)
      const response = await fetch(`${API_URL}/articles`);
      if (!response.ok) {
        throw new Error('Falha ao carregar artigos.');
      }
      const articles = await response.json();

      // Limpa a tabela antes de adicionar as novas linhas
      articlesTableBody.innerHTML = '';

      // 2. Cria uma linha na tabela para cada artigo
      articles.forEach(article => {
        const dataFormatada = new Date(article.dataPublicacao).toLocaleDateString('pt-BR');
        const row = `
          <tr data-id="${article.id}">
            <td>${article.titulo}</td>
            <td>${dataFormatada}</td>
            <td><span class="badge bg-success">Publicado</span></td>
            <td>
              <button class="btn btn-sm btn-primary me-1 btn-edit">Editar</button>
              <button class="btn btn-sm btn-danger btn-delete">Excluir</button>
            </td>
          </tr>
        `;
        articlesTableBody.insertAdjacentHTML('beforeend', row);
      });
    } catch (error) {
      console.error('Erro:', error);
      articlesTableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">Erro ao carregar artigos.</td></tr>`;
    }
  }

  // Função para lidar com os cliques na tabela (deleção e edição)
  async function handleTableClick(event) {
    const target = event.target;
    const row = target.closest('tr');
    if (!row) return;
    
    const articleId = row.dataset.id;

    // Ação de DELETAR
    if (target.classList.contains('btn-delete')) {
      // Confirmação antes de deletar
      if (!confirm('Tem a certeza de que deseja excluir este artigo?')) {
        return;
      }

      if (!token) {
        alert('A sua sessão expirou. Por favor, faça login novamente como administrador.');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/articles/${articleId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Envia o token de admin
          },
        });

        if (response.status === 204) {
          alert('Artigo excluído com sucesso!');
          row.remove(); // Remove a linha da tabela na interface
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Falha ao excluir o artigo.');
        }
      } catch (error) {
        console.error('Erro ao excluir:', error);
        alert(`Erro: ${error.message}`);
      }
    }

    // Ação de EDITAR
    if (target.classList.contains('btn-edit')) {
      // Redireciona para a página de publicação, passando o ID do artigo como parâmetro
      // A página 'publicar.html' precisará ser adaptada para ler este parâmetro e carregar os dados do artigo.
      window.location.href = `publicar.html?edit=${articleId}`;
    }
  }

  // Carrega os artigos assim que a página é carregada
  carregarArtigos();

  // Adiciona um único "ouvinte" de eventos à tabela para gerenciar todos os cliques
  articlesTableBody.addEventListener('click', handleTableClick);
});
