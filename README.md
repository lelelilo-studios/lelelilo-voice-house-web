# Lelelilo Voice House

**A plush dollhouse where every voice was made at home, on one graphics card: 20 rooms, each one a thing
[VoiceStudio](https://github.com/debpalash/VoiceStudio) (free, open-source voice AI that runs on your own computer)
can do.** Open it: **https://lelelilo-studios.github.io/lelelilo-voice-house-web/**

Every room plays the real sound VoiceStudio made on one PC (voices designed from words, cloned voices, twenty-two
languages, laughs and sighs, an audiobook, six speech engines racing, emotions, transcripts, live dictation,
voices pulled out of noise, a dubbed scene and an invisible watermark), with an animation that follows it, and a
care tag with exactly what went in, what came back, the call, and what it took on that PC.

| No. | Room | Feature | Audio | GPU work | Energy |
|---|---|---|---|---|---|
| 01 | [Portrait Staircase](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/01-portrait-staircase/) | Every voice on this PC | 327 s | 84.3 s | 1.63 Wh |
| 02 | [Sewing Room](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/02-sewing-room/) | Voice design from words | 47 s | 6.2 s | 0.20 Wh |
| 03 | [Front Door](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/03-front-door/) | Strangers by seed | 38 s | 2.5 s | 0.12 Wh |
| 04 | [Map Room](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/04-map-room/) | Accents and dialects | 132 s | 10.5 s | 0.41 Wh |
| 05 | [Postcard Wall](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/05-postcard-wall/) | One voice, 22 languages | 227 s | 25.7 s | 0.91 Wh |
| 06 | [The Sofa](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/06-sofa/) | Laughs, sighs and gasps | 26 s | 5.6 s | 0.18 Wh |
| 07 | [Music Room](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/07-music-room/) | Speed, pauses and length | 47 s | 13.7 s | 0.41 Wh |
| 08 | [The Pantry](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/08-pantry/) | Pronunciation | 34 s | 7.2 s | 0.23 Wh |
| 09 | [Paint Shop](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/09-paint-shop/) | Six finishes | 25 s | 2.0 s | 0.10 Wh |
| 10 | [The Kitchen](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/10-kitchen/) | Quality steps and streaming | 106 s | 13.4 s | 0.67 Wh |
| 11 | [The Garage](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/11-garage/) | Six speech engines | 129 s | 58.4 s | 1.22 Wh |
| 12 | [Mood Lamp](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/12-mood-lamp/) | Emotion control | 40 s | 22.7 s | 0.90 Wh |
| 13 | [Copy Room](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/13-copy-room/) | Voice cloning | 33 s | 6.0 s | 0.26 Wh |
| 15 | [Children's Room](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/15-childrens-room/) | Audiobooks | 80 s | 17.6 s | 0.45 Wh |
| 16 | [The Study](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/16-study/) | Speech to text | 80 s | 5.6 s | 0.15 Wh |
| 17 | [Phone Nook](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/17-phone-nook/) | Live dictation | 30 s | 1.1 s | 0.18 Wh |
| 18 | [Dinner Table](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/18-dinner-table/) | Who spoke when | 36 s | 3.7 s | 0.09 Wh |
| 19 | [The Laundry](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/19-laundry/) | Voice from the noise | 23 s | 2.9 s | 0.06 Wh |
| 20 | [TV Room](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/20-tv-room/) | Dubbing | 107 s | 23.6 s | 0.60 Wh |
| 21 | [The Attic](https://lelelilo-studios.github.io/lelelilo-voice-house-web/demos/21-attic/) | Invisible watermark | 7 s | 6.0 s | 1.10 Wh |
| | **The whole house** | | **1,573 s** | **319 s** | **9.85 Wh** |

Measured on one NVIDIA GeForce RTX 4080 SUPER (16 GB), in October 2026: the graphics card's own energy counter while each room was made. No money changed hands: the
whole house took about as much electricity as a kettle uses in 18 seconds.

The animations draw with WebGPU: Chrome on Android and computers, Edge, Safari 26+ on iPhone, iPad and Mac. Every
room still plays its sound without it.

This repository holds only the published build. Made by [Lelelilo-Studios](https://lelelilo.com/?ref=lelelilo-voice-house). See
[CREDITS.md](CREDITS.md) and [NOTICE.txt](NOTICE.txt): the voices come from models with their own licences
(OmniVoice's is non-commercial), so this site is non-commercial too.

Built with Higgs Materials licensed from Boson AI USA, Inc., Copyright Boson AI USA, Inc., All Rights Reserved and
Meta Llama 3 licensed under the Meta Llama 3 Community License, Copyright Meta Platforms, Inc., All Rights Reserved.
