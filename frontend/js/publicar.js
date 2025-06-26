// js/publicar.js

document.addEventListener('DOMContentLoaded', () => {
  const publicarForm = document.getElementById('publicarForm');

  publicarForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('grock_access_token');
    if (!token) {
      alert('Você precisa estar logado para publicar um artigo.');
      window.location.href = 'login.html';
      return;
    }

    // **** INÍCIO DA MODIFICAÇÃO ****

    // 1. Coletar os dados em um objeto JavaScript, não em FormData.
    const tagsSelecionadas = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
      tagsSelecionadas.push(checkbox.value);
    });

    const dadosParaEnviar = {
      titulo: document.getElementById('titulo').value,
      conteudo: document.getElementById('conteudo').value,
      tags: tagsSelecionadas,
      // O campo de imagem é ignorado, pois não estamos mais enviando arquivos.
    };

    try {
      // 2. Fazer a requisição fetch com as novas opções para JSON.
      const response = await fetch(`${API_URL}/articles`, {
        method: 'POST',
        headers: {
          // 3. Definir explicitamente o Content-Type como application/json.
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        // 4. Converter o objeto JavaScript para uma string JSON.
        body: JSON.stringify(dadosParaEnviar),
      });

      // **** FIM DA MODIFICAÇÃO ****

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao publicar o artigo.');
      }

      alert('Artigo publicado com sucesso!');
      window.location.href = 'recomendados.html';

    } catch (error) {
      console.error('Erro ao publicar artigo:', error);
      alert(`Erro: ${error.message}`);
    }
  });
});