import growpediaData from '../dados.js';

// Busca recursiva por ID
export function findItemById(id, data = growpediaData) {
    for (const item of data) {
        if (item.id === id) return item;
        if (item.children) {
            const found = findItemById(id, item.children);
            if (found) return found;
        }
    }
    return null;
}

// Busca recursiva pelo pai de um item
export function findParentOf(childId, data = growpediaData) {
    for (const item of data) {
        if (item.children && item.children.some(child => child.id === childId)) {
            return item;
        }
        if (item.children) {
            const foundParent = findParentOf(childId, item.children);
            if (foundParent) return foundParent;
        }
    }
    return null;
}