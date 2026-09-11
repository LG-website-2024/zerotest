import type { Template } from "tinacms";
import { HeaderField } from "./shared/HeaderField";

export const CapabilitiesTemplate: Template = {
  name: "capabilitiesTemplate",
  label: "Capabilities",
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
      name: "capabilities",
      label: "Capabilities",
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
