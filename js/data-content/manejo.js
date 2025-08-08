import estresseBeneficoNode from "./manejo/estresse-benefico.js";
import prevencaoNode from "./manejo/prevencao.js";
import treinamentoNode from "./manejo/treinamento.js";

const manejoNode =

{
    id: 'manejo',
    title: 'MANEJO & TÉCNICAS',
    contentFile: 'conteudo/manejo.html',
    children: [
        treinamentoNode,
        estresseBeneficoNode,
        prevencaoNode
    ]
}

export default manejoNode;