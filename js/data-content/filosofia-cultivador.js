import diarioNode from "./filosofia-cultivador/diario.js";
import observacaoNode from "./filosofia-cultivador/observacao.js";
import pacienciaNode from "./filosofia-cultivador/paciencia.js";
import planejamentoNode from "./filosofia-cultivador/planejamento.js";

const filosofiaNode =

{
    id: 'filosofia',
    title: 'FILOSOFIA DO CULTIVADOR',
    contentFile: 'conteudo/filosofia-cultivador.html',
    children: [
        planejamentoNode,
        diarioNode,
        observacaoNode,
        pacienciaNode
    ]
}

export default filosofiaNode;