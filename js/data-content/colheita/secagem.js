import condicoesSecagemNode from "./secagem/condicoes-secagem.js";
import ventilacaoSecagemNode from "./secagem/ventilacao-secagem.js";

const secagemNode =

{ 
    id: 'secagem', 
    title: '🌬️ SECAGEM LENTA', 
    contentFile: 'conteudo/colheita/secagem.html', 
    children:[ 
        condicoesSecagemNode,
        ventilacaoSecagemNode
    ] 
}

export default secagemNode;
