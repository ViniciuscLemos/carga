// Builds src/data/exercises.json from Everkinetic's exercise data (github.com/everkinetic/data,
// CC BY-SA 4.0): line drawings of each movement, no photos of people.
//   node scripts/import-exercises.mjs path/to/exercises.json path/to/list-of-png-files.txt
// The second file is the listing of dist/png, to keep only exercises that have both drawings.
import { readFileSync, writeFileSync } from 'node:fs';

const [sourcePath, pngListPath] = process.argv.slice(2);
const source = JSON.parse(readFileSync(sourcePath, 'utf8'));
const pngs = new Set(readFileSync(pngListPath, 'utf8').split(/\s+/));
const namesPt = JSON.parse(readFileSync(new URL('./names-pt.json', import.meta.url), 'utf8'));

// the source writes muscles freely ("gluts", "rear deltoid", "shoulders, lats"): one name each
const MUSCLE = {
  gluts: 'glutes', hamstring: 'hamstrings', trapezius: 'traps', back: 'middle back',
  'lateral deltoid': 'shoulders', 'rear deltoid': 'shoulders', 'posterior deltoid': 'shoulders',
  'front deltoid': 'shoulders', deltoids: 'shoulders', 'lower abdominals': 'abdominals',
  core: 'abdominals', obliques: 'abdominals', 'neck extensors': 'neck', 'neck flexors': 'neck',
  'neck side flexors': 'neck', arms: 'biceps', pectorals: 'chest', lat: 'lats',
  forearm: 'forearms', 'upper back': 'middle back', 'hip abductors': 'abductors',
  // typos in the source
  bicpes: 'biceps', should: 'shoulders',
};
const muscles = (value) =>
  [...new Set(String(value ?? '').split(',').map((m) => m.trim().toLowerCase()).filter((m) => m && m !== 'none')
    .map((m) => MUSCLE[m] ?? m))];

// one piece of equipment per exercise, the one that decides where in the gym it happens
function equipment(list, title) {
  const all = (list ?? []).join(' ').toLowerCase();
  if (all.includes('smith')) return 'smith';
  if (all.includes('cable')) return 'cable';
  if (/machine/.test(all)) return 'machine';
  if (/\bez\b/i.test(title)) return 'e-z curl bar';
  if (/barbell|olympic|\bbar\b/.test(all)) return 'barbell';
  if (/dumb+el/.test(all)) return 'dumbbell';
  if (/band/.test(all)) return 'bands';
  if (/medicine ball/.test(all)) return 'medicine ball';
  if (/ball/.test(all)) return 'exercise ball';
  if (/plate|weight/.test(all)) return 'plate';
  return 'body only';
}

const exercises = source
  .filter((e) => pngs.has(`${e.id_num}-relaxation.png`) && pngs.has(`${e.id_num}-tension.png`))
  .map((e) => ({
    id: e.name,
    en: e.title.replace(/’/g, "'"),
    pt: namesPt[e.name] ?? null,
    equipment: equipment(e.equipment, e.title),
    primary: muscles(e.primary),
    secondary: (e.secondary ?? []).flatMap(muscles),
    mechanic: e.type ?? null,
    steps: e.steps ?? [],
    // start and end of the movement
    images: [`${e.id_num}-relaxation.png`, `${e.id_num}-tension.png`],
  }))
  .filter((e) => e.primary.length);

const missing = Object.keys(namesPt).filter((id) => !exercises.some((e) => e.id === id));
if (missing.length) throw new Error(`names-pt.json has ids that are not in the source: ${missing.join(', ')}`);

writeFileSync(new URL('../src/data/exercises.json', import.meta.url), JSON.stringify(exercises));
console.log(`${exercises.length} exercises, ${Object.keys(namesPt).length} with a Portuguese name`);
