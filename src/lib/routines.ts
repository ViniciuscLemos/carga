// What a saved workout ("treino") is made of, and the small changes the editor makes to it.
// Kept free of the database so it can be tested on its own.

export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  repMin: number;
  repMax: number;
  restSeconds: number;
  note: string; // "banco no 4", "pegada fechada"...
}

export interface Routine {
  id?: number;
  name: string;
  position: number; // order in the rotation: Upper 1, Lower 1, Upper 2...
  exercises: RoutineExercise[];
  createdAt: number;
  updatedAt: number;
}

// 2 work sets of 5 to 9 reps and 3 minutes of rest: low volume, close to failure, enough rest
// to keep the reps up. Every one of these can be changed per exercise.
export const DEFAULTS = { sets: 2, repMin: 5, repMax: 9, restSeconds: 180, note: '' };

export const LIMITS = { sets: [1, 10], reps: [1, 100], rest: [0, 600] } as const;

const clamp = (n: number, [min, max]: readonly [number, number]) =>
  Math.min(max, Math.max(min, Math.round(Number.isFinite(n) ? n : min)));

/** Keeps an exercise's numbers sensible whatever was typed: no 0 sets, no 12–8 rep range. */
export function tidy(item: RoutineExercise): RoutineExercise {
  const repMin = clamp(item.repMin, LIMITS.reps);
  const repMax = Math.max(repMin, clamp(item.repMax, LIMITS.reps));
  return {
    ...item,
    sets: clamp(item.sets, LIMITS.sets),
    repMin,
    repMax,
    restSeconds: clamp(item.restSeconds, LIMITS.rest),
  };
}

export const addExercise = (list: RoutineExercise[], exerciseId: string): RoutineExercise[] => [
  ...list,
  { exerciseId, ...DEFAULTS },
];

export const updateAt = (list: RoutineExercise[], index: number, patch: Partial<RoutineExercise>) =>
  list.map((item, i) => (i === index ? tidy({ ...item, ...patch }) : item));

export const removeAt = <T,>(list: T[], index: number) => list.filter((_, i) => i !== index);

/** Moves one item up or down; moving past either end does nothing. */
export function move<T>(list: T[], index: number, by: -1 | 1): T[] {
  const to = index + by;
  if (to < 0 || to >= list.length) return list;
  const copy = [...list];
  [copy[index], copy[to]] = [copy[to], copy[index]];
  return copy;
}

export const totalSets = (routine: Pick<Routine, 'exercises'>) =>
  routine.exercises.reduce((sum, e) => sum + e.sets, 0);

/**
 * The workout that comes after the last one done, going round the rotation:
 * Upper 1 → Lower 1 → Upper 2 → Lower 2 → Upper 1. Not tied to days of the week, so a
 * 4-day split doesn't have to fit Monday to Thursday.
 */
export function nextInRotation<T extends { id?: number; position: number }>(routines: T[], lastDoneId: number | null) {
  if (!routines.length) return undefined;
  const ordered = [...routines].sort((a, b) => a.position - b.position);
  const last = ordered.findIndex((r) => r.id === lastDoneId);
  return ordered[(last + 1) % ordered.length];
}

/** "Treino A", "Treino B"... for a new workout, skipping names already taken. */
export function suggestName(taken: string[]) {
  for (let i = 0; i < 26; i++) {
    const name = `Treino ${String.fromCharCode(65 + i)}`;
    if (!taken.includes(name)) return name;
  }
  return `Treino ${taken.length + 1}`;
}

export const restLabel = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

/** Sets per main muscle, biggest first: the number that matters for volume, not kilos. */
export function setsPerMuscle(exercises: RoutineExercise[], primaryOf: (exerciseId: string) => string[] | undefined) {
  const count = new Map<string, number>();
  for (const item of exercises) {
    for (const muscle of primaryOf(item.exerciseId) ?? []) count.set(muscle, (count.get(muscle) ?? 0) + item.sets);
  }
  return [...count].sort((a, b) => b[1] - a[1]);
}
