import curaNode from "./colheita/cura.js";
import flushNode from "./colheita/flush.js";
import secagemNode from "./colheita/secagem.js";
import tricomaNode from "./colheita/tricoma.js";

const posColheitaNode =

{
    id: 'colheita',
    title: 'COLHEITA',
    contentFile: 'conteudo/colheita.html',
    children: [
        tricomaNode,
        flushNode,
        secagemNode,
        curaNode
    ]
}

export default posColheitaNode;