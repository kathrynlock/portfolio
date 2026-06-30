---
title: Soldering Circuits at Midnight
date: 2025-10-08
readMins: 5
tags: [School Life, Behind the Scenes]
heroColor: "var(--blue-light)"
excerpt: The ECE lab at 11:43pm, three burnt fingertips, and an LED that finally, mercifully, blinked.
pull: A circuit will tell you exactly what is wrong if you are humble enough to ask twice.
---

It is a specific feeling to be alone in an engineering lab at midnight with a multimeter that disagrees with your assumptions. Everyone I know has had a version of this night. Here is mine, lovingly annotated.

The assignment was to build a simple LED blinker circuit on a breadboard, then migrate it to a custom PCB. The breadboard version worked on the first try, which should have been a warning sign. Things that work immediately in labs tend to be storing up their failure for later.

The PCB version did not blink. I had it running off a microcontroller and something in my pin mapping was wrong. I spent an hour convinced the problem was the hardware. It was the code. It is always either the hardware or the code, and the one you check first is never the one.

The burnt fingertips came from the soldering iron, which I set down on the wrong side of my workspace and then immediately picked up by the wrong end. This is a mistake you make exactly once.

At around 1am I found the bug. I had transposed two pin numbers in my header file. When the LED blinked for the first time, I made a sound that I am glad no one else was there to hear.

What I keep from that night is not the debugging process specifically, but the quality of attention it required. When something is not working and you cannot look up the answer, you have to look at the thing itself. You have to understand it well enough to ask the right question. That turns out to be most of engineering.

Also: label your components before you start. I cannot emphasize this enough.
