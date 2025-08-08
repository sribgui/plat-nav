import bioestimulanteNode from "./formula-nutritiva/bioestimulante.js";
import macroNode from "./formula-nutritiva/macro.js";
import microNode from "./formula-nutritiva/micro.js";

const formulaNutritivaNode =

{
    id: 'formula-nutritiva',
    title: '🧪 FÓRMULA NUTRITIVA',
    contentFile: 'conteudo/nutricao-planta/formula-nutritiva.html',
    children: [
        macroNode,
        microNode,
        bioestimulanteNode
    ]
}

export default formulaNutritivaNode;