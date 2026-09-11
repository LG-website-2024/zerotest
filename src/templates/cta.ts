import type { Template } from "tinacms";
import { HeaderField } from "./shared/HeaderField";
import { CtaButtonField } from "./shared/CtaButtonField";

export const CtaTemplate: Template = {
  name: "ctaTemplate",
  label: "CTA",
  ui: {},
  fields: [
    HeaderField,
    {
      type: "string",
      name: "subtext",
      label: "Subtext",
      ui: { component: "textarea" },
    },
    CtaButtonField,
    {
      type: "image",
      name: "background",
      label: "Background Image",
    },
  ],
};
