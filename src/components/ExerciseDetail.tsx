import { useEffect, useState } from 'react';
import { displayName, imageUrl, loadExercises, type Exercise } from '../lib/exercises';
import { EQUIPMENT, MECHANICS, MUSCLES } from '../lib/labels';

export function ExerciseDetail({ id }: { id: string }) {
  const [exercise, setExercise] = useState<Exercise | null | undefined>(undefined);

  useEffect(() => {
    loadExercises().then((all) => setExercise(all.find((e) => e.id === id) ?? null));
  }, [id]);

  if (exercise === undefined) return <p className="muted">Carregando…</p>;
  if (exercise === null) return <p className="muted">Esse exercício não existe. <a href="#/">Voltar</a></p>;

  const muscles = (list: string[]) => list.map((m) => MUSCLES[m] ?? m).join(', ');

  return (
    <article className="detail">
      <a className="back" href="#/">‹ Exercícios</a>
      <h2>{displayName(exercise)}</h2>
      {exercise.pt && <p className="en">{exercise.en}</p>}

      {/* the two drawings are the start and the end of the movement */}
      <div className="photos">
        {exercise.images.map((img, i) => (
          <figure key={img}>
            <img src={imageUrl(img)} alt={`${displayName(exercise)}, ${i === 0 ? 'início' : 'fim'}`} />
            <figcaption>{i === 0 ? 'Início' : 'Fim'}</figcaption>
          </figure>
        ))}
      </div>

      <dl className="facts">
        <dt>Equipamento</dt>
        <dd>{EQUIPMENT[exercise.equipment] ?? exercise.equipment}</dd>
        <dt>Músculos</dt>
        <dd>{muscles(exercise.primary)}</dd>
        {exercise.secondary.length > 0 && (
          <>
            <dt>Ajudam</dt>
            <dd>{muscles(exercise.secondary)}</dd>
          </>
        )}
        {exercise.mechanic && MECHANICS[exercise.mechanic] && (
          <>
            <dt>Tipo</dt>
            <dd>{MECHANICS[exercise.mechanic]}</dd>
          </>
        )}
      </dl>

      <h3>Como fazer</h3>
      <ol className="steps" lang="en">
        {exercise.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </article>
  );
}
