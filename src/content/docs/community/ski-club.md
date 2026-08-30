---
title: 'Ski Club'
description: '5v5 LCTF pick-up games run by slush, with match stats and TrueSkill ratings tracked across games.'
categories: []
sidebar:
  order: 6
---

**Ski Club** runs **5v5 LCTF pick-up games**, organised through the
[| The Cut |](/community/the-cut) Discord rather than on a server you drop into.

It is run by **slush**, also known as **s5h** and **FONDU**.

## The stats site

Results are published at **[skiclub.duckdns.org](https://skiclub.duckdns.org/)**, which
carries:

- **Matches** — a history of games, each with a full scoresheet
- **Leaderboards** — separate tables for LCTF, duelling and Shazbux
- **TrueSkill** — a page per player showing their rating over time
- **Recent LCTF games** — the latest results on the front page, with damage share and
  predicted outcomes alongside each

Match stats are collected and processed idempotently: reprocessing the same match does not
double-count it, so the numbers stay correct even when a game has to be re-imported.

## TrueSkill ratings

Results feed **TrueSkill** ratings. TrueSkill is a Bayesian skill-rating system developed by
Microsoft Research, designed for team games rather than one-on-one play: it tracks both an
estimate of each player's skill and how confident it is in that estimate, updating both
after every match. That suits pick-up games, where teams are drafted fresh each time and a
player might only appear occasionally.

- [TrueSkill at Microsoft Research](https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/)

It means teams can be balanced from ratings that reflect results, and it is also what drives
the predicted outcomes shown against each game.

## Taking part

Sign-ups happen in the Cut's Discord. Find it through [PlayT2.com](https://playt2.com) or
the [tournament site](https://tribes2forever.com).
