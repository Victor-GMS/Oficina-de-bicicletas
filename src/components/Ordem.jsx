import './Ordem.css'

const Ordem = (props) => {
  return (
    //ternario
    <li className={props.ordem.fgConcluida ? "ordem concluida" : "ordem"}>
      <h3>{props.ordem.dsCliente}</h3>
      <p>{props.ordem.dsServico}</p>
      <p>R$ {props.ordem.nuValor}</p>

      {props.ordem.fgConcluida && <p className="selo">Concluída</p>}

      <button onClick={() => props.alternar(props.ordem.idOrdem)}>
        {props.ordem.fgConcluida ? "Reabrir" : "Concluir"}
      </button>
      <button onClick={() => props.remover(props.ordem.idOrdem)}>Remover</button>
    </li>
  )
}

export default Ordem
