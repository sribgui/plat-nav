import higieneNode from "./prevencao/higiene.js";
import ipmNode from "./prevencao/ipm.js";

const prevencaoNode =

{
    id: 'prevencao',
    title: '🛡️ PREVENÇÃO E SAÚDE',
    contentFile: 'conteudo/manejo/prevencao.html',
    children: [
        higieneNode,
        ipmNode
    ]
}

export default prevencaoNode;