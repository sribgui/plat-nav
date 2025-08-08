import burpingNode from "./cura/burping.js";
import poteCuraNode from "./cura/pote-cura.js";

const curaNode =

{ 
    id: 'cura', 
    title: '🍯 CURA', 
    contentFile: 'conteudo/colheita/cura.html', 
    children: [
        poteCuraNode,
        burpingNode 
    ] 
}

export default curaNode;
