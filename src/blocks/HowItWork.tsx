import Image from "next/image";
import type { FC } from "react";
import type { PagesBlocksHowItWorkTemplate, PagesBlocksIntroTemplate } from "../../tina/__generated__/types";
import { SmartTitle } from "@/components/ui/SmartTitle";
import { SmartSubtext } from "@/components/ui/SmartSubtext";
import { tinaField } from "tinacms/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = {
  data: PagesBlocksHowItWorkTemplate;
};

export const HowItWorkBlock: FC<Props> = ({ data }) => {
  const { header, subtext, image, description } = data;

  return (
    <section
      className="relative pt-20 pb-20 bg-[#F9F9F9]"
      data-tina-field={tinaField(data)}
    >

      <div className="flex flex-col gap-6 mx-auto max-w-250 text-center items-center px-4">
        {header && (
          <SmartTitle
            as="h2"
            tinaField={tinaField(data, "header")}
            text={header}
            defaultColor="text-foreground"
            highlightColor="text-primary"
          />
        )}

        {subtext && (
          <SmartSubtext
            tinaField={tinaField(data, "subtext")}
            text={subtext}
            className="text-center mx-auto text-[22px] leading-7.5 font-medium"
          />
        )}

        {description && (
          <div
            className="prose markdown-content text-center text-[16px] leading-5.75"
            data-tina-field={tinaField(data, "description")}
          >
            <TinaMarkdown content={description} />
          </div>
        )}

        {image?.src && (
          <div
            className="relative mx-auto max-w-199"
            data-tina-field={tinaField(data, "image")}
          >
            <Image
              src={image.src}
              alt="Product screenshot"
              width={796}
              height={631}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};
