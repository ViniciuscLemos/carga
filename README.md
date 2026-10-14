# Overlog

[![Tests and deploy](https://github.com/ViniciuscLemos/overlog/actions/workflows/deploy.yml/badge.svg)](https://github.com/ViniciuscLemos/overlog/actions/workflows/deploy.yml)

A gym log built around the two things that make muscle grow: training close to failure and putting more weight on the bar over time. The name is *progressive overload* + *log*.

**Live:** https://viniciusclemos.github.io/overlog/ (on the phone, "Add to Home Screen" installs it)

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

The base first, nothing fancy:

1. **Workouts, as many as you want.** Hevy's free plan stops at 4 routines, which rules out an ABCDE split or upper/lower six days a week. Here there's no limit.
2. **Logging a workout.** Weight, reps and **RIR** (reps in reserve) on every set, with last time's numbers next to it. Proximity to failure and load progression are what drive hypertrophy, so both are first-class fields, not settings buried in a menu.
3. **A clear next step per exercise:** add weight, or keep it and go for more reps, based on what you did and how close to failure it was.
4. **History and a chart per exercise** to see the load actually going up.
5. Rest timer, your own exercises, export/import.

**More exercises, same look.** Everkinetic has 269 drawn exercises. The rest of a normal gym (wide-grip pulldown, hip thrust, Bulgarian split squat...) will come in as well, shown with a black-and-white muscle map in the same line style, so every picture in the app looks like it belongs.

No points, badges or streaks: open it, train, write it down.

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
