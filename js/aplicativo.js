// 'import' é uma instrução do ES6 (JavaScript moderno) que permite carregar funcionalidades de outros arquivos.
// Aqui, estamos importando a variável 'growpediaData' do arquivo 'dados.js'.
import growpediaData from './dados.js';
// Aqui, estamos importando várias funções específicas (generateMenu, displayContent, etc.) do arquivo 'interface-usuario.js'.
// A sintaxe com chaves {} é chamada de "named import" e importa funções que foram exportadas com 'export function'.
import { generateMenu, displayContent, updateActiveLink, toggleSubmenu, updateMenuAccessibility } from './interface-usuario.js';
import { getProtectedContent } from './servidor-simulado.js';
import { setupAuth, isUserLoggedIn, getToken, removeToken } from './autenticacao.js';

// --- SELETORES DE ELEMENTOS ---
// Esta seção armazena referências a elementos HTML importantes em constantes para acesso rápido e eficiente.
// 'document.getElementById' busca um elemento no HTML pelo seu atributo 'id'.

// 'navMenuElement' armazena a referência ao elemento <ul> com o id 'nav-menu', onde o menu será construído.
const navMenuElement = document.getElementById('nav-menu');
// 'optionsToggleBtn' armazena a referência ao botão ⚙️ que abre/fecha o menu de opções.
const optionsToggleBtn = document.getElementById('options-toggle-btn');
// 'optionsDropdown' armazena a referência à <div> do menu de opções que fica escondido.
const optionsDropdown = document.getElementById('options-dropdown');
// 'widthSlider' armazena a referência ao controle deslizante <input type="range">.
const widthSlider = document.getElementById('width-slider');
// 'contentWrapper' armazena a referência à <div> que envolve a área de conteúdo principal.
const contentWrapper = document.getElementById('content-wrapper');
// 'themeToggleBtn' armazena a referência ao botão que alterna os temas.
const themeToggleBtn = document.getElementById('theme-toggle-btn');

const loginContainer = document.getElementById('login-container');
const appContainers = [document.querySelector('.sidebar'), document.querySelector('.main-content')];
const logoutBtn = document.getElementById('logout-btn');

// --- FUNÇÕES DE LÓGICA ---
// Esta seção contém funções "puras" que manipulam dados, sem interagir diretamente com o HTML.

// 'findItemById' é uma função recursiva que busca um objeto dentro da estrutura 'growpediaData' com base no seu 'id'.
function findItemById(id, data = growpediaData) {
    // 'for...of' percorre cada objeto 'item' no array 'data'.
    for (const item of data) {
        // 'if (item.id === id)' verifica se o id do item atual é o que estamos procurando.
        if (item.id === id) return item; // Se for, a função retorna o objeto encontrado e para a execução.
        // 'if (item.children)' verifica se o item atual tem um submenu (um array 'children').
        if (item.children) {
            // Se tiver, a função chama a si mesma (recursão) para procurar dentro desse submenu.
            const found = findItemById(id, item.children);
            // 'if (found)' verifica se a busca recursiva encontrou o item.
            if (found) return found; // Se encontrou, retorna o resultado para cima na "pilha" de chamadas.
        }
    }
    // 'return null' é executado se o loop terminar sem encontrar o item.
    return null;
}

// 'findParentOf' é uma função recursiva que encontra o objeto pai de um item com base no 'childId'.
function findParentOf(childId, data = growpediaData) {
    // Percorre cada 'item' no array de dados.
    for (const item of data) {
        // 'if (item.children...)' verifica se o item atual tem filhos.
        // '.some(child => child.id === childId)' verifica se ALGUM dos filhos tem o id que procuramos.
        if (item.children && item.children.some(child => child.id === childId)) {
            // Se a condição for verdadeira, 'item' é o pai que estamos procurando.
            return item;
        }
        // Se não for o pai direto, mas tiver filhos, precisamos procurar nos subníveis.
        if (item.children) {
            // Chama a si mesma (recursão) para procurar nos filhos do item atual.
            const foundParent = findParentOf(childId, item.children);
            // Se a busca recursiva encontrou o pai em um nível mais profundo, retorna o resultado.
            if (foundParent) {
                return foundParent;
            }
        }
    }
    // Retorna 'null' se nenhum pai for encontrado em toda a estrutura.
    return null;
}

