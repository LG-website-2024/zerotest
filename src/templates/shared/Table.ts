import type { TinaField } from "tinacms";

export const TableField: TinaField = {
  type: "object",
  name: "table",
  label: "Table",
  searchable: false,
  ui: {
    itemProps: (item) => ({
      label: `Table: ${item?.title || "Untitled"}`,
    }),
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Internal Admin Title",
      description: "Only used to identify this table in the CMS.",
    },
    {
      type: "string",
      name: "headers",
      label: "Table Headers",
      list: true,
    },
    {
      type: "object",
      name: "rows",
      label: "Table Rows",
      list: true,
      searchable: false,
      ui: {
        itemProps: (item) => ({
          label: "New Row",
        }),
      },
      fields: [
        {
          type: "object",
          name: "cells",
          label: "Cells",
          list: true,
          searchable: false,
          fields: [
            {
              type: "rich-text",
              name: "value",
              label: "Content",
            },
          ],
        },
      ],
    },
  ],
};
