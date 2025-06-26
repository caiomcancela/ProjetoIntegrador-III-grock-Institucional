// js/artigo.js

document.addEventListener('DOMContentLoaded', () => {
    // --- SELETORES DE ELEMENTOS DO DOM ---
    const articleContainer = document.getElementById('artigo-content');
    const commentsContainer = document.getElementById('comentarios-container');
    const commentForm = document.getElementById('comentario-form');
    const loadingIndicator = document.getElementById('loading');
    
    // Pegamos o ID do artigo a partir dos parâmetros da URL (?id=...)
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
  
    // --- FUNÇÕES DE RENDERIZAÇÃO ---
  
    // Preenche a página com os dados do artigo
    function renderizarArtigo(artigo) {
      document.title = `${artigo.titulo} - GROCK`; // Atualiza o título da aba
      articleContainer.querySelector('h1').textContent = artigo.titulo;
      articleContainer.querySelector('.article-content').innerHTML = artigo.conteudo;
    

      articleContainer.querySelector('header .fw-bold').textContent = artigo.autor.nome;
      const dataFormatada = new Date(artigo.dataPublicacao).toLocaleDateString('pt-BR');
      const tempoLeitura = artigo.tempoLeitura ? `• ${artigo.tempoLeitura} min de leitura` : '';
      articleContainer.querySelector('header .text-secondary small').textContent = `Publicado em ${dataFormatada} ${tempoLeitura}`;
  
      const tagsContainer = articleContainer.querySelector('header .d-flex.gap-2');
      tagsContainer.innerHTML = artigo.tags.map(tag => `<span class="badge bg-primary">${tag.nome}</span>`).join('');
    }
  
    // Preenche a seção de comentários
    function renderizarComentarios(comentarios) {
      commentsContainer.innerHTML = ''; // Limpa comentários antigos
      if (comentarios.length === 0) {
        commentsContainer.innerHTML = '<p class="text-secondary">Nenhum comentário ainda. Seja o primeiro a comentar!</p>';
        return;
      }
      comentarios.forEach(comentario => {
        const dataFormatada = new Date(comentario.data).toLocaleDateString('pt-BR');
        const commentHTML = `
          <div class="d-flex mb-4">
              <div class="flex-grow-1">
                  <h6 class="mb-1">${comentario.autor.nome}</h6>
                  <p class="text-secondary mb-2">
                      <small>${dataFormatada}</small>
                  </p>
                  <p class="mb-0">${comentario.conteudo}</p>
              </div>
          </div>
        `;
        commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
      });
    }
  
  
    // --- FUNÇÕES DE LÓGICA E API ---
  
    // Função principal que carrega os dados da página
    async function carregarPaginaArtigo() {
      if (!articleId) {
        window.location.href = 'noticias.html';
        return;
      }
  
      loadingIndicator.style.display = 'block';
      articleContainer.style.display = 'none';
  
      try {
        // Usamos Promise.all para fazer as duas requisições em paralelo,
        // o que é mais rápido do que fazer uma depois da outra.
        const [articleResponse, commentsResponse] = await Promise.all([
          fetch(`${API_URL}/articles/${articleId}`),
          fetch(`${API_URL}/articles/${articleId}/comments`)
        ]);
  
        if (!articleResponse.ok) throw new Error('Artigo não encontrado.');
        
        const artigo = await articleResponse.json();
        const comentarios = await commentsResponse.json();
  
        renderizarArtigo(artigo);
        renderizarComentarios(comentarios);
  
      } catch (error) {
        console.error('Erro ao carregar a página do artigo:', error);
        loadingIndicator.innerHTML = `<p class="text-danger text-center">Erro ao carregar o artigo. Tente novamente.</p>`;
      } finally {
        // Esconde o indicador de "carregando" e mostra o conteúdo do artigo
        loadingIndicator.style.display = 'none';
        articleContainer.style.display = 'block';
      }
    }
  
    // Função para lidar com o envio de um novo comentário
    async function handleCommentSubmit(event) {
      event.preventDefault();
  
      const token = localStorage.getItem('grock_access_token');
      // Se não houver token, redireciona para a página de login
      if (!token) {
        alert('Você precisa estar logado para comentar.');
        window.location.href = 'login.html';
        return;
      }
  
      const commentText = document.getElementById('commentText').value;
      if (!commentText.trim()) {
        alert('O comentário não pode estar vazio.');
        return;
      }
  
      try {
        const response = await fetch(`${API_URL}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Enviamos o token no cabeçalho para autenticação
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            conteudo: commentText,
            articleId: articleId
          })
        });
  
        if (!response.ok) {
          throw new Error('Falha ao enviar o comentário.');
        }
  
        // Se o comentário foi enviado com sucesso, limpamos o campo
        // e recarregamos a lista de comentários para mostrar o novo.
        document.getElementById('commentText').value = '';
        const commentsResponse = await fetch(`${API_URL}/articles/${articleId}/comments`);
        const comentarios = await commentsResponse.json();
        renderizarComentarios(comentarios);
  
      } catch (error) {
        console.error('Erro ao postar comentário:', error);
        alert('Ocorreu um erro ao enviar seu comentário. Tente novamente.');
      }
    }
  
    // --- INICIALIZAÇÃO ---
  
    // Adiciona o "ouvinte" de evento ao formulário de comentário
    if (commentForm) {
      commentForm.addEventListener('submit', handleCommentSubmit);
    }
    
  
    // Carrega os dados da página assim que o DOM estiver pronto
    carregarPaginaArtigo();
  });
  