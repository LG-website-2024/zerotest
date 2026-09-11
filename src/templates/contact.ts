import type { Template } from "tinacms";
import { HeaderField } from "./shared/HeaderField";

export const ContactTemplate: Template = {
  name: "contactTemplate",
  label: "Contact Us",
  ui: {},
  fields: [
    HeaderField,
    {
      type: "string",
      name: "subtitle",
      label: "Subtitle",
      ui: { component: "textarea" },
    },
    {
      type: "object",
      name: "contacts",
      label: "Contacts Info",
      list: true,
      searchable: false,
      ui: {
        itemProps: (item) => ({
          label: `${item?.description || "Untitled"}`,
        }),
      },
      fields: [
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
      type: "image",
      name: "background",
      label: "Background Image",
    },
  ],
};
