import type { Template } from "tinacms";
import { HeaderField } from "./shared/HeaderField";
import { TableField } from "./shared/Table";

export const ContextTemplate: Template = {
  name: "contextTemplate",
  label: "Martket Context",
  ui: {},
  fields: [
    HeaderField,
    {
      type: "string",
      name: "subtext",
      label: "Subtext",
      ui: { component: "textarea" },
    },
    TableField,
    {
      type: "string",
      name: "subtext2",
      label: "Subtext 2",
      ui: { component: "textarea" },
    },
  ],
};
