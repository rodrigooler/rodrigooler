---
title: "Why Daily Standups Are Becoming Useless in the AI Era"
description: "Daily standups used to be a coordination tool. Today, with better async workflows and AI-assisted status sharing, they often waste engineering time at scale."
date: "2026-03-26"
tags: ["agile", "standup", "ai", "productivity", "engineering"]
readingTime: "7 min read"
featured: false
---

Daily standups were supposed to improve coordination.

In practice, they often became a ritual that consumes engineering time without producing much value. That problem existed long before AI. The difference now is that AI, better async tooling, and more mature engineering workflows make the cost harder to justify.

Strictly speaking, "daily" is the cadence and "standup" is the ceremony. In practice, people usually say "daily" as shorthand for the standup that happens every day.

The official promise is 15 minutes. In reality, I almost never worked at a company where it stayed there. The common range was 30 minutes to 1 hour and 30 minutes, and that is where the math gets ugly very quickly.

And once you scale that across a small startup or a larger company, you are no longer talking about a harmless meeting. You are talking about a recurring drain on human time.

## Why daily standups existed in the first place

The original idea was reasonable.

Daily standups were meant to:

- surface blockers early
- keep the team aligned
- expose dependencies
- create light accountability
- reduce long status meetings later

That made sense when:

- information moved slowly
- tickets were less visible
- teams lacked good async tools
- managers needed a quick way to understand progress

The issue is that many companies kept the ceremony after the reason for it weakened.

Instead of becoming a lightweight coordination check, the daily often turned into one of three things:

- a status broadcast to the manager
- a sequence of mini-updates nobody really needs
- a meeting where people repeat what is already in Jira, Slack, GitHub, or Linear

That is not coordination. That is overhead.

## The AI era changed the economics

AI does not magically remove the need for communication.

What it does remove is a lot of the manual work that used to justify a daily status ritual. Today, engineers can get value from:

- AI-generated summaries of pull requests
- automatic status extraction from tickets and commits
- structured async updates in chat
- better issue tracking and project visibility
- smarter copilots that help answer “what changed?” faster

When the team already has those signals, forcing everyone into a synchronous meeting just to say what they did yesterday is usually redundant.

The meeting does not become useful just because the org has more tools.
It often becomes less useful, because the toolchain already captures the status that the meeting was invented to capture.

## The hidden cost is bigger than it looks

People usually underestimate this kind of meeting because they measure it badly.

They think:

- “It is only 15 minutes.”
- “It keeps everyone aligned.”
- “Everyone is already online anyway.”

But those statements ignore the real cost:

- context switching before and after the meeting
- fragmented deep work
- duplicated reporting
- interruptions during the most productive part of the day
- cumulative loss across the whole team

The expensive part is not only the meeting itself.
The expensive part is the engineering time that gets chopped into smaller pieces and never fully recovered.

## The math

Let’s make the assumptions explicit.

- 5 workdays per week
- one daily standup every workday
- average attendance from everyone in the team
- the nominal target is 15 minutes, but the real-world range is often 30 minutes to 1 hour 30 minutes per day

### Cost per engineer

If the daily lasts **30 minutes**:

- per week: `2.5 hours`
- per month: `10.8 hours`
- per year: `130 hours`

If the daily lasts **1 hour 30 minutes**:

- per week: `7.5 hours`
- per month: `32.5 hours`
- per year: `390 hours`

That means a single engineer can lose between **130 and 390 hours per year** to this ritual.

### Small startup: 6 people

For a 6-person team:

If the daily lasts **30 minutes**:

- per week: `15 hours`
- per month: `64.8 hours`
- per year: `780 hours`

If the daily lasts **1 hour 30 minutes**:

- per week: `45 hours`
- per month: `194.9 hours`
- per year: `2,340 hours`

That is not a small meeting problem.
That is the equivalent of roughly **0.4 to 1.1 full-time work-years** every year, depending on the length.

### Company with 300 employees

For a 300-person company:

If the daily lasts **30 minutes**:

- per week: `750 hours`
- per month: `3,247.5 hours`
- per year: `39,000 hours`

If the daily lasts **1 hour 30 minutes**:

- per week: `2,250 hours`
- per month: `9,742.5 hours`
- per year: `117,000 hours`

That is the equivalent of about **18.8 to 56.3 full-time work-years** every year.

Put another way, a company can silently lose the output of an entire engineering department to a meeting format that was supposed to save time.

## Visualizing the waste

The numbers become easier to digest when you look at them as charts.

![Daily standup cost per engineer over a week, month, and year](/blog/charts/daily-standup-cost-per-engineer.png)

![Daily standup cost at scale for a 6-person startup versus a 300-person company](/blog/charts/daily-standup-cost-at-scale.png)

The point is not that every meeting destroys productivity by itself.
The point is that small daily costs compound into a very large annual tax when they are multiplied by every engineer on the team.

## Why it was already inefficient before AI

The uncomfortable truth is that many teams never used standups well.

They treated them like a compliance exercise instead of a coordination tool.

That created several predictable failures:

- people reported status instead of surfacing blockers
- the meeting became a manager update
- the same information got repeated in multiple places
- low-value updates were rewarded because the ritual expected everyone to speak
- the meeting kept expanding as the team grew

So even before AI, the real problem was not that standups were universally bad.
The problem was that they were commonly used badly.

AI just exposes that weakness faster.

When a tool can summarize work, highlight blockers, and pull context from the actual system of record, the old meeting starts looking even more outdated.

## What should replace it

The answer is not “no communication.”

The answer is **better communication with less interruption**.

For most modern engineering teams, that means:

- async updates in Slack, Linear, Jira, or Notion
- clear ticket ownership
- visible project boards
- lightweight written status summaries
- direct pings only when something is actually blocked
- short sync meetings only for real dependency resolution

If the team still needs a live conversation, it should be because:

- a decision is blocked
- a cross-functional dependency needs alignment
- an incident is active
- pair debugging is useful
- architecture needs discussion

That is a valid use of synchronous time.

Reading off yesterday’s task list is not.

## Why companies should start killing the ritual

Companies should start removing daily standups because the default assumption is backwards.

The burden of proof should not be on the person asking to skip the meeting.
The burden of proof should be on the meeting itself.

If a daily standup cannot show measurable value, it should not survive out of habit.

That matters even more in the AI era because the baseline cost of status collection has dropped. Teams can now get:

- faster summaries
- better visibility
- lower coordination overhead
- more accurate reporting

If the output of the meeting is the same update you could have read in 30 seconds, the meeting is a tax on the team.

## A practical rule

Here is the rule I would use:

- keep a daily only if it consistently removes blockers faster than async communication
- otherwise, replace it with a written daily update or a few syncs per week
- reserve live meetings for decisions, blockers, and collaboration that actually needs a conversation

That gives you the upside of alignment without paying for it every single day.

## Bottom line

Daily standups were useful when teams had poor visibility and weak async tooling.

They are much less useful now.

In the AI era, they are often a low-signal ritual that burns engineering hours, creates context switching, and scales badly as teams grow.

For small teams, the waste is already meaningful.
For larger organizations, it becomes enormous.

The real question is no longer whether standups feel familiar.
The question is whether they are worth the human time they consume.

In many companies, the answer is no.
