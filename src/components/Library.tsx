import { useEffect, useMemo, useState } from 'react';
import { displayName, imageUrl, loadExercises, search, type Exercise, type Filters } from '../lib/exercises';
import { EQUIPMENT, EQUIPMENT_ORDER, MUSCLES, MUSCLE_ORDER } from '../lib/labels';

const PAGE = 40;

export function Library({ filters, onFilters }: { filters: Filters; onFilters: (f: Filters) => void }) {
  const [all, setAll] = useState<Exercise[] | null>(null);
  const [shown, setShown] = useState(PAGE);

  useEffect(() => {
    loadExercises().then(setAll);
  }, []);

  const results = useMemo(() => (all ? search(all, filters) : []), [all, filters]);
  // a new search starts from the top of the list again
  useEffect(() => setShown(PAGE), [filters]);

  const set = (patch: Partial<Filters>) => onFilters({ ...filters, ...patch });

  return (
    <section>
      <div className="search">
        <input
          type="search"
          placeholder="Buscar exercício"
          value={filters.text}
          onChange={(e) => set({ text: e.target.value })}
          aria-label="Buscar exercício"
        />
        <select
          value={filters.muscle ?? ''}
          onChange={(e) => set({ muscle: e.target.value || null })}
          aria-label="Músculo"
        >
          <option value="">Todos os músculos</option>
          {MUSCLE_ORDER.map((m) => (
            <option key={m} value={m}>{MUSCLES[m]}</option>
          ))}
        </select>
      </div>

      <div className="chips" role="group" aria-label="Equipamento">
        {EQUIPMENT_ORDER.map((eq) => (
          <button
            key={eq}
            type="button"
            className={filters.equipment === eq ? 'chip on' : 'chip'}
            aria-pressed={filters.equipment === eq}
            onClick={() => set({ equipment: filters.equipment === eq ? null : eq })}
          >
            {EQUIPMENT[eq]}
          </button>
        ))}
      </div>

      {!all ? (
        <p className="muted">Carregando exercícios…</p>
      ) : (
        <>
          <p className="count">{results.length} exercícios</p>
          <ul className="list">
            {results.slice(0, shown).map((e) => (
              <li key={e.id}>
                <a className="item" href={`#/exercicio/${e.id}`}>
                  <img src={imageUrl(e.images[0])} alt="" loading="lazy" width={72} height={72} />
                  <span>
                    <strong>{displayName(e)}</strong>
                    {e.pt && <small>{e.en}</small>}
                    <em>
                      {EQUIPMENT[e.equipment]} · {e.primary.map((m) => MUSCLES[m] ?? m).join(', ')}
                    </em>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {shown < results.length && (
            <button type="button" className="more" onClick={() => setShown(shown + PAGE)}>
              Mostrar mais ({results.length - shown})
            </button>
          )}
          {results.length === 0 && <p className="muted">Nada com esses filtros.</p>}
        </>
      )}
    </section>
  );
}
