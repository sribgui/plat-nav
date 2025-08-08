import growpediaData from '../dados.js';
import { findItemById } from './data-utils.js';
import { applySavedPreferences } from './preferences.js';
import { handleNavClick, setupViewOptions } from './events-handler.js';
import { generateMenu, displayContent, updateActiveLink, updateMenuAccessibility } from '../interface-usuario.js';
import { navMenuElement } from './dom-elements.js';
import { removeToken } from '../autenticacao.js';

export async function initializeApp() {
    const { getProtectedContent } = await import('../servidor-simulado.js');
    const { getToken } = await import('../autenticacao.js');

    generateMenu(growpediaData);
    updateMenuAccessibility();
    applySavedPreferences();

    const initialItem = findItemById('welcome');
    if (initialItem?.contentFile) {
        const token = getToken();
        const initialContent = await getProtectedContent(initialItem.contentFile, token);

        if (initialContent.includes('Acesso Negado')) {
            removeToken();
            window.location.reload();
            return;
        }

        displayContent(initialContent);
        updateActiveLink('welcome');
    }

    navMenuElement.addEventListener('click', handleNavClick);
    setupViewOptions();
}