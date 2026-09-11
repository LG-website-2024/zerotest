import type { Template } from "tinacms";
import { HeaderField } from "./shared/HeaderField";

export const TargetAudienceTemplate: Template = {
  name: "targetAudienceTemplate",
  label: "Target Audience",
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
      name: "targets1",
      label: "Targets line 1",
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
          type: "string",
          name: "description",
          label: "Description",
        },
        {
          type: "image",
          name: "icon",
          label: "Icon",
        },
      ],
    },
    {
      type: "object",
      name: "targets2",
      label: "Targets line 2",
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
          type: "string",
          name: "description",
          label: "Description",
          ui: { component: "textarea" },
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
