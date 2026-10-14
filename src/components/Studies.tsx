import { STUDIES } from '../data/studies';

export function Studies() {
  // grouped by topic, in the order the topics first show up in the list
  const topics = [...new Set(STUDIES.map((s) => s.topic))];

  return (
    <section className="studies">
      <h2>Estudos</h2>
      <p className="intro">
        O que faz o músculo crescer não é segredo de academia: está em pesquisa publicada. Aqui ficam os
        estudos por trás do app, resumidos em português, com o link para o original. Vale ler.
      </p>
      <p className="muted small">
        <strong>Meta-análise</strong> junta os resultados de vários estudos sobre o mesmo tema, por isso pesa mais que
        um estudo sozinho. Os resumos simplificam: a conclusão completa está no artigo.
      </p>

      {topics.map((topic) => (
        <div key={topic}>
          <h3>{topic}</h3>
          {STUDIES.filter((s) => s.topic === topic).map((s) => (
            <article key={s.doi} className="study">
              <p className="takeaway">{s.takeaway}</p>
              <p>{s.summary}</p>
              <p className="cite">
                {s.authors} ({s.year}). <em>{s.title}</em>. {s.journal}.
              </p>
              <a className="read" href={`https://doi.org/${s.doi}`} target="_blank" rel="noopener noreferrer">
                Ler o estudo ↗
              </a>
            </article>
          ))}
        </div>
      ))}
    </section>
  );
}
