import { Template } from "tinacms";
import { HeaderField } from "./shared/HeaderField";
import { ImageField } from "./shared/ImageField";

export const FaqTemplate: Template = {
  name: "faq",
  label: "FAQ",
  ui: {},
  fields: [
    HeaderField,
    ImageField,
    {
      type: "object",
      label: "Questions",
      name: "questions",
      list: true,
      searchable: false,
      ui: {
        itemProps: (item) => {
          return { label: item?.question };
        },
      },
      fields: [
        {
          type: "string",
          label: "Question",
          name: "question",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "rich-text",
          label: "Answer",
          name: "answer",
          isBody: true,
        },
      ],
    },
  ],
};
