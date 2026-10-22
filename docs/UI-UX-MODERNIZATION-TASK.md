# UI/UX modernization task

## Outcome

Modernize every A2NY IT WORKS page into a confident, contemporary technology-partner experience while preserving plain-language content, trust, performance, and accessibility.

## Design direction

- Editorial layouts with stronger hierarchy and distinctive technical visuals.
- Navy/ink foundations, electric blue/cyan actions, pale blue hero surfaces, warm off-white alternates, and one restrained signal accent.
- Reusable hero variants, proof strips, outcome-led service cards, case-study cards, timelines, FAQs, CTA bands, and accessible form states.
- Real proof and original diagrams prioritized over generic stock imagery.
- Motion is informative, 150–700ms, and disabled under `prefers-reduced-motion`.
- Mobile-first layouts, keyboard support, WCAG 2.2 AA contrast, semantic landmarks, and stable media dimensions.

## Page priorities

1. Foundation plus Home and Contact conversion refresh.
2. Reusable Services and service-detail templates.
3. Solutions and Industries outcome-led journeys.
4. Portfolio as a measurable case-study library.
5. Resources as an editorial hub.
6. About as mission, people, and evidence.

## Current implementation slice

- Establish shared visual tokens and surface hierarchy.
- Strengthen header, buttons, cards, page heroes, form styling, and focus states.
- Refresh Contact with trust/proof context and a clear post-submission expectation.
- Preserve existing routes, content, responsive behavior, and reduced-motion support.

## Completion update

- Added shared editorial tokens, accessible interaction states, responsive layouts, and reduced-motion handling across the site.
- Expanded Services into customer-problem groups with proof-oriented service guidance.
- Added outcome-led journeys to Solutions and context mapping to Industries.
- Rebuilt Portfolio as a filterable proof library with responsive imagery, service tags, and evidence lists.
- Rebuilt Resources/Blog as a searchable, filterable editorial hub.
- Expanded About with point of view, operating principles, evidence, and partner context.
- Added two original branded technical images at `client/public/images/case-network-rack.png` and `client/public/images/case-board-repair.png`; retained the existing smart-access image until a suitable approved replacement is available.
- Verified build/prerender, browser QA, server tests, and whitespace checks.

## Acceptance criteria

- All existing routes still build and prerender.
- Home and Contact visibly use the shared modern system.
- Forms and navigation retain keyboard/focus accessibility.
- Existing automated QA remains green.
- Portfolio and Resources support usable filters/search without requiring a backend.
- Claims remain explicit about representative work versus client-approved measured outcomes.
