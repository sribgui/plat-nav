import formulaNutritivaNode from "./nutricao-planta/formula-nutritiva.js";
import parametrosRegaNode from "./nutricao-planta/parametros-rega.js";

const nutricaoPlantaNode =

{
    id: 'nutricao-planta',
    title: 'NUTRIÇÃO DA PLANTA',
    contentFile: 'conteudo/nutricao-planta.html',
    children: [
        parametrosRegaNode,
        formulaNutritivaNode
    ]
}

export default nutricaoPlantaNode;