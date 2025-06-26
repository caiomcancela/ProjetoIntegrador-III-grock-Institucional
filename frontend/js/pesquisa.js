// js/pesquisa.js
document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feedContainer');
    // **** INÍCIO DA MODIFICAÇÃO ****
    // Trocamos querySelector por getElementById para um seletor mais confiável.
    const tagFilter = document.getElementById('tag-filter'); 
    // **** FIM DA MODIFICAÇÃO ****
  
    async function buscarERenderizarArtigos(tag = '') {
      if (!feedContainer) return;
      feedContainer.innerHTML = '<p class="text-center text-secondary">Buscando artigos...</p>';
  
      const url = tag ? `${API_URL}/articles?tag=${tag}` : `${API_URL}/articles`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao buscar artigos.');
        
        const artigos = await response.json();
        renderizarArtigos(artigos);
      } catch (error) {
        console.error('Erro:', error);
        feedContainer.innerHTML = '<p class="text-center text-danger">Não foi possível carregar os artigos.</p>';
      }
    }
  
    function renderizarArtigos(artigos) {
      feedContainer.innerHTML = '';
      if (!artigos || artigos.length === 0) {
        feedContainer.innerHTML = '<p class="text-center text-secondary">Nenhum artigo encontrado.</p>';
        return;
      }
  
      artigos.forEach(artigo => {
        const resumo = artigo.conteudo.substring(0, 100) + '...';
        const cardHTML = `
          <div class="col">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${artigo.titulo}</h5>
                <p class="card-text text-secondary">${resumo}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <div>${artigo.tags.map(tag => `<span class="badge bg-primary me-1">${tag.nome}</span>`).join('')}</div>
                  <a href="artigo.html?id=${artigo.id}" class="btn btn-outline-primary btn-sm">Ler Artigo</a>
                </div>
              </div>
            </div>
          </div>`;
        feedContainer.insertAdjacentHTML('beforeend', cardHTML);
      });
    }
  
    if (tagFilter) {
      tagFilter.addEventListener('change', () => {
        const selectedTag = tagFilter.value;
        // Usamos a opção "Filtrar por tag" para limpar o filtro
        if (selectedTag === 'Filtrar por tag' || !selectedTag) {
           buscarERenderizarArtigos(''); 
        } else {
           buscarERenderizarArtigos(selectedTag);
        }
      });
    }
  
    buscarERenderizarArtigos('');
  });