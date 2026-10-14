import { useEffect, useState } from 'react';
import { ExerciseDetail } from './components/ExerciseDetail';
import { Library } from './components/Library';
import { Studies } from './components/Studies';
import type { Filters } from './lib/exercises';

// a hash router is enough here and works the same installed or in a tab
function useRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash.replace(/^#\/?/, '');
}

export default function App() {
  const route = useRoute();
  // kept here so going back from an exercise keeps the search
  const [filters, setFilters] = useState<Filters>({ text: '', equipment: null, muscle: null });
  const exercise = route.match(/^exercicio\/(.+)$/);
  const studies = route === 'estudos';

  return (
    <>
      <header className="top">
        <a href="#/" className="logo">
          {/* the dumbbell going up: the weight on the bar going up over time */}
          <svg viewBox="0 0 512 512" width="26" height="26" aria-hidden="true">
            <g fill="currentColor" transform="rotate(-30 256 256)">
              <rect x="86" y="196" width="34" height="120" rx="8" />
              <rect x="124" y="160" width="46" height="192" rx="10" />
              <rect x="170" y="238" width="172" height="36" rx="6" />
              <rect x="342" y="160" width="46" height="192" rx="10" />
              <rect x="392" y="196" width="34" height="120" rx="8" />
            </g>
          </svg>
          Overlog
        </a>
        <nav>
          <a href="#/" aria-current={exercise || studies ? undefined : 'page'}>Exercícios</a>
          <span className="soon" title="Na próxima etapa">Treinos</span>
          <a href="#/estudos" aria-current={studies ? 'page' : undefined}>Estudos</a>
        </nav>
      </header>
      <main>
        {studies ? (
          <Studies />
        ) : exercise ? (
          <ExerciseDetail id={decodeURIComponent(exercise[1])} />
        ) : (
          <Library filters={filters} onFilters={setFilters} />
        )}
      </main>
      <footer className="credits">
        Desenhos dos exercícios: <a href="https://github.com/everkinetic/data">Everkinetic</a> (CC BY-SA 4.0)
      </footer>
    </>
  );
}
