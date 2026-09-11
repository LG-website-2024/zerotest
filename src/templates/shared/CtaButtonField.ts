import type { TinaField } from "tinacms";

export const CtaButtonField: TinaField = {
  type: "object",
  name: "ctaBtn",
  label: "CTA Button",
  searchable: false,
  fields: [
    {
      type: "string",
      name: "label",
      label: "Text",
    },
    {
      type: "string",
      name: "url",
      label: "Link",
    },
    {
      type: "string",
      name: "variant",
      label: "Style",
      options: [
        { label: "Primary", value: "default" },
        { label: "Secondary", value: "secondary" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
      ],
    },
    {
      type: "string",
      name: "size",
      label: "Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Default", value: "default" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      type: "boolean",
      name: "newTab",
      label: "Open in new tab",
      searchable: false,
    },
  ],
};
