// Everything the user writes stays on the phone, in IndexedDB.
// Only the tables for now: routines and workouts come in the next step.
import Dexie, { type EntityTable } from 'dexie';

export interface Routine {
  id?: number;
  name: string; // "Treino A", "Push", "Pernas"...
  exercises: { exerciseId: string; sets: number; reps: string; restSeconds: number }[];
  createdAt: number;
}

export interface Workout {
  id?: number;
  routineId: number | null;
  startedAt: number;
  finishedAt: number | null;
}

export interface LoggedSet {
  id?: number;
  workoutId: number;
  exerciseId: string;
  order: number;
  weightKg: number;
  reps: number;
  doneAt: number;
}

export const db = new Dexie('overlog') as Dexie & {
  routines: EntityTable<Routine, 'id'>;
  workouts: EntityTable<Workout, 'id'>;
  sets: EntityTable<LoggedSet, 'id'>;
};

db.version(1).stores({
  routines: '++id, name',
  workouts: '++id, routineId, startedAt',
  // [exerciseId+doneAt] answers "what did I do last time on this exercise"
  sets: '++id, workoutId, exerciseId, [exerciseId+doneAt]',
});
