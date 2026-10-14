# Carga

[![Tests and deploy](https://github.com/ViniciuscLemos/carga/actions/workflows/deploy.yml/badge.svg)](https://github.com/ViniciuscLemos/carga/actions/workflows/deploy.yml)

A gym log for my phone: pick exercises, see how each one is done, and (soon) build workouts and log weight and reps with a rest timer. The name is Portuguese for "load", the word everyone at a Brazilian gym uses for the weight on the bar.

**Live:** https://viniciusclemos.github.io/carga/ (on the phone, "Add to Home Screen" installs it)

<p>
  <img src="docs/library.png" alt="The exercise list with search, equipment filters and a drawing of each exercise" width="300">
  <img src="docs/exercise.png" alt="The bench press page: drawings of the start and end of the movement, muscles and steps" width="300">
</p>

## Why I'm building it

I train and I log my sets, and I wanted an app that does exactly what I use, in Portuguese, with no account and no ads. Apps like Hevy and Strong set the bar for how fast logging should feel, so that's the reference.

## What works now

- **269 exercises with drawings** of the start and end of each movement (no photos of people, on purpose).
- **The names people actually use in Brazilian gyms** for the common ones (supino reto, puxada com triângulo, remada cavalinho, cadeira extensora...), with the English name under it.
- **Search that forgives**: no accents needed, words in any order, Portuguese or English ("supino halteres" or "dumbbell bench").
- **Filters** by equipment (barbell, dumbbell, cable, machine, Smith...) and muscle.
- **Works offline** as an installable PWA. The gym has bad signal, so every drawing you open stays on the phone.

## Next

1. Workouts: as many exercises as you want, sets with weight and reps, a rest time for each exercise.
2. Logging a workout: last time's numbers next to each set, and the rest timer starts when a set is checked off.
3. History, personal records and a chart per exercise.
4. Your own exercises, and export/import so a phone change doesn't lose anything.

Everything stays on the phone (IndexedDB), so there's no login for now.

## Running it

```bash
npm install
npm run dev
npm test
```

The exercise list is built from Everkinetic's data with `npm run import-exercises -- exercises.json png-list.txt` (see the comment at the top of `scripts/import-exercises.mjs`). The Portuguese names are in `scripts/names-pt.json`.

## Credits

The exercises and drawings come from [Everkinetic](https://github.com/everkinetic/data), under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The drawings are loaded from their repository, and `src/data/exercises.json` (built from their data) stays under that license. The rest of the code is MIT.
