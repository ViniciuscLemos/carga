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
        <a href="#/" className="logo">Overlog</a>
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
