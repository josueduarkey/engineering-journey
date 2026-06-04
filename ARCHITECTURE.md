# ARCHITECTURE.md

# PURPOSE

This document defines the technical architecture of Engineering Journey.

The goal is to ensure that every AI agent, developer, or contributor follows a consistent structure throughout the lifetime of the project.

Engineering Journey is expected to evolve for multiple years.

The architecture must remain:

* Simple
* Scalable
* Maintainable
* Content-first
* Performance-oriented

---

# CORE PRINCIPLES

## Principle 1

Content is more important than visuals.

Priority order:

Content
→ User Experience
→ Performance
→ Design
→ Animations

Never sacrifice content readability for visual effects.

---

## Principle 2

Prefer static generation whenever possible.

The website is primarily a publishing platform.

Avoid unnecessary server-side complexity.

---

## Principle 3

Avoid premature complexity.

Do NOT introduce:

* Databases
* APIs
* Authentication
* Admin Dashboards
* CMS Platforms

Unless there is a clear future requirement.

---

## Principle 4

Use file-based content.

All content should live inside the repository.

Benefits:

* Version control
* Simplicity
* Portability
* Low maintenance
* Better developer experience

---

# TECHNOLOGY STACK

Framework:

Next.js 15

Language:

TypeScript

Styling:

Tailwind CSS v4

UI Components:

shadcn/ui

Animation:

Framer Motion

Content:

MDX

Internationalization:

next-intl

Theme:

next-themes

Deployment:

Vercel

Analytics:

Vercel Analytics

Icons:

Lucide React

---

# PROJECT STRUCTURE

/app

/components

/content

/lib

/types

/hooks

/public

/messages

/styles

---

# APP STRUCTURE

/app

/[locale]

/page.tsx

/journey

/projects

/projects/[slug]

/blog

/blog/[slug]

/achievements

/achievements/[slug]

/key-week

/key-week/[slug]

/curriculum

/contact

---

# INTERNATIONALIZATION

Supported Languages:

Spanish
English

Structure:

/es
/en

Examples:

/es/projects

/en/projects

All routes should support localization from the beginning.

Even if English content is not available yet.

---

# CONTENT ARCHITECTURE

All content lives inside:

/content

Structure:

content
├── projects
├── blog
├── achievements
├── journey
├── key-week
├── technologies
├── media

---

# PROJECT CONTENT

Location:

content/projects

Example:

content/projects/demo-day-2026.mdx

Frontmatter:

title
description
date
featured
status
tags
technologies
github
demo
coverImage

Example:

---

title: Demo Day 2026

description: Entrepreneurship project developed during Key Institute.

date: 2026-05-15

featured: true

status: completed

tags:

* entrepreneurship
* teamwork
* communication

technologies:

* nextjs
* typescript

github: https://...

demo: https://...

## coverImage: /projects/demo-day.jpg

---

# BLOG CONTENT

Location:

content/blog

Purpose:

Technical writing.

Examples:

* Engineering Notes
* Project Breakdowns
* Tutorials
* Reflections
* Demo Day Articles
* Key Week Articles

---

# ACHIEVEMENTS CONTENT

Location:

content/achievements

Examples:

* Demo Day Awards
* Certifications
* Scholarships
* Competitions

Each achievement should include:

title

date

description

evidence

reflection

---

# JOURNEY CONTENT

Location:

content/journey

Purpose:

Personal timeline.

Examples:

* Started learning technology
* INA experience
* Programa Oportunidades
* Technical Degree
* Key Institute

---

# KEY WEEK CONTENT

Location:

content/key-week

Purpose:

Historical archive.

Examples:

* Key Week 1
* Key Week 2
* Key Week 3

Each entry should document:

Challenge

Team

Outcome

Lessons Learned

Gallery

Reflection

---

# TAG SYSTEM

Tags are extremely important.

Tags replace the need for a search engine in early versions.

All content types may contain tags.

Examples:

artificial-intelligence

machine-learning

software-engineering

full-stack

embedded-systems

distributed-systems

computer-architecture

leadership

communication

collaboration

critical-thinking

creative-thinking

entrepreneurship

research

demo-day

key-week

engineering

---

# FEATURED CONTENT

The homepage should display featured content.

Supported:

featuredProjects

featuredArticles

featuredAchievements

Content should expose a:

featured: true

property.

---

# RELATIONSHIPS

Do not build complex relationship systems.

Keep relationships simple.

Example:

relatedContent:

* demo-day-2026
* key-week-1

The UI may display related content when available.

---

# MEDIA ORGANIZATION

/public

/projects

/blog

/journey

/achievements

/key-week

Examples:

public/projects/demo-day-2026

public/blog/first-key-week

Each content entry should own its assets.

---

# COMPONENT STRUCTURE

/components

/ui

/layout

/navigation

/home

/projects

/blog

/journey

/achievements

/key-week

/curriculum

/shared

---

# UI COMPONENTS

Reusable components belong in:

components/ui

Examples:

Button

Badge

Card

Dialog

Tabs

Accordion

Tooltip

ThemeToggle

LanguageSwitcher

---

# SHARED COMPONENTS

Examples:

SectionHeader

PageHeader

TagList

ProjectCard

ArticleCard

AchievementCard

TimelineItem

EmptyState

---

# ANIMATION STRATEGY

Use Framer Motion only.

Allowed:

Fade In

Slide Up

Page Transitions

Timeline Reveal

Card Hover

Progress Indicators

Avoid:

Three.js

Particles

Canvas Effects

Heavy Motion

---

# THEME SYSTEM

Required:

Light
Dark
System

Implementation:

next-themes

Theme Toggle must be available globally.

---

# LANGUAGE SWITCHER

Required from MVP.

Location:

Navigation Bar

Languages:

Spanish
English

Even if English content is incomplete.

Architecture must already support future translations.

---

# CURRICULUM MODULE

Future Expansion.

Route:

/curriculum

Purpose:

Visualize the degree progression.

Connect:

Courses

Projects

Skills

Power Skills

Achievements

Do not implement complex relationships initially.

Start simple.

---

# PERFORMANCE RULES

Images:

Use Next Image.

Fonts:

Optimize loading.

Content:

Prefer static rendering.

Avoid unnecessary client components.

Use Server Components whenever possible.

---

# ACCESSIBILITY RULES

Use semantic HTML.

Support keyboard navigation.

Provide alt text.

Maintain color contrast.

Support reduced motion preferences.

Accessibility is not optional.

---

# SEO RULES

Every page should include:

Title

Description

Open Graph Metadata

Twitter Metadata

Canonical URL

Structured Data when appropriate.

---

# DEVELOPMENT PHASES

Phase 1

Project Setup

Theme System

Language System

Design System

Navigation

Footer

---

Phase 2

Home

Journey

Projects

Project Detail Pages

---

Phase 3

Blog

MDX

Content Collections

---

Phase 4

Project Case Studies (MDX)

Phase 5

Certificaciones y Cursos (galería de imágenes)

Key Week

Tags

Filtering

---

Phase 5

Curriculum Explorer

---

Phase 6

Performance

Accessibility

SEO

---

# THINGS WE WILL NOT BUILD

Not in Version 1:

Database

API

Authentication

Admin Dashboard

CMS

Comments

Likes

Bookmarks

User Accounts

Complex Analytics

Search Engine

Keep the platform focused.

Engineering Journey is a content platform, not a SaaS product.

---

# FINAL RULE

Whenever there is uncertainty:

Choose the simpler solution.

The website must still be easy to maintain after four years of continuous growth.
