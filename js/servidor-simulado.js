// js/servidor-simulado.js

// --- CONFIGURAÇÃO DE SEGURANÇA (Em um app real, isso estaria no servidor e NUNCA no código do cliente) ---
const JWT_SECRET = 'seu-segredo-super-secreto-que-deve-ser-longo-e-complexo';

// --- BANCO DE DADOS DE USUÁRIOS SIMULADO ---
const users = {
    'admin': { password: '123', name: 'Administrador', roles: ['admin', 'editor'] },
    'leitor': { password: '456', name: 'Leitor Grow-pedia', roles: ['viewer'] }
};

// --- FUNÇÕES CORE DE JWT (USANDO A WEB CRYPTO API) ---

/**
 * Codifica uma string para o formato Base64Url, que é seguro para URLs.
 * @param {string} str A string a ser codificada.
 * @returns {string} A string em formato Base64Url.
 */
function base64UrlEncode(str) {
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

/**
 * Decodifica uma string do formato Base64Url.
 * @param {string} str A string a ser decodificada.
 * @returns {string} A string decodificada.
 */
function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    return atob(str);
}

/**
 * Cria a assinatura HMAC-SHA256 para o JWT.
 * @param {string} dataToSign Os dados a serem assinados (header.payload).
 * @param {string} secret O segredo usado para assinar.
 * @returns {Promise<ArrayBuffer>} A assinatura como um ArrayBuffer.
 */
async function createSignature(dataToSign, secret) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    return await crypto.subtle.sign('HMAC', key, encoder.encode(dataToSign));
}

/**
 * Verifica a assinatura do JWT.
 * @param {string} dataToVerify Os dados a serem verificados (header.payload).
 * @param {string} signature A assinatura recebida.
 * @param {string} secret O segredo.
 * @returns {Promise<boolean>} True se a assinatura for válida.
 */
async function verifySignature(dataToVerify, signature, secret) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
    );
    const signatureBuffer = new Uint8Array(signature.split('').map(c => c.charCodeAt(0))).buffer;
    return await crypto.subtle.verify('HMAC', key, signatureBuffer, encoder.encode(dataToVerify));
}


/**
 * Cria um JWT assinado.
 * @param {object} payload Os dados que você quer incluir no token.
 * @param {string} secret O segredo para assinar.
 * @param {number} expiresInSeconds O tempo de expiração em segundos.
 * @returns {Promise<string>} O token JWT completo.
 */
async function createJwt(payload, secret, expiresInSeconds = 3600) { // Expira em 1 hora por padrão
    const header = { alg: 'HS256', typ: 'JWT' };
    
    // Adiciona o tempo de expiração ('exp') ao payload
    payload.iat = Math.floor(Date.now() / 1000); // Issued at
    payload.exp = payload.iat + expiresInSeconds; // Expiration time

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const dataToSign = `${encodedHeader}.${encodedPayload}`;
    
    const signature = await createSignature(dataToSign, secret);
    const encodedSignature = base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));

    return `${dataToSign}.${encodedSignature}`;
}

/**
 * Verifica um JWT e retorna o payload se for válido.
 * @param {string} token O token JWT.
 * @param {string} secret O segredo.
 * @returns {Promise<object>} O payload decodificado.
 * @throws {Error} Se o token for inválido, malformado ou expirado.
 */
async function verifyJwt(token, secret) {
    if (!token) throw new Error("Token não fornecido.");

    const parts = token.split('.');
    if (parts.length !== 3) throw new Error("Token malformado.");

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const dataToVerify = `${encodedHeader}.${encodedPayload}`;
    const signature = base64UrlDecode(encodedSignature);

    const isValid = await verifySignature(dataToVerify, signature, secret);
    if (!isValid) throw new Error("Assinatura inválida.");

    const payload = JSON.parse(base64UrlDecode(encodedPayload));

    if (payload.exp < Math.floor(Date.now() / 1000)) {
        throw new Error("Token expirado.");
    }

    return payload;
}


// --- "ENDPOINTS" SIMULADOS DO SERVIDOR ---

export async function handleLogin(username, password) {
    console.log(`Tentativa de login para: ${username}`);
    const user = users[username];
    if (user && user.password === password) {
        // Credenciais corretas, gerar token
        const payload = {
            sub: username, // 'subject' (identificador do usuário)
            name: user.name,
            roles: user.roles
        };
        const token = await createJwt(payload, JWT_SECRET, 60 * 60); // Expira em 1 hora
        console.log("Login bem-sucedido. Token gerado.");
        return { success: true, token };
    } else {
        // Credenciais incorretas
        console.error("Falha no login: credenciais inválidas.");
        return { success: false, message: 'Usuário ou senha inválidos.' };
    }
}

export async function getProtectedContent(filePath, token) {
    try {
        console.log(`Verificando token para acessar: ${filePath}`);
        const payload = await verifyJwt(token, JWT_SECRET);
        console.log("Token válido. Payload:", payload);
        
        // Em um app real, você poderia verificar as 'roles' do payload aqui
        // ex: if (!payload.roles.includes('editor')) throw new Error("Permissão negada");

        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        return await response.text();

    } catch (error) {
        console.error("Erro de autorização:", error.message);
        // Retorna um HTML de erro para ser exibido ao usuário
        return `<div class="card"><h2>Acesso Negado</h2><p>Sua sessão pode ter expirado ou você não tem permissão. Por favor, faça o login novamente.</p><p><small>Detalhe do erro: ${error.message}</small></p></div>`;
    }
}