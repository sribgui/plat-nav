import climaNode from "./ambiente/clima.js";
import iluminacaoNode from "./ambiente/iluminacao.js";
import meioCultivoNode from "./ambiente/meio-cultivo.js";
import zonaRadicularNode from "./ambiente/zona-radicular.js";
import nutricaoPlantaNode from "./ambiente/nutricao-planta.js";

const ambienteNode =

{
    id: 'ambiente',
    title: 'AMBIENTE',
    contentFile: 'conteudo/ambiente.html',
    children: [
        iluminacaoNode,
        climaNode,
        meioCultivoNode,
        zonaRadicularNode,
        nutricaoPlantaNode     
    ]
}

export default ambienteNode;