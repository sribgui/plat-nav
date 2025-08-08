import espectroNode from "./iluminacao/espectro.js";
import metricaDliNode from "./iluminacao/metrica-dli.js";
import metricaPpfdNode from "./iluminacao/metrica-ppfd.js";

const iluminacaoNode = 

{
    id: 'iluminacao',
    title: 'ILUMINAÇÃO',
    contentFile: 'conteudo/ambiente/iluminacao.html',
    children: [
        metricaPpfdNode,
        metricaDliNode,
        espectroNode,
    ]
}

export default iluminacaoNode;