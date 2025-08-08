// Obtém uma referência ao elemento HTML com o id 'content-area' e a armazena na constante 'contentArea'.
// Este elemento é onde o conteúdo principal da página será exibido.
const contentArea = document.getElementById('content-area');
// Obtém uma referência ao elemento <ul> com o id 'nav-menu' e a armazena na constante 'navMenu'.
// Este elemento é o contêiner principal onde o menu de navegação será construído dinamicamente.
const navMenu = document.getElementById('nav-menu');

// 'createMenuItem' é uma função recursiva que constrói um único item de menu (um <li> com seus conteúdos) a partir de um objeto 'item' dos dados.
function createMenuItem(item) {
    // 'document.createElement('li')' cria um novo elemento <li> em memória. Este será o contêiner para um item de menu.
    const li = document.createElement('li');
    // 'setAttribute' adiciona um atributo ao elemento. 'role="none"' é para acessibilidade, indicando que este <li> é apenas um contêiner estrutural dentro de um menu.
    li.setAttribute('role', 'none');

    // Cria um novo elemento <div> que funcionará como o "botão" clicável.
    const div = document.createElement('div');
    // 'div.className = 'nav-item'' atribui a classe 'nav-item' ao div, permitindo que o CSS o estilize.
    div.className = 'nav-item';
    // 'div.dataset.id = item.id' armazena o id do item de dados em um atributo 'data-id' no elemento HTML. Isso facilita a identificação do item quando ele for clicado.
    div.dataset.id = item.id;
    // 'role="menuitem"' informa aos leitores de tela que este elemento é um item de menu interativo.
    div.setAttribute('role', 'menuitem');
    // 'tabindex="-1"' remove o item da ordem de navegação por Tab por padrão. Apenas o item ativo terá tabindex="0".
    div.setAttribute('tabindex', '-1');

    // Cria um novo elemento <span> para o ícone de expandir/recolher (a "setinha").
    const icon = document.createElement('span');
    // Atribui a classe 'toggle-icon' para estilização via CSS.
    icon.className = 'toggle-icon';
    // 'item.children?.length > 0' verifica se o item de dados tem um array 'children' com pelo menos um elemento. O '?.' (optional chaining) evita erros se 'item.children' não existir.
    if (item.children?.length > 0) {
        // Se tiver filhos, define o texto do ícone como '►'.
        icon.textContent = '►';
        // 'aria-haspopup="true"' informa aos leitores de tela que este item de menu tem um submenu.
        div.setAttribute('aria-haspopup', 'true');
        // 'aria-expanded="false"' informa que o submenu está fechado por padrão.
        div.setAttribute('aria-expanded', 'false');
    }
    
    // 'div.appendChild(icon)' insere o elemento <span> do ícone como um filho do <div> do botão.
    div.appendChild(icon);
    // 'div.append(item.title)' insere o texto do título do item (ex: "🧬 1. GENÉTICA") no <div> do botão, após o ícone.
    div.append(item.title);
    // 'li.appendChild(div)' insere o <div> completo do botão como um filho do elemento <li>.
    li.appendChild(div);

    // Verifica novamente se o item tem filhos para construir o submenu.
    if (item.children?.length > 0) {
        // Cria um novo elemento <ul> para servir como contêiner do submenu.
        const sublist = document.createElement('ul');
        // Atribui a classe 'hidden' para que o submenu comece escondido (conforme definido no CSS).
        sublist.className = 'hidden';
        // 'role="menu"' informa aos leitores de tela que esta lista é um menu.
        sublist.setAttribute('role', 'menu');
        // 'item.children.forEach' itera sobre cada objeto 'child' no array de filhos.
        item.children.forEach(child => {
            // Para cada filho, a função 'createMenuItem' é chamada novamente (recursão) para construir o item do submenu.
            // 'sublist.appendChild(...)' anexa o item de submenu recém-criado à lista do submenu.
            sublist.appendChild(createMenuItem(child));
        });
        // Anexa o <ul> completo do submenu ao elemento <li> principal, após o <div> do botão.
        li.appendChild(sublist);
    }
    // Retorna o elemento <li> completo, com seu botão e, opcionalmente, seu submenu.
    return li;
}

// 'export' torna a função 'generateMenu' disponível para ser importada em outros arquivos (como aplicativo.js).
export function generateMenu(data) {
    // 'if (!navMenu) return;' é uma verificação de segurança. Se o elemento do menu não foi encontrado no HTML, a função para.
    if (!navMenu) return;
    // 'navMenu.innerHTML = ''' limpa todo o conteúdo HTML existente dentro do contêiner do menu. Isso é importante para evitar duplicações se a função for chamada mais de uma vez.
    navMenu.innerHTML = '';
    // 'data.forEach' itera sobre cada item de primeiro nível no array 'data'.
    data.forEach(item => {
        // Para cada item, chama 'createMenuItem' para construir o elemento HTML e o anexa ao contêiner principal do menu.
        navMenu.appendChild(createMenuItem(item));
    });
}

