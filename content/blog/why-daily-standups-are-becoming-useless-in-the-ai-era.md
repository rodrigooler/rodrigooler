---
title: "Why Daily Standups Are Becoming Useless in the AI Era"
description: "Daily standups used to be a coordination tool. Today, with better async workflows and AI-assisted status sharing, they often waste engineering time at scale."
date: "2026-03-26"
tags: ["agile", "standup", "ai", "productivity", "engineering"]
readingTime: "6 min read"
ogImage: "/og-images/why-daily-standups-are-becoming-useless-in-the-ai-era.png"
featured: false
---

Daily standups were supposed to improve coordination.

In practice, they often became a ritual that burns engineering time without giving much back. The old 15-minute promise sounds harmless, but in most real teams it becomes 30 minutes, 1 hour, or even 1 hour 30 minutes once the conversation starts and people wait their turn.

Strictly speaking, "daily" is the cadence and "standup" is the ceremony. In practice, people just use "daily" as shorthand for the meeting itself.

That is where the math gets ugly.

## Why it used to make sense

Standups were useful when teams had poor visibility and weak async tooling. They helped surface blockers, expose dependencies, and give managers a quick snapshot of progress.

The problem is that many companies kept the ceremony long after the reason for it weakened.

Today, engineers already have:

- ticket boards
- pull request summaries
- commit history
- Slack updates
- AI-generated status recaps

If the status already exists in the system of record, forcing the whole team into a synchronous update ritual is usually redundant.

## The real cost

The meeting itself is not the full cost. The expensive part is the context switching before and after it.

Let’s make the assumptions explicit:

- 5 workdays per week
- one daily standup every workday
- everyone attends
- the realistic range is 30 minutes to 1 hour 30 minutes per day

### Cost per engineer

If the daily lasts **30 minutes**:

- per week: `2.5 hours`
- per month: `10.8 hours`
- per year: `130 hours`

If the daily lasts **1 hour 30 minutes**:

- per week: `7.5 hours`
- per month: `32.5 hours`
- per year: `390 hours`

A single engineer can lose **130 to 390 hours per year** to a ritual that is supposed to save time.

## Visualizing the waste

The charts make the hidden tax easier to see.

![Yearly hours lost per engineer from a daily standup](/blog/charts/daily-standup-cost-per-engineer.svg)

![Yearly hours lost at scale from daily standups](/blog/charts/daily-standup-cost-at-scale.svg)

### 6-person startup

If the team has 6 people:

- **30 minutes** per day = `780 hours` per year
- **1 hour 30 minutes** per day = `2,340 hours` per year

That is roughly **0.4 to 1.1 full-time work-years** every year.

### 300-person company

If the company has 300 people:

- **30 minutes** per day = `39,000 hours` per year
- **1 hour 30 minutes** per day = `117,000 hours` per year

That is roughly **18.8 to 56.3 full-time work-years** every year.

## What AI changed

AI did not remove the need for communication. It removed a lot of the manual work that used to justify the meeting.

Teams can now get:

- better summaries
- faster blocker detection
- cleaner async updates
- more visible project state

So the daily often becomes a low-value repetition of information people already have.

## What should replace it

Not silence. Better communication.

For most teams, that means:

- async updates in Slack, Linear, Jira, or Notion
- clear ownership
- visible blockers
- short syncs only when a real decision or dependency needs conversation

If the team still needs a live meeting, it should be because it is solving something that cannot be solved async.

Reading yesterday’s task list is not that.

## The rule I would use

- keep a daily only if it consistently removes blockers faster than async communication
- otherwise, replace it with written updates or a few syncs per week
- reserve live meetings for decisions, incidents, and real collaboration

## Bottom line

Daily standups made sense when information was hard to see.

In the AI era, they are often just a recurring tax on engineering time.

If the meeting cannot prove its value, it should not survive by habit.
