import { findItemById, findParentOf } from './data-utils.js';
import { displayContent, updateActiveLink, toggleSubmenu } from '../interface-usuario.js';
import { loadContent } from './load-content.js';

export async function handleNavClick(event) {
    const navItem = event.target.closest('.nav-item');
    if (!navItem) return;
    event.preventDefault();
    const id = navItem.dataset.id;
    const item = findItemById(id);
    if (!item) return;
    if (item.children && item.children.length > 0) {
        toggleSubmenu(navItem);
    }
    if (item.contentFile) {
        const htmlContent = await loadContent(item.contentFile);
        displayContent(htmlContent);
        const parentItem = findParentOf(id);
        updateActiveLink(id, parentItem ? parentItem.id : null);
    }
}

export function setupViewOptions() {
    const optionsToggleBtn = document.getElementById('options-toggle-btn');
    const optionsDropdown = document.getElementById('options-dropdown');
    const widthSlider = document.getElementById('width-slider');
    const contentWrapper = document.getElementById('content-wrapper');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    if (optionsToggleBtn && optionsDropdown) {
        optionsToggleBtn.addEventListener('click', () => {
            const isVisible = optionsDropdown.classList.toggle('visible');
            optionsDropdown.setAttribute('aria-hidden', !isVisible);
            optionsToggleBtn.setAttribute('aria-expanded', isVisible);
        });

        document.addEventListener('click', (event) => {
            if (!optionsToggleBtn.contains(event.target) && !optionsDropdown.contains(event.target)) {
                optionsDropdown.classList.remove('visible');
                optionsDropdown.setAttribute('aria-hidden', 'true');
                optionsToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (widthSlider && contentWrapper) {
        widthSlider.addEventListener('input', (event) => {
            const newWidth = event.target.value + 'px';
            contentWrapper.style.maxWidth = newWidth;
            localStorage.setItem('readingWidth', newWidth);
        });
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.dataset.theme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.dataset.theme = newTheme;
            localStorage.setItem('theme', newTheme);
        });
    }
}