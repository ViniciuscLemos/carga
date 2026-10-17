import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { createRoutine, db, deleteRoutine, duplicateRoutine, moveRoutine, saveRoutine } from '../src/lib/db';
import { addExercise } from '../src/lib/routines';

const names = async () => (await db.routines.orderBy('position').toArray()).map((r) => r.name);

beforeEach(async () => {
  await db.routines.clear();
});

describe('workouts in the database', () => {
  it('new ones go to the end of the rotation', async () => {
    await createRoutine('Upper 1');
    await createRoutine('Lower 1');
    expect(await names()).toEqual(['Upper 1', 'Lower 1']);
  });

  it('moving swaps with the neighbour, and does nothing past the ends', async () => {
    const a = (await createRoutine('A')) as number;
    await createRoutine('B');
    await moveRoutine(a, 1);
    expect(await names()).toEqual(['B', 'A']);
    await moveRoutine(a, 1);
    expect(await names()).toEqual(['B', 'A']);
  });

  it('a copy has the same exercises and goes last', async () => {
    const a = (await createRoutine('Upper 1')) as number;
    await saveRoutine(a, { exercises: addExercise([], 'bench-press') });
    await createRoutine('Lower 1');
    const copy = (await duplicateRoutine(a)) as number;
    expect(await names()).toEqual(['Upper 1', 'Lower 1', 'Upper 1 (cópia)']);
    expect((await db.routines.get(copy))?.exercises.map((e) => e.exerciseId)).toEqual(['bench-press']);
  });

  it('deleting removes only that one', async () => {
    const a = (await createRoutine('A')) as number;
    await createRoutine('B');
    await deleteRoutine(a);
    expect(await names()).toEqual(['B']);
  });
});
