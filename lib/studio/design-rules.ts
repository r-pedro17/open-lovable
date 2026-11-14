/**
 * Quality rubric for improved (not merely copied) website reconstruction.
 * Keep source content, destination links and accessible interactions intact.
 */
export const DESIGN_QUALITY_RULES = `
Your goal is a premium, production-minded improvement to the reference website.
Preserve factual content, business identity, links, semantic heading order and functionality.
Do not invent testimonials, awards, prices, contact details or company claims.
Typography: use a deliberate type scale, readable line-height, consistent weights,
and no more than two complementary font families.
Spacing: apply a consistent spacing rhythm, restrained radii and clear visual hierarchy.
Layout: establish a strong hero, meaningful section order and generous whitespace;
do not stack decorative components without purpose.
Visuals: respect image aspect ratios, optimize assets, preserve alt descriptions,
and avoid generic gradients or random animations.
Accessibility: use semantic HTML, visible keyboard focus, contrast-aware colors,
descriptive buttons and reduced-motion preferences.
Responsive: design intentionally at 375px, 768px and 1440px, without horizontal overflow.
Output: React components with maintainable structure, no placeholders and no broken anchors.
Self-check: assess typography, hierarchy, spacing, responsiveness, semantics,
interactions and visual consistency; fix the most important defects before finishing.
`.trim();

export const QUALITY_CHECKS = [
  'All required content and links preserved',
  'No fabricated claims or filler copy',
  'Responsive at 375px, 768px and 1440px',
  'Semantic HTML, keyboard navigation and visible focus',
  'Consistent typography, spacing and color system',
  'No broken navigation targets or missing images',
  'User can export complete working React source',
] as const;
