import morfologiaEstruturaNode from "./selecao-fenotipo/morfologia-estrutura.js";
import vigorDesempenhoNode from "./selecao-fenotipo/vigor-desempenho.js";

const selecaoFenotipoNode =                
                
{
    id: 'selecao-fenotipo',
    title: 'SELEÇÃO DE FENÓTIPOS',
    contentFile: 'conteudo/genetica/melhoramento-genetico/selecao-progenitor/selecao-fenotipo.html',
    children: [
        morfologiaEstruturaNode,
        vigorDesempenhoNode
    ]
}

export default selecaoFenotipoNode;