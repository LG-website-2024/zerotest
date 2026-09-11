import type { TinaField } from "tinacms";

export const ImageField: TinaField = {
  type: "object",
  name: "image",
  label: "Image",
  searchable: false,
  fields: [
    {
      type: "image",
      name: "src",
      label: "Image URL",
    },
    {
      type: "string",
      name: "alt",
      label: "Alt Text",
      description: "Describe the image for accessibility and SEO",
    },
  ],
};
