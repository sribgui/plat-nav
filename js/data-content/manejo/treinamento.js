import hstNode from "./treinamento/hst.js";
import lstScrogNode from "./treinamento/lst-scrog.js";

const treinamentoNode = 

{
    id: 'treinamento',
    title: '✂️ TREINAMENTO ESTRUTURAL',
    contentFile: 'conteudo/manejo/treinamento.html',
    children: [
        lstScrogNode,
        hstNode
    ]
}

export default treinamentoNode;
