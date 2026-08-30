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

## Stats and ratings

What sets Ski Club apart from the other PUG nights is that it keeps records. Match stats
are collected and processed idempotently — reprocessing the same match does not
double-count it, so the numbers stay correct even when a game has to be re-imported.

Those results feed **TrueSkill** ratings. TrueSkill is a Bayesian skill-rating system
developed by Microsoft Research, designed for team games rather than one-on-one play: it
tracks both an estimate of each player's skill and how confident it is in that estimate,
updating both after every match. That makes it well suited to pick-up games, where teams
are drafted fresh each time and a player might only appear occasionally.

- [TrueSkill at Microsoft Research](https://www.microsoft.com/en-us/research/project/trueskill-ranking-system/)

In practice it means teams can be balanced from ratings that reflect actual results, rather
than from guesswork about who is good.

## Taking part

Sign-ups happen in the Cut's Discord. Find it through [PlayT2.com](https://playt2.com) or
the [tournament site](https://tribes2forever.com).
