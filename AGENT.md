# AGENT.md

## PROJECT OVERVIEW

Project Name: Engineering Journey

Engineering Journey is a long-term digital platform designed to document the complete academic, technical, and professional growth of Josué García throughout his Engineering in Integrated Computer Science degree at Key Institute.

This is NOT a traditional portfolio.

This project is an Engineering Operating System that serves as:

* Personal Engineering Journal
* Technical Portfolio
* Learning Repository
* Project Archive
* Knowledge Base
* Public Documentation Platform
* Career Timeline

The platform will grow continuously over multiple years.

Every design and architectural decision must prioritize scalability, maintainability, and content longevity.

---

# PRIMARY OBJECTIVES

Priority Order:

1. Document long-term growth
2. Showcase engineering capabilities
3. Demonstrate project-based learning outcomes
4. Inspire future engineering students
5. Support future career opportunities
6. Create a historical record of achievements

The website should answer:

* Who is Josué?
* What has he built?
* How has he grown?
* What problems has he solved?
* What has he learned?
* What impact has he generated?

---

# USER PROFILE

Name:
Josué García

Current Program:
Engineering in Integrated Computer Science

Institution:
Key Institute

Background:

* Early technology education from childhood
* Graphic design foundations
* Software development training
* Technical Degree in Computer Science
* Programa Oportunidades scholar
* Engineering student at Key Institute

Interests:

* Software Engineering
* Artificial Intelligence
* Systems Design
* Embedded Systems
* Full Stack Development
* Engineering Innovation
* Entrepreneurship
* Education

---

# EDUCATIONAL MODEL

Key Institute follows a Project-Based Learning (PBL) methodology.

Projects are the center of learning.

Every project should showcase:

* Problem solving
* Research
* Engineering thinking
* Team collaboration
* Communication
* Iteration
* Reflection

The platform should communicate this philosophy clearly.

---

# CORE COMPETENCIES

The educational model emphasizes four major competencies.

Every project must be connected to them.

## Critical Thinking

Ability to analyze, evaluate and solve complex problems.

## Creative Thinking

Ability to generate innovative solutions.

## Effective Communication

Ability to present ideas clearly.

## Effective Collaboration

Ability to work successfully with teams.

Every project page must include a competency section.

---

# CURRICULUM CONTEXT

The platform must recognize and reflect the progression of the degree.

Foundation Stage:

* Programming Fundamentals
* Calculus
* Physics
* Chemistry
* Personal Development

Computer Science Core:

* Object-Oriented Programming
* Data Structures
* Algorithms
* Machine Learning
* AI Engineering

Systems Engineering:

* Computer Architecture
* Operating Systems
* Distributed Systems

Hardware & Electronics:

* Semiconductors
* Circuits
* Solid State Electronics
* Embedded Systems

Professional Engineering:

* Project Management
* Finance
* Entrepreneurship
* Leadership
* Capstone Project

The curriculum should eventually be represented visually through an interactive learning map.

---

# DESIGN PHILOSOPHY

The platform should feel:

* Professional
* Technical
* Modern
* Clean
* Intentional
* Engineering-focused

Avoid:

* Generic portfolio templates
* Overly flashy animations
* Excessive visual noise
* Trend-driven design decisions

Focus on:

* Clarity
* Storytelling
* Growth visualization
* Knowledge sharing

---

# BRAND SYSTEM

Primary Color:

#006DFF

Meaning:

* Computing
* Software
* Artificial Intelligence
* Innovation

Secondary Color:

#31E083

Meaning:

* Engineering
* Progress
* Growth
* Learning

Neutral Colors:

#111111
#FFFFFF
#E3E7E8

---

# DARK MODE

Dark mode is required.

Support:

* Light Mode
* Dark Mode
* System Preference

Implementation:

next-themes

The theme switcher must be available in the navigation bar from MVP version.

---

# INTERNATIONALIZATION

The platform must be prepared for bilingual support from day one.

Supported Languages:

* Spanish
* English

Implementation Strategy:

Use i18n architecture from the beginning.

Examples:

/es
/en

