import perfilCanabinoideNode from "./selecao-quimiotipo/perfil-canabinoide.js";
import perfilFlavonoideNode from "./selecao-quimiotipo/perfil-flavonoide.js";
import perfilTerpenoNode from "./selecao-quimiotipo/perfil-terpeno.js";

const selecaoQuimiotipoNode =
                
{
    id: 'selecao-quimiotipo',
    title: 'SELEÇÃO DE QUIMIOTIPOS',
    contentFile: 'conteudo/genetica/melhoramento-genetico/selecao-progenitor/selecao-quimiotipo.html',
    children: [
        perfilCanabinoideNode,
        perfilFlavonoideNode,
        perfilTerpenoNode
    ]
}

export default selecaoQuimiotipoNode;