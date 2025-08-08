import ecNode from "./parametros-rega/ec.js";
import phNode from "./parametros-rega/ph.js";

const parametrosRegaNode =

{
    id: 'parametros-rega',
    title: '📊 PARÂMETROS DE REGA',
    contentFile: 'conteudo/nutricao-planta/parametros-rega.html',
    children: [
        phNode,
        ecNode
    ]
}

export default parametrosRegaNode;