import { describe, expect, it } from 'vitest';
import {
  addExercise, DEFAULTS, move, nextInRotation, removeAt, restLabel, suggestName, tidy, totalSets, updateAt,
} from '../src/lib/routines';

describe('routine editing', () => {
  it('adds an exercise with 2 sets of 5 to 9 reps and 3 minutes of rest', () => {
    expect(addExercise([], 'bench-press')).toEqual([{ exerciseId: 'bench-press', ...DEFAULTS }]);
  });

  it('keeps numbers sensible whatever is typed', () => {
    const item = { exerciseId: 'x', ...DEFAULTS };
    expect(tidy({ ...item, sets: 0 }).sets).toBe(1);
    expect(tidy({ ...item, sets: 99 }).sets).toBe(10);
    expect(tidy({ ...item, repMin: 12, repMax: 8 })).toMatchObject({ repMin: 12, repMax: 12 });
    expect(tidy({ ...item, restSeconds: Number.NaN }).restSeconds).toBe(0);
  });

  it('updates, moves and removes one exercise at a time', () => {
    let list = addExercise(addExercise(addExercise([], 'a'), 'b'), 'c');
    list = updateAt(list, 1, { sets: 3 });
    expect(list[1].sets).toBe(3);
    expect(move(list, 0, 1).map((e) => e.exerciseId)).toEqual(['b', 'a', 'c']);
    expect(move(list, 0, -1)).toBe(list); // already at the top
    expect(removeAt(list, 1).map((e) => e.exerciseId)).toEqual(['a', 'c']);
    expect(totalSets({ exercises: list })).toBe(7);
  });
});

describe('rotation', () => {
  const routines = [
    { id: 7, position: 2, name: 'Upper 2' },
    { id: 3, position: 0, name: 'Upper 1' },
    { id: 5, position: 1, name: 'Lower 1' },
  ];

  it('starts at the first workout', () => {
    expect(nextInRotation(routines, null)?.name).toBe('Upper 1');
  });

  it('goes to the one after the last done, and back to the start after the last', () => {
    expect(nextInRotation(routines, 3)?.name).toBe('Lower 1');
    expect(nextInRotation(routines, 7)?.name).toBe('Upper 1');
  });

  it('restarts if the last one done was deleted', () => {
    expect(nextInRotation(routines, 99)?.name).toBe('Upper 1');
  });
});

describe('names and labels', () => {
  it('suggests the next free letter', () => {
    expect(suggestName([])).toBe('Treino A');
    expect(suggestName(['Treino A', 'Treino C'])).toBe('Treino B');
  });

  it('writes rest as minutes and seconds', () => {
    expect(restLabel(180)).toBe('3:00');
    expect(restLabel(90)).toBe('1:30');
  });
});
