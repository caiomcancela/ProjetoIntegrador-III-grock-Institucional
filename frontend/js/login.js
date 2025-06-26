// js/login.js

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Impede o recarregamento padrão da página

    const email = document.getElementById('username').value; // O seu HTML usa 'username' como ID, mas enviaremos como email
    const password = document.getElementById('password').value;

    // Esconde a mensagem de erro a cada nova tentativa
    errorMessage.classList.add('d-none');

    try {
      // 1. Fazemos a requisição para o endpoint de login no nosso backend
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: password, // O backend espera a propriedade 'senha'
        }),
      });

      const data = await response.json();

      // 2. Verificamos se a resposta da API foi bem-sucedida
      if (!response.ok) {
        // Se a resposta não for OK (ex: 401 Unauthorized), lançamos um erro
        // para ser capturado pelo bloco 'catch' abaixo.
        throw new Error(data.message || 'Falha na autenticação');
      }

      // 3. Se o login for bem-sucedido, guardamos o token no localStorage
      if (data.access_token) {
        localStorage.setItem('grock_access_token', data.access_token);
        // Redirecionamos o utilizador para a página de conteúdo recomendado
        window.location.href = 'recomendados.html';
      } else {
        throw new Error('Token de acesso não recebido.');
      }

    } catch (error) {
      // 4. Se qualquer parte do processo falhar, mostramos a mensagem de erro
      console.error('Erro no login:', error);
      // Podemos personalizar a mensagem se quisermos
      // errorMessage.textContent = error.message;
      errorMessage.classList.remove('d-none');
    }
  });
});
