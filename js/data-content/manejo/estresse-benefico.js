import estresseHidricoNode from "./estresse-benefico/estresse-hidrico.js";
import temperaturaFriaNode from "./estresse-benefico/temperatura-fria.js";
import uvbNode from "./estresse-benefico/uvb.js";

const estresseBeneficoNode =

{
    id: 'estresse-benefico',
    title: '✨ ESTRESSE BENÉFICO',
    contentFile: 'conteudo/manejo/estresse-benefico.html',
    children: [
        uvbNode,
        estresseHidricoNode,
        temperaturaFriaNode
    ]
}

export default estresseBeneficoNode;