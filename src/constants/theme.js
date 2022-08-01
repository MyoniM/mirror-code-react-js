import { tags as t } from "@lezer/highlight";
export const highlight = [
  { tag: t.comment, color: "#6272a4" },
  { tag: t.string, color: "#f1fa8c" },
  { tag: t.atom, color: "#bd93f9" },
  { tag: t.meta, color: "#f8f8f2" },
  { tag: [t.keyword, t.operator, t.tagName], color: "#ff79c6" },
  { tag: [t.function(t.propertyName), t.propertyName], color: "#66d9ef" },
  { tag: [t.definition(t.variableName), t.function(t.variableName), t.className, t.attributeName], color: "#50fa7b" },
  { tag: t.atom, color: "#bd93f9" },
];

export const userColors = [
  { color: "#30bced", light: "#30bced33" },
  { color: "#ee6352", light: "#ee635233" },
  { color: "#1be7ff", light: "#1be7ff33" },
];
