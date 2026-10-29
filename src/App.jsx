import { useState } from 'react'
import Ordem from './components/Ordem'
import './App.css'

const ordensIniciais = [
  { idOrdem: crypto.randomUUID(), dsCliente: "Marina Alves", dsServico: "Troca de pastilhas de freio", nuValor: 85, fgConcluida: false },
  { idOrdem: crypto.randomUUID(), dsCliente: "Carlos Pereira", dsServico: "Alinhamento da roda traseira", nuValor: 40, fgConcluida: true },
  { idOrdem: crypto.randomUUID(), dsCliente: "Joana Souza", dsServico: "Troca de corrente e câmbio", nuValor: 120.5, fgConcluida: false },
]

function App() {

  const [ordens, setOrdens] = useState(ordensIniciais)
  const [dsCliente, setDsCliente] = useState("")
  const [dsServico, setDsServico] = useState("")
  const [nuValor, setNuValor] = useState("")
  const [erro, setErro] = useState("")

  const cadastrar = (event) => {
    event.preventDefault()

    if (dsCliente.trim() === "" || dsServico.trim() === "") {
      setErro("Preencha o cliente e o serviço.")
      return
    }

    if (nuValor.trim() === "" || isNaN(Number(nuValor)) || Number(nuValor) < 0) {
      setErro("O valor precisa ser um número maior ou igual a zero.")
      return
    }

    const novaOrdem = {
      idOrdem: crypto.randomUUID(),
      dsCliente: dsCliente,
      dsServico: dsServico,
      nuValor: Number(nuValor),
      fgConcluida: false,
    }

    setOrdens([...ordens, novaOrdem])
    setDsCliente("")
    setDsServico("")
    setNuValor("")
    setErro("")
  }

  const alternar = (id) => {
    setOrdens(ordens.map((ordem) => ordem.idOrdem === id ? { ...ordem, fgConcluida: !ordem.fgConcluida } : ordem))
  }

  const remover = (id) => {
    setOrdens(ordens.filter((ordem) => ordem.idOrdem !== id))
  }

  const emAberto = ordens.filter((ordem) => !ordem.fgConcluida)

  let valorEmAberto = 0
  emAberto.forEach((ordem) => {
    valorEmAberto = valorEmAberto + ordem.nuValor
  })

  return (
    <>
      <div className="app">
        <h1>Oficina de Bicicletas</h1>

        <div className="resumo">
          <p>Total de ordens: {ordens.length}</p>
          <p>Ordens em aberto: {emAberto.length}</p>
          <p>Valor em aberto: R$ {valorEmAberto.toFixed(2)}</p>
        </div>

        <form onSubmit={cadastrar}>
          <h2>Nova ordem</h2>
          cliente <input value={dsCliente} onChange={(e) => setDsCliente(e.target.value)} />
          serviço <input value={dsServico} onChange={(e) => setDsServico(e.target.value)} />
          valor <input value={nuValor} onChange={(e) => setNuValor(e.target.value)} />
          <button type="submit">Cadastrar</button>
          {erro && <p className="erro">{erro}</p>}
        </form>

        {ordens.length === 0 && <p>Não há ordens de serviço cadastradas.</p>}

        <ul>
          {ordens.map((ordem) => (
            <Ordem key={ordem.idOrdem} ordem={ordem} alternar={alternar} remover={remover} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default App