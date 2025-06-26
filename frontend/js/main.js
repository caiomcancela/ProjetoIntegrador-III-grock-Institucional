// js/main.js

document.addEventListener('DOMContentLoaded', () => {
  // Selecionamos o container onde os cards dos artigos serão inseridos.
  const feedContainer = document.getElementById('feedContainer');

  // Função assíncrona para buscar os artigos da nossa API.
  async function carregarArtigos() {
    // Verificamos se o container de feed existe na página atual.
    if (!feedContainer) {
      console.log('Container de feed não encontrado nesta página.');
      return;
    }

    try {
      // Fazemos a chamada GET para o endpoint que lista todos os artigos.
      const response = await fetch(`${API_URL}/articles`);

      if (!response.ok) {
        throw new Error('Falha ao carregar os artigos da API.');
      }

      const artigos = await response.json();

      // Chamamos a função para renderizar os artigos na tela.
      renderizarArtigos(artigos);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
      feedContainer.innerHTML = '<p class="text-center text-secondary">Não foi possível carregar os artigos. Tente novamente mais tarde.</p>';
    }
  }

  // Função para renderizar os artigos no HTML.
  function renderizarArtigos(artigos) {
    // Limpa qualquer conteúdo existente no container.
    feedContainer.innerHTML = '';

    if (artigos.length === 0) {
      feedContainer.innerHTML = '<p class="text-center text-secondary">Nenhum artigo publicado ainda.</p>';
      return;
    }

    // Para cada artigo recebido da API, criamos um card.
    artigos.forEach(artigo => {
      // Cria um resumo do conteúdo para não exibir o texto completo no card.
      const resumo = artigo.conteudo.substring(0, 100) + '...';

      // Formata a data de publicação para o padrão brasileiro.
      const dataFormatada = new Date(artigo.dataPublicacao).toLocaleDateString('pt-BR');

      const cardHTML = `
        <div class="col">
          <div class="card h-100 d-flex flex-column">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${artigo.titulo}</h5>
              <p class="card-text text-secondary">${resumo}</p>
              <div class="mt-auto">
                <p class="mb-1"><small class="text-muted">Por: ${artigo.autor.nome}</small></p>
                <p class="mb-0"><small class="text-muted">Publicado em: ${dataFormatada}</small></p>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <div>
                ${artigo.tags.map(tag => `<span class="badge bg-primary me-1">${tag.nome}</span>`).join('')}
              </div>
              <a href="artigo.html?id=${artigo.id}" class="btn btn-outline-primary btn-sm">
                Ler Artigo
              </a>
            </div>
          </div>
        </div>`;
      
      feedContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
  }

  // Chamamos a função principal para carregar os artigos assim que a página é carregada.
  carregarArtigos();
});
