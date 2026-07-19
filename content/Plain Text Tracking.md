---
type_key: page
area:
  - "[[Life Ops]]"
title: Plain Text Tracking - трекаем жизнь в markdown
description: Как я трекаю всё подряд в своих обсидиан-заметках
date: 2026-07-13
tags:
  - obsidian
  - productivity
  - AI
  - blog
publish: true
---

Как трекать (время, деньги, все подряд) в plain text по аналогии с **[Plain Text Accounting](https://plaintextaccounting.org/)**. Но! Прежде чем отвечать на вопрос КАК, важно ответить на вопрос ЗАЧЕМ, а это не тема данного текста, тут только про "КАК":

Система tl;dr: 1) просто писать в day-заметки кастомные чекбоксы на все эвенты которые мы трекаем, типа `- [t] 18:00 - 19:25 играл в игру` (**t**ime), `- [a] 14:30 выпил кофе [coffee:1]` (**a**ction) (дополнительно ещё можно трекать финансы, например через `- [f] 10 EUR купил пива`), 2) потом кастомными скриптами выводить это во frontmatter и 3) на основании этого frontmatter строить красивые графики/дашборды; и верить, что, глядя на эти графики, ты можешь улучшить метрики, которые трекаешь. Как конкретно всё это трекается (как записи заносятся в markdown заметки)? Руками, через телеграм-бота или ИИшку ([[Telegram Tracking Bot]]). Хороший вариант максимально разбавлять все это различными автоматизациями (в том числе с ИИ), чем больше записей делаются автоматом тем лучше.

Как все это выглядит:

```markdown
- [t] 10:00-14:00 работа [area::[[CompanyInc]]]
- [t] 14:30-16:00 скалодром [area::[[Climbing]]]
- [a] 16:20 выпил кофе в Сондере [coffee:: 1]
- [a] 13128 steps (polar) [walk::13128] # это событие выгружено автоматически скриптом
- [a] energy (polar) [energy::3] # это событие выгружено автоматически скриптом
```
`[t]` - временные промежутки обычно в моем случае с линками на [[task_entity]], [[epic_entity]], [[area_entity]].; `[a]` - события, проишествия (выпил кофе, увидел закат, покакал) - они тоже могут быть привязаны к [[task_entity]], [[epic_entity]], [[area_entity]].

Что еще можно писать рядом с чекбоксом: `[with::[[...]]]` (с кем), `[location::X]` ...

Ещё можно записывать планы `- [p] сделать домашку по матеше` и финансы `- [f] 2000 GEL купил айпад`

`[p]`**p**lans Конкретно у меня каждое утро агент переносит события из Google Calendar, Google Tasks и просто из Obsidan заметок и получается что-то типа:

```markdown
## Plan
- [p] 12:00 Созвон с Антоном [area::[[Social]]]
- [p] 18:30 vpn for friends [area::[[Pet-Project]]]
- [p] 20:45 Просмотр кино [area::[[Social]]]
```

Финансы  `- [f]`:

```markdown
### Finance
- [f] 400 RSD скалодром Ада (sport)
- [f] 1800 RSD покушал (cafe)
- [f] 20 EUR подписка netflix (subscription)
- [f] 1600 RSD накормил кошечку (treat) [with::[[Friend33]]]
- [f] 3200 RSD краска и валики (house) [task::[[Покрасить балкон]]]
```

Скрипт периодический (например по завершению дня) парсит эти строчки и складывает все цифры в frontmatter заметки:

```yaml
---
type_key: day
date: 2026-04-05
sleep_hours: 9.0
sleep_score: 84
sleep_heart_rate_avg: 61
coffee: 1
spend_rsd: 3800
time_conpanyinc: 1.0
total_tracked_hours: 7.5
---
```

и того получается вот такой пример реальной day-заметки:

```markdown
---
type_key: day
date: 2026-07-08
alco: 2
coffee: 1
spend_rsd: 138800
time_conpanyinc: 3.0
total_tracked_hours: 3.0
---

< [[2026-07-07]] | [[2026-07-09]] >

## Plan
- [p] ~11:00 выход → поезд 12:00 → Нови-Сад: покупка MacBook [est::300] [area::[[Life Ops]]]
- [p] статья Plain Text Tracking (утро, до поездки) [est::135] [epic::[[Blog Restart]]]
- [p] 22:30-23:15 урок English [est::45] [area::[[Mind]]]

## Logs
- [a] 07:02 morning-start done [area::[[Life Ops]]]
- [t] 10:00-13:00 работа [area::[[CompanyInc]]]
- [a] 14:15 забрал посылку c amazon [area::[[Life Ops]]]
- [f] 135000 RSD билеты в Лаландию (travel)
- [f] 2300 RSD билеты на поезд (transport)
- [a] 14:16 выпил кофе [coffee::1] [area::[[Bio and Energy]]]
- [a] 16:23 выпил одно пиво [alco::1] [area::[[Bio and Energy]]]
- [f] 1500 RSD продукты (groceries)
- [a] 21:49 самодельный Moscow Mule (очень плохой) [alco::1] [area::[[Bio and Energy]]]
- [a] 23:06 контур T18 закрыт end-to-end — буфер дренирован, pending=0 [epic::[[Log Bot]]]
```

И таких заметок на каждый день в году. Далее на основании frontmatter этих заметок мы формируем дашборды, графики, ии-аналитику и тд.

Пример готовых метрик которые формируются через Dataview-запросы или Obsidian Bases:
![[plain-text-tracking-dashboard-1.png]]
![[plain-text-tracking-dashboard-2.png]]

Что делать с этими метриками - up to you! You will die!