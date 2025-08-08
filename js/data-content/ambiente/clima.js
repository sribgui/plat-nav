import temperaturaNode from "./clima/temperatura.js";
import umidadeNode from "./clima/umidade.js";
import circulacaoArNode from "./clima/circulacao-ar.js";
import vpdNode from "./clima/vpd.js";

const climaNode =

{
    id: 'clima',
    title: 'CLIMA',
    contentFile: 'conteudo/ambiente/clima.html',
    children: [
        temperaturaNode,
        umidadeNode,
        vpdNode,
        circulacaoArNode   
    ]
}

export default climaNode;