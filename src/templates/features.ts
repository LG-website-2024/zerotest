import type { Template } from "tinacms";
import { HeaderField } from "./shared/HeaderField";

export const FeaturesTemplate: Template = {
  name: "featuresTemplate",
  label: "Features",
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
      name: "tabs",
      label: "Vertical Tabs",
      searchable: false,
      list: true,
      ui: {
        itemProps: (item) => ({
          label: `${item?.title?.heading || "Untitled"}`,
        }),
      },
      fields: [
        {
          type: "object",
          name: "title",
          label: "Tab Title",
          searchable: false,
          fields: [
            {
              type: "string",
              name: "heading",
              label: "Heading",
              description: "The heading of the tab",
              ui: { component: "textarea" },
            },
            {
              type: "rich-text",
              name: "expanded",
              label: "Expanded Description",
              description: "The expanded description of the tab",
            },
          ],
        },
        {
          type: "rich-text",
          name: "content",
          label: "Tab Content",
          description: "The content of the tab",
        },
      ],
    },
  ],
};
