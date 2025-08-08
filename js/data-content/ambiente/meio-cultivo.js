import aeroponiaNode from "./meio-cultivo/aeroponia.js";
import hidroponiaNode from "./meio-cultivo/hidroponia.js";
import soloNode from "./meio-cultivo/solo.js";
import substratoNode from "./meio-cultivo/substrato.js";


const meioCultivoNode =

{
    id: 'meio-cultivo',
    title: 'MEIO DE CULTIVO',
    contentFile: 'conteudo/ambiente/meio-cultivo.html',
    children: [
        soloNode,
        substratoNode,
        hidroponiaNode,
        aeroponiaNode
    ]
}

export default meioCultivoNode;