// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
export default function Estoque({ produtos, avisos = [] }) {
  // slice cria uma cópia, para o sort não alterar a lista original
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Situação</th>
              <th>Clientes interessados</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => {
              const estoqueAtual = Number(produto.estoque ?? 0)
              const interessados = avisos.filter((aviso) => aviso.produtoId === produto.id)

              return (
                <tr key={produto.id}>
                  <td>{produto.title}</td>
                  <td>{produto.category}</td>
                  <td>{estoqueAtual}</td>
                  <td>
                    {estoqueAtual === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                    {estoqueAtual > 0 && estoqueAtual < 5 && (
                      <span className="selo selo-alerta">Repor</span>
                    )}
                    {estoqueAtual >= 5 && <span className="selo selo-ok">OK</span>}
                  </td>
                  <td>
                    {estoqueAtual === 0 ? (
                      interessados.length > 0 ? (
                        <ul className="lista-interessados">
                          {interessados.map((interessado, index) => (
                            <li key={`${produto.id}-${interessado.email}-${index}`}>
                              <strong>{interessado.nome}</strong>
                              <span>{interessado.email}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="texto-sem-interessados">Nenhum</span>
                      )
                    ) : (
                      <span className="texto-sem-interessados">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
