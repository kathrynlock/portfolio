---
title: Via
tag: Product Management
brief: Community-driven campus navigation for UT Austin.
desc: A crowdsourced campus navigation app for UT Austin students. Led product, conducted 8 user interviews, translated insights into product requirements, and wrote a comprehensive PRD and feature specs to streamline AI-assisted development across a 4-person team.
skills: [User Research, Growth, Competitive Analysis]
color: "#C8D8E8"
dark: "#3A6080"
year: "2026"
hero: /projects/via/via_hero.webp
link:
github:
---

https://youtube.com/shorts/XDey0oCIutU

The University of Texas at Austin is 400 acres and has 50,000 students. Google Maps can get you to the front door, but it can't tell you which entrance of the CBA is actually open on the weekend, which streets in Wampus (West Campus) feels unsafe at midnight, or that Speedway will be a mob on Mondays at 11:45 AM. That information exists (in the heads of seasoned students) but there's no system for passing this knowledge around.

Via is a community route-sharing app that makes that campus navigation accessible and searchable for everyone. 

## The Problem

We ran an affinity mapping session across a broad set of campus navigation pain points. Seven distinct themes emerged:

**Safety** — Many first-year students avoid going out after dark because they don't know which routes are sketchy. Resources like SureWalk exist but require advance planning and have limited range & availability.

**Construction** — Students leave home expecting their usual route, hit a blocked path, and guess their way to their next class.

**Weather** — Austin heat and surprise rain make shade and covered walkways critical. Students either guess or get drenched.

**Congestion** — The main road is unusable at peak times. Alternatives exist, but only if you know where to look.

**Building interiors** — Finding a specific room inside GDC or RLM can add 10 minutes for a new student. Entrances aren't obvious and vary by time of day.

> The problem isn't that the information doesn't exist. It's that it only lives in people's heads and never gets shared. 

## Research

We developed two core user personas: **Freshman Fiona** (18–20, wants to navigate confidently and quickly learn the campus, not just directions but shortcuts and areas to avoid) and **Experienced Ethan** (19–22, wants to an easy way to document and share the routes he's spent two years discovering).

Competitive analysis surfaced a clear gap. Google Maps is smart but campus-agnostic — it doesn't know about building shortcuts or pedestrian safety context. Strava has the social route-sharing mechanic but is built entirely around fitness. UT Map exists but has no routing, no mobile optimization, and a UI that hasn't been updated in years.

Via sits in the gap: social and community-driven like Strava, campus-specific like UT Map, and actually useful for getting to class.

## Features

**Route Recording** — Users walk a route with the app open and it renders their path in real time via GPS. Routes are saved with a departure tag, destination tag, and optional descriptors (night-safe, rain cover, construction as-of date).

**Route Feed** — Three tabs: Top (scored by recency + upvotes), Friends (your network's recent routes), and New (chronological from anyone). Routes surface the right content depending on whether you're exploring or trusting.

**Route Search** — To/from format. Returns the best matching route first, then alternatives. If no exact match exists, the closest route by proximity is suggested using MapBox API coordinate matching.

**Live Campus Events** — Users can report real-time events (construction, crowds, crime, long lines) from the home screen or mid-route. Reports show on the map for all users with a decay timer.

**Upvote / Downvote** — Community quality signal. Popular routes get a POPULAR badge in search results. Anyone can vote — you don't have to have taken the route.

## Growth Strategy

The core challenge: why would an experienced student download a new app and share routes they already know? And how do you attract freshmen before there's a meaningful route database?

**Our solution: Target Freshman Orientation**
We coordinate with orientation advisors to each record a couple of routes as advice to share with their groups, giving the app an immediate library of curated content. Incoming freshmen are both nervous and eager to take their first steps on campus. They are willing to download a new app if it can make their transition to college easier. 

> The value proposition flips as students learn the campus. Freshman arrive consuming routes. But, after just a few week they'll be recording their own

From there, the network effects kick in. Our small bank of routes grows as the new freshman discover and record their own routes. The larger bank of routes attract the next year's freshmen naturally. The app becomes more valuable the larger and more active the community is.

Freshmen join because they need help navigating. As they become experienced, the identity shift from consumer to contributor keeps them engaged. The friends feed gives them an audience for the routes they've earned the right to share.


