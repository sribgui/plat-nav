import { isUserLoggedIn } from '../autenticacao.js';

const loginContainer = document.getElementById('login-container');
const appContainers = document.querySelectorAll('.app-container');
const logoutBtn = document.getElementById('logout-btn');

export function updateUiForAuthState() {
    if (isUserLoggedIn()) {
        if (loginContainer) loginContainer.classList.add('hidden');
        appContainers.forEach(el => el.style.visibility = 'visible');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
    } else {
        if (loginContainer) loginContainer.classList.remove('hidden');
        appContainers.forEach(el => el.style.visibility = 'hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
    }
}