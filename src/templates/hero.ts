import type { Template } from "tinacms";
import { HeaderField } from "./shared/HeaderField";
import { CtaButtonField } from "./shared/CtaButtonField";
import { ImageField } from "./shared/ImageField";

export const HeroTemplate: Template = {
  name: "heroTemplate",
  label: "Hero",
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
      type: "string",
      name: "subtext2",
      label: "Subtext 2",
      ui: { component: "textarea" },
    },
    ImageField,
    {
      type: "image",
      name: "background",
      label: "Background Image",
    },
  ],
};
