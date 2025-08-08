import { setupAuth, isUserLoggedIn } from '../autenticacao.js';
import { updateUiForAuthState } from './ui.js';
import { initializeApp } from './init.js';

function handleSuccessfulLogin() {
    updateUiForAuthState();
    initializeApp();
}

function main() {
    setupAuth(handleSuccessfulLogin);
    if (isUserLoggedIn()) {
        handleSuccessfulLogin();
    } else {
        updateUiForAuthState();
    }
}

main();