// 'async function' define uma função assíncrona, que pode usar 'await' para esperar por operações demoradas (como requisições de rede).
async function loadContent(filePath) {
    const token = getToken();
    if (!token) {
        // Se por algum motivo não houver token, exibe erro e força o logout.
        removeToken();
        window.location.reload();
        return;
    }
    // A chamada agora vai para o nosso "endpoint" protegido
    return await getProtectedContent(filePath, token);
}

// --- FUNÇÕES DE EVENTOS ---
// Esta seção contém funções que são acionadas por interações do usuário.

// 'handleNavClick' é a função principal que gerencia o que acontece quando um item do menu é clicado. 'event' é o objeto do evento de clique.
async function handleNavClick(event) {
    // 'event.target' é o elemento exato que foi clicado. '.closest('.nav-item')' encontra o ancestral mais próximo com a classe '.nav-item'.
    const navItem = event.target.closest('.nav-item');
    // 'if (!navItem) return;' se o clique não foi em um '.nav-item' ou dentro de um, a função para.
    if (!navItem) return;

    // 'event.preventDefault();' impede qualquer comportamento padrão do navegador (como seguir um link, se houvesse um).
    event.preventDefault();
    // 'navItem.dataset.id' recupera o valor do atributo 'data-id' do elemento HTML.
    const id = navItem.dataset.id;
    // 'const item = findItemById(id);' usa a função de busca para encontrar o objeto de dados correspondente.
    const item = findItemById(id);

    // 'if (!item) return;' se nenhum item for encontrado nos dados (pouco provável, mas é uma boa prática), a função para.
    if (!item) return;

    // --- LÓGICA HÍBRIDA ---
    // Esta lógica permite que um item de menu seja tanto uma "pasta" (expansível) quanto um "arquivo" (com conteúdo).

    // AÇÃO 1: 'if (item.children && item.children.length > 0)' verifica se o item tem um array 'children' com pelo menos um filho.
    if (item.children && item.children.length > 0) {
        // Se tiver, chama a função 'toggleSubmenu' (de interface-usuario.js) para mostrar ou esconder o submenu.
        toggleSubmenu(navItem);
    }

    // AÇÃO 2: 'if (item.contentFile)' verifica se o item tem uma propriedade 'contentFile'. Esta ação é independente da Ação 1.
    if (item.contentFile) {
        // Se tiver, chama 'loadContent' para buscar o conteúdo do arquivo HTML.
        const htmlContent = await loadContent(item.contentFile);
        // Chama 'displayContent' (de interface-usuario.js) para exibir o conteúdo carregado na página.
        displayContent(htmlContent);

        // 'const parentItem = findParentOf(id);' chama a função para encontrar o pai do item clicado.
        const parentItem = findParentOf(id);
        
        // 'updateActiveLink' (de interface-usuario.js) é chamada para atualizar os estilos visuais (destaques).
        // 'parentItem ? parentItem.id : null' é um operador ternário: se 'parentItem' existir, passa seu id; senão, passa 'null'.
        updateActiveLink(id, parentItem ? parentItem.id : null);
    }
}