// Função para fazer ajustes de acessibilidade no menu após ele ser gerado.
export function updateMenuAccessibility() {
    // Verificação de segurança para garantir que o menu exista.
    if (!navMenu) return;
    // 'navMenu.querySelector('.nav-item')' encontra o PRIMEIRO item de menu na árvore.
    const firstItem = navMenu.querySelector('.nav-item');
    // 'if(firstItem)' verifica se um item foi encontrado.
    if(firstItem) firstItem.setAttribute('tabindex', '0'); // Define 'tabindex="0"' apenas no primeiro item, tornando-o o ponto de entrada para navegação via teclado (Tab).
}

// Função para exibir o conteúdo HTML carregado na área principal da página.
export function displayContent(htmlContent) {
    // Limpa qualquer conteúdo que estivesse anteriormente na área de conteúdo.
    contentArea.innerHTML = ''; 

    // 'if (htmlContent)' verifica se o conteúdo HTML recebido não é nulo ou indefinido.
    if (htmlContent) {
        // 1. Cria um novo elemento <div> em memória.
        const cardDiv = document.createElement('div');
        // 2. Adiciona a classe 'card' a este div, para que ele receba os estilos de "card" definidos no CSS.
        cardDiv.className = 'card';

        // 3. 'cardDiv.innerHTML = htmlContent' insere a string de HTML (carregada do arquivo) dentro do nosso div recém-criado.
        cardDiv.innerHTML = htmlContent;
        
        // 4. 'contentArea.appendChild(cardDiv)' anexa o div completo (já com o conteúdo dentro) à área de conteúdo principal da página.
        contentArea.appendChild(cardDiv);
    } else {
        // Se 'htmlContent' for nulo, exibe uma mensagem de erro dentro da área de conteúdo.
        // A string usa "template literals" (crases ``) para facilitar a escrita de HTML multilinhas.
        contentArea.innerHTML = `
            <div class="card">
                <h2>Erro 404: Conteúdo não encontrado</h2>
                <p>Verifique se o arquivo referenciado em <code>js/dados.js</code> existe na pasta <code>conteudo/</code>.</p>
            </div>
        `;
    }
}

// Função para atualizar os destaques visuais (classes .active e .active-parent) no menu.
// 'parentId = null' define um valor padrão para 'parentId', tornando-o um parâmetro opcional.
export function updateActiveLink(activeId, parentId = null) {
    // Verificação de segurança.
    if (!navMenu) return;

    // 'document.querySelectorAll('.nav-item')' seleciona TODOS os itens de menu na página.
    // '.forEach' itera sobre cada um deles para limpar os estados anteriores.
    document.querySelectorAll('.nav-item').forEach(el => {
        // 'el.classList.remove(...)' remove as classes de destaque, garantindo que apenas os itens corretos serão destacados.
        el.classList.remove('active', 'active-parent');
        // Define 'tabindex="-1"' para todos, removendo-os da navegação por Tab.
        el.setAttribute('tabindex', '-1');
    });

    // 'document.querySelector(...)' encontra o elemento de menu que corresponde ao ID do item clicado.
    const activeEl = document.querySelector(`.nav-item[data-id="${activeId}"]`);
    // 'if (activeEl)' verifica se o elemento foi encontrado.
    if (activeEl) {
        // 'activeEl.classList.add('active')' adiciona a classe .active para aplicar o estilo de destaque principal (verde).
        activeEl.classList.add('active');
        // Define 'tabindex="0"' apenas neste item, tornando-o o foco atual para navegação por teclado.
        activeEl.setAttribute('tabindex', '0');
        // 'activeEl.focus()' move o foco do navegador para este elemento, melhorando a acessibilidade.
        activeEl.focus();
    }

    // 'if (parentId)' verifica se um ID de pai foi fornecido para a função.
    if (parentId) {
        // Encontra o elemento de menu que corresponde ao ID do pai.
        const parentEl = document.querySelector(`.nav-item[data-id="${parentId}"]`);
        // 'if (parentEl)' verifica se o elemento pai foi encontrado.
        if (parentEl) {
            // Adiciona a classe '.active-parent' para aplicar o estilo de destaque secundário (fundo cinza).
            parentEl.classList.add('active-parent');
        }
    }
}

// Função para alternar a visibilidade de um submenu.
export function toggleSubmenu(navItem) {
    // 'navItem.nextElementSibling' obtém o elemento HTML que vem imediatamente após o <div> 'navItem'. Espera-se que seja o <ul> do submenu.
    const sublist = navItem.nextElementSibling;
    // 'if (sublist && sublist.tagName === 'UL')' verifica se o elemento seguinte existe e se é de fato um <ul>.
    if (sublist && sublist.tagName === 'UL') {
        // 'sublist.classList.toggle('hidden')' adiciona/remove a classe 'hidden'. O método retorna 'false' se a classe foi adicionada (está se abrindo) e 'true' se foi removida (está se fechando).
        const isOpening = sublist.classList.toggle('hidden');
        // Encontra o ícone de seta dentro do 'navItem'.
        // Adiciona/remove a classe 'open' para que o CSS possa girar o ícone.
        navItem.querySelector('.toggle-icon').classList.toggle('open');
        // Atualiza o atributo 'aria-expanded' com base no estado de abertura/fechamento, para acessibilidade. '!isOpening' inverte o valor booleano.
        navItem.setAttribute('aria-expanded', !isOpening);
    }
}