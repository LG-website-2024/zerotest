import type { TinaField } from "tinacms";

export const HeaderField: TinaField = {
  type: "string",
  name: "header",
  label: "Header",
  description: "Wrap text in curly braces to highlight it. Example: {Sites,} Docs and Llamas.",
  ui: { component: "textarea" },
  searchable: false,
};