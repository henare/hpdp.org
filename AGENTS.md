# Agent notes for hpdp.org

## Adding Nick Power Cup (NPC) results

Results usually arrive as a scanned bracket sheet (PDF) for one week of the comp.

### Files to touch

- `_data/npcYYYY.csv`: one row per player, with the header `name,total,week1,week2,week3`. Names are in upper case (`DAVE C`, `PETER T`). Leave weeks that haven't been played empty, and use `-` for a week a player missed once later weeks have scores. Sort rows by `total`, highest first.
- `results/YYYY/npc/index.html`: the NPC page for the year. Copy the previous year's page and set `year`, `start_date` and `end_date` (format `d/m/yy`).
- `results/YYYY/index.html`: the ladder page for the year. Copy the previous year's page.
- `results/index.html`: add a row for the year at the top. Put "In progress" in the winner column until the comp finishes, then the winner's full name.
- `_layouts/index.html`: point the home page results section at the current year's data and page.

Build with `docker compose run --rm jekyll bundle exec jekyll build` and check the generated pages in `_site/`.

### Reading the bracket sheet

- Rows 1–16 are if we play a 16-player comp. We complete rows 17–32 if we run a 32-player comp.
- Players are paired by row number (1–2, 3–4, …). The higher score in each pair goes through to the next round.
- Handwriting gets corrected on the night. Where a score or name is crossed out, use the replacement. Where the written winner contradicts the scores, go with the scores and say so when reporting back.
- Names on the sheet are often nicknames, cut off or abbreviated. If you can't tell whether two entries are the same person, or who an entry is, ask rather than guess.

### Scoring

- A win scores 8 points, however it was won.
- The loser of a game scores the number of balls they sank, as written on the sheet.
- A player's weekly score is the sum of their game scores for the night. The overall winner on the night of a 32-player comp wins five games, so they score 40.
- There is no bonus for taking part.

### Buybacks

- A player knocked out earlier can buy back in, so the same person can appear twice on the sheet. This may be annotated on the sheet
- A buyback earns no points. Score a player only for their first appearance and nothing for any game played from buyback rows or later rounds they reach from there.
- A player who beats a buyback still gets 8 points for the win.
- The buyback list on the sheet isn't always complete. A name that appears in later rows and also earlier on the sheet is a buyback even when it isn't on the list.

### Known players

- "Jink JR" / "J.JR." / "J.J." is Aidan. Record him as `AIDAN`.
- "Jink" is a different person from Aidan.
- "Smokin" and "Smokin Joe" are the same person.
