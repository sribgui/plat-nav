import estabilidadeGeneticaNode from "./melhoramento-genetico/estabilidade-genetica.js";
import geneticaPerformaticaNode from "./melhoramento-genetico/genetica-performatica.js";
import resistenciaNode from "./melhoramento-genetico/resistencia.js";
import selecaoProgenitorNode from "./melhoramento-genetico/selecao-progenitor.js";

const melhoramentoGeneticoNode = 

{
    id: 'melhoramento-genetico',
    title: 'MELHORAMENTO GENÉTICO',
    contentFile: 'conteudo/genetica/melhoramento-genetico.html',
    children: [
        selecaoProgenitorNode,      
        geneticaPerformaticaNode,
        resistenciaNode,
        estabilidadeGeneticaNode
    ]
}

export default melhoramentoGeneticoNode;