Even if only Spanish content exists initially, the architecture must support future English content.

Language switcher must exist in MVP.

Initial behavior:

* Spanish fully functional
* English marked as Coming Soon if necessary

---

# TECHNOLOGY STACK

Framework:

Next.js 15 App Router

Language:

TypeScript

Styling:

Tailwind CSS v4

Components:

shadcn/ui

Animations:

Framer Motion

Content:

MDX

Content Management:

Git-Based

No CMS

Deployment:

Vercel

Analytics:

Vercel Analytics

Icons:

Lucide React

Theme:

next-themes

Code Quality:

ESLint
Prettier

---

# ANIMATION GUIDELINES

Use:

Framer Motion

Allowed:

* Page transitions
* Section reveals
* Scroll animations
* Timeline animations
* Card interactions
* Progress animations

Avoid:

* Three.js
* Heavy WebGL
* Particle backgrounds
* Unnecessary effects

Animations should support storytelling.

Never animate for decoration alone.

---

# SITE STRUCTURE

About Me

Journey

Projects

Project Details

Blog

Article Details

Certifications

Contact

---

# HOME PAGE

Purpose:

Provide an immediate overview.

Sections:

1. Hero
2. Engineering Journey Preview
3. Featured Projects
4. Learning Areas
5. Power Skills
6. Latest Articles
7. Achievements Preview
8. Contact CTA

---

# JOURNEY PAGE

Purpose:

Visualize the complete engineering journey.

Timeline should include:

* Early Technology Education
* Software Development Training
* Programa Oportunidades
* Technical Degree
* Key Institute
* Future Milestones

Each milestone may contain:

* Images
* Reflections
* Skills
* Projects
* Articles

---

# PROJECT SYSTEM

Projects are the platform's most important content type.

Every project must follow a Case Study structure.

Required Sections:

Problem

Research

Planning

Design

Implementation

Testing

Results

Lessons Learned

Power Skills

Technologies

Gallery

Resources

Repository

Demo

---

# BLOG SYSTEM

Purpose:

Document learning publicly.

Content Types:

* Project Breakdowns
* Technical Articles
* Key Week Reflections
* Demo Day Experiences
* Engineering Notes
* Tutorials
* Career Reflections

MDX Required.

---

# CERTIFICATIONS

Galería de imágenes de certificaciones y cursos completados.

Datos en: `lib/certifications.ts`

Categorías: Desarrollador, AI, Soft Skills, Talleres

---

# CONTENT STRATEGY

Every meaningful experience should generate content.

Recommended Output:

Event
↓
Project
↓
Article
↓
Reflection
↓
Timeline Entry

The website should continuously accumulate knowledge.

---

# DEVELOPMENT PHASES

~~Phase 1~~

~~Project Setup~~
~~Design System~~
~~Theme System~~
~~Language System~~
~~Navigation~~

~~Phase 2~~

~~Home~~ *(Hero-only, minimalista — secciones completas se construirán en el futuro cuando haya contenido real)*
~~Journey~~
~~Projects~~

~~Phase 3~~

~~MDX Integration~~
~~Blog System~~

~~Phase 4~~

~~Project Case Studies (MDX migration + improved detail pages)~~

~~Phase 5~~

~~Certificaciones y Cursos~~
~~Página de Contacto~~
About Me *(pendiente de detalles finales)*

Phase 6

Analytics
SEO
Accessibility

Phase 7

Growth Dashboard
Advanced Visualizations

---

# SUCCESS METRICS

A recruiter understands the profile within 5 minutes.

A student understands what studying at Key Institute looks like.

A technical interviewer can evaluate engineering depth.

The platform becomes a multi-year record of growth and achievement.

---

# AI DEVELOPMENT RULES

Before implementing features:

1. Prioritize simplicity.
2. Prioritize scalability.
3. Prioritize maintainability.
4. Prioritize accessibility.
5. Prioritize performance.

Never introduce complexity without clear justification.

Never sacrifice content readability for visual effects.

Always think in terms of a platform that will still be maintained and expanded four years from now.

Engineering Journey is a long-term engineering documentation platform, not a portfolio template.
