import { getToken, removeToken } from '../autenticacao.js';
import { getProtectedContent } from '../servidor-simulado.js';

export async function loadContent(filePath) {
    const token = getToken();
    if (!token) {
        removeToken();
        window.location.reload();
        return;
    }
    return await getProtectedContent(filePath, token);
}