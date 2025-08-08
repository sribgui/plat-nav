// <<<BANCO DE DADOS PRINCIPAL>>>
// Este é o coração do seu aplicativo. Todo o conhecimento está aqui.

//Bibliotecas Modulares
import ambienteNode from "./data-content/ambiente.js";
import cannabisLegalNode from "./data-content/cannabis-legal.js";
import filosofiaNode from "./data-content/filosofia-cultivador.js";
import geneticaNode from "./data-content/genetica.js";
import manejoNode from "./data-content/manejo.js";
import colheitaNode from "./data-content/colheita.js";



const growpediaData = [
    cannabisLegalNode,
    geneticaNode,
    ambienteNode,
    manejoNode,
    colheitaNode,
    filosofiaNode
];

export default growpediaData;