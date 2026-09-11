import type { Template } from "tinacms";
import { HeaderField } from "./shared/HeaderField";
import { ImageField } from "./shared/ImageField";

export const HowItWorkTemplate: Template = {
  name: "howItWorkTemplate",
  label: "How SBOM Work",
  ui: {},
  fields: [
    HeaderField,
    {
      type: "string",
      name: "subtext",
      label: "Subtext",
      ui: { component: "textarea" },
    },
    {
      type: "rich-text",
      name: "description",
      label: "Description",
      isBody: true,
    },
    ImageField,
  ],
};
