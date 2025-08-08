import epigeneticaNode from './genetica/epigenetica.js';
import melhoramentoGeneticoNode from './genetica/melhoramento-genetico.js';

const geneticaNode = 

{
    id: 'genetica',
    title: 'GENÉTICA',
    contentFile: 'conteudo/genetica.html',
    children: [
        melhoramentoGeneticoNode,
        epigeneticaNode,
    ]
};

export default geneticaNode;