// 'setupViewOptions' configura todos os ouvintes de eventos para o menu de opções.
function setupViewOptions() {
    // 'addEventListener' anexa uma função para ser executada quando um evento específico (neste caso, 'click') ocorre.
    optionsToggleBtn.addEventListener('click', () => {
        // '.classList.toggle('visible')' adiciona a classe 'visible' se ela não existir, e a remove se existir.
        const isVisible = optionsDropdown.classList.toggle('visible');
        // Atualiza os atributos 'aria' para acessibilidade, informando aos leitores de tela se o menu está visível ou não.
        optionsDropdown.setAttribute('aria-hidden', !isVisible);
        optionsToggleBtn.setAttribute('aria-expanded', isVisible);
    });

    

    // Adiciona um ouvinte de clique ao documento inteiro para fechar o dropdown se o clique for fora dele.
    document.addEventListener('click', (event) => {
        // '.contains(event.target)' verifica se o elemento clicado está dentro do botão de opções ou do próprio dropdown.
        if (!optionsToggleBtn.contains(event.target) && !optionsDropdown.contains(event.target)) {
            // Se o clique foi fora, remove a classe 'visible' para esconder o dropdown.
            optionsDropdown.classList.remove('visible');
            // Atualiza os atributos 'aria' para refletir que o menu está escondido.
            optionsDropdown.setAttribute('aria-hidden', 'true');
            optionsToggleBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Adiciona um ouvinte ao evento 'input' do slider. Este evento dispara continuamente enquanto o slider é movido.
    widthSlider.addEventListener('input', (event) => {
        // 'event.target.value' obtém o valor atual do slider.
        const newWidth = event.target.value + 'px';
        // 'contentWrapper.style.maxWidth' altera a propriedade CSS 'max-width' do elemento em tempo real.
        contentWrapper.style.maxWidth = newWidth;
        // 'localStorage.setItem' salva a preferência de largura no armazenamento local do navegador para que seja lembrada na próxima visita.
        localStorage.setItem('readingWidth', newWidth);
    });
    
    // Adiciona um ouvinte de clique ao botão de alternar tema.
    themeToggleBtn.addEventListener('click', () => {
        // 'document.body.dataset.theme' obtém o valor do atributo 'data-theme' do <body>.
        const currentTheme = document.body.dataset.theme;
        // Operador ternário para alternar entre 'dark' e 'light'.
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        // Define o novo tema no atributo 'data-theme' do <body>, o que ativa as regras CSS correspondentes.
        document.body.dataset.theme = newTheme;
        // Salva a nova preferência de tema no localStorage.
        localStorage.setItem('theme', newTheme);
    });
}

// --- NOVA FUNÇÃO PARA GERENCIAR A VISIBILIDADE DA UI ---
function updateUiForAuthState() {
    if (isUserLoggedIn()) {
        // Usuário logado: esconde o login, mostra o app e o botão de logout
        loginContainer.classList.add('hidden');
        appContainers.forEach(el => el.style.visibility = 'visible');
        logoutBtn.classList.remove('hidden');
    } else {
        // Usuário deslogado: mostra o login, esconde o app
        loginContainer.classList.remove('hidden');
        appContainers.forEach(el => el.style.visibility = 'hidden');
    }
}


// 'applySavedPreferences' lê as preferências salvas do localStorage e as aplica quando a página carrega.
function applySavedPreferences() {
    // 'localStorage.getItem' recupera um valor salvo.
    const savedWidth = localStorage.getItem('readingWidth');
    // 'if (savedWidth)' verifica se um valor foi encontrado.
    if (savedWidth) {
        // Aplica a largura salva.
        contentWrapper.style.maxWidth = savedWidth;
        // 'parseInt(savedWidth, 10)' converte a string (ex: "800px") para um número para atualizar a posição do slider.
        widthSlider.value = parseInt(savedWidth, 10);
    }
    
    // Recupera o tema salvo. Se não houver, usa 'light' como padrão.
    const savedTheme = localStorage.getItem('theme') || 'light';
    // Aplica o tema salvo.
    document.body.dataset.theme = savedTheme;
}

// --- MODIFICAR A INICIALIZAÇÃO DO APP ---
async function initializeApp() {
    generateMenu(growpediaData);
    updateMenuAccessibility();
    applySavedPreferences();
    
    const initialItem = findItemById('welcome');
    if (initialItem?.contentFile) {
        const initialContent = await loadContent(initialItem.contentFile);
        
        if (initialContent.includes('Acesso Negado')) {
            // Se o token for inválido/expirado, força o logout
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

// 3. ✨ A NOVA FUNÇÃO ORQUESTRADORA (A CHAVE DA CORREÇÃO) ✨
// Esta função será o callback que passaremos para o sistema de autenticação.
// Ela é chamada APENAS após um login bem-sucedido.
function handleSuccessfulLogin() {
    console.log("Login bem-sucedido! Atualizando UI e inicializando o app...");
    
    // PASSO 1: Imediatamente atualiza a interface para mostrar o app.
    updateUiForAuthState();
    
    // PASSO 2: Agora que a UI está visível, inicializa o conteúdo.
    initializeApp();
}

// 4. O NOVO FLUXO DE INICIALIZAÇÃO PRINCIPAL
function main() {
    // Configura os eventos de autenticação e passa a nossa nova função orquestradora
    // como o que fazer quando o login for um sucesso.
    setupAuth(handleSuccessfulLogin); 

    // Ao carregar a página, verifica se o usuário JÁ ESTÁ logado (ex: por um token salvo)
    if (isUserLoggedIn()) {
        // Se já está logado, chama a mesma função de sucesso diretamente.
        handleSuccessfulLogin();
    } else {
        // Se não está logado, apenas garante que a tela de login esteja visível.
        updateUiForAuthState();
    }
}

// Inicia todo o processo
main();