// js/autenticacao.js

import { handleLogin } from './servidor-simulado.js';

const TOKEN_KEY = 'growpedia_jwt';

export function storeToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function isUserLoggedIn() {
    const token = getToken();
    // Poderia adicionar uma verificação de expiração aqui no futuro, mas por enquanto,
    // a simples existência do token é suficiente para o fluxo da UI.
    return !!token;
}

export function setupAuth(onLoginSuccess) {
    const loginContainer = document.getElementById('login-container');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        loginError.classList.add('hidden');

        const result = await handleLogin(username, password);

        if (result.success) {
            storeToken(result.token);
            onLoginSuccess(); // Chama o callback para inicializar o app
        } else {
            loginError.textContent = result.message;
            loginError.classList.remove('hidden');
        }
    });

    logoutBtn.addEventListener('click', () => {
        removeToken();
        // Recarrega a página para forçar a tela de login
        window.location.reload();
    });
}