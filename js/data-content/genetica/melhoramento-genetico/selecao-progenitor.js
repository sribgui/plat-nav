import selecaoFenotipoNode from "./selecao-progenitor/selecao-fenotipo.js";
import selecaoGenotipoNode from "./selecao-progenitor/selecao-genotipo.js";
import selecaoQuimiotipoNode from "./selecao-progenitor/selecao-quimiotipo.js";

const selecaoProgenitorNode = 
    
{
    id: 'selecao-progenitores',
    title: 'SELEÇÃO DOS PROGENITORES',
    contentFile: 'conteudo/genetica/melhoramento-genetico/selecao-progenitor.html',
    children: [
        selecaoFenotipoNode,
        selecaoQuimiotipoNode,
        selecaoGenotipoNode
        ]
}

export default selecaoProgenitorNode;