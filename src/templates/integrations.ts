import type { Template } from "tinacms";
import { HeaderField } from "./shared/HeaderField";

export const IntegrationsTemplate: Template = {
  name: "integrationsTemplate",
  label: "Integrations",
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
      type: "object",
      name: "contents",
      label: "Contents",
      list: true,
      searchable: false,
      ui: {
        itemProps: (item) => ({
          label: `${item?.name || "Untitled"}`,
        }),
      },
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name",
        },
        {
          type: "rich-text",
          name: "description",
          label: "Description",
          isBody: true,
        },
        {
          type: "image",
          name: "icon",
          label: "Icon",
        },
      ],
    },
    {
      type: "image",
      name: "background",
      label: "Background Image",
    },
  ],
};
