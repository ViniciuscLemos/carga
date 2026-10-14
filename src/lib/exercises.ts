export interface Exercise {
  id: string;
  en: string;
  pt: string | null;
  equipment: string;
  primary: string[];
  secondary: string[];
  mechanic: string | null;
  steps: string[];
  images: string[];
}

export interface Filters {
  text: string;
  equipment: string | null;
  muscle: string | null;
}

// Everkinetic's drawings (CC BY-SA 4.0) stay on their GitHub; the service worker keeps the ones you open
export const IMAGE_BASE = 'https://raw.githubusercontent.com/everkinetic/data/main/dist/png/';

export const imageUrl = (path: string) => IMAGE_BASE + path;

/** The name people know: the Portuguese one when there is one. */
export const displayName = (e: Exercise) => e.pt ?? e.en;

/** Lowercase, no accents, no punctuation: "Supino" finds "supino", "rosca" finds "Rosca Scott". */
export function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

let cache: Promise<Exercise[]> | null = null;

/** The list is ~800 KB, so it's its own chunk and only loads once. */
export function loadExercises(): Promise<Exercise[]> {
  cache ??= import('../data/exercises.json').then((m) => m.default as Exercise[]);
  return cache;
}

export function search(all: Exercise[], filters: Filters): Exercise[] {
  const words = normalize(filters.text).split(' ').filter(Boolean);
  const found = all.filter((e) => {
    if (filters.equipment && e.equipment !== filters.equipment) return false;
    if (filters.muscle && !e.primary.includes(filters.muscle)) return false;
    if (!words.length) return true;
    // every word has to be somewhere in either name: "supino halter" or "bench dumbbell"
    const haystack = normalize(`${e.pt ?? ''} ${e.en}`);
    return words.every((w) => haystack.includes(w));
  });
  // the well-known ones (with a Portuguese name) first, then alphabetical
  return found.sort((a, b) => Number(!a.pt) - Number(!b.pt) || displayName(a).localeCompare(displayName(b), 'pt'));
}

/** Other exercises for the same main muscle, the same equipment first: for when the machine is taken. */
export function similar(all: Exercise[], exercise: Exercise, limit = 6): Exercise[] {
  const main = exercise.primary[0];
  return all
    .filter((e) => e.id !== exercise.id && e.primary[0] === main)
    .sort((a, b) =>
      Number(b.equipment === exercise.equipment) - Number(a.equipment === exercise.equipment)
      || Number(!a.pt) - Number(!b.pt)
      || displayName(a).localeCompare(displayName(b), 'pt'))
    .slice(0, limit);
}
