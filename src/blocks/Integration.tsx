import type { FC } from "react";
import type { PagesBlocksIntegrationsTemplate } from "../../tina/__generated__/types";
import { SmartTitle } from "@/components/ui/SmartTitle";
import { SmartSubtext } from "@/components/ui/SmartSubtext";
import { tinaField } from "tinacms/react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = {
  data: PagesBlocksIntegrationsTemplate;
};

export const IntegrationBlock: FC<Props> = ({ data }) => {
  const { header, subtext, background, contents } = data;

  return (
    <section
      className="relative overflow-hidden py-20 pb-10 bg-transparent mx-6 rounded-[40px] px-6"
      data-tina-field={tinaField(data)}
    >
      {/* Background image */}
      {background && (
        <Image
          src={background}
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />
      )}
      <div className="flex flex-col gap-6 mx-auto items-center">
        <div className="flex flex-col gap-3">
          {header && (
            <SmartTitle
              as="h2"
              tinaField={tinaField(data, "header")}
              text={header}
              defaultColor="text-foreground"
              highlightColor="text-primary"
              className="md:text-[60px] md:leading-14.5 font-semibold text-center"
            />
          )}

          {subtext && (
            <SmartSubtext
              tinaField={tinaField(data, "subtext")}
              text={subtext}
              className="mx-auto text-[22px] leading-7.5 font-medium text-center"
            />
          )}
        </div>

        {contents && (
          <div
            className="flex flex-col xl:flex-row w-full gap-7.5 mx-auto max-w-327.5"
            tina-data-field={tinaField(data, "contents")}
          >
            {contents.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row w-full gap-3 py-10 px-4 bg-transparent items-center sm:items-start"
                data-tina-field={tinaField(
                  data,
                  `contents.${index}` as never
                )}
              >
                {item?.icon && (
                  <div
                    data-tina-field={tinaField(
                      data,
                      `contents.${index}.icon` as never
                    )}
                    className="relative flex w-33 h-43.5 items-center justify-center"
                  >
                    <Image
                      src={item.icon}
                      alt="icon"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                )}
                <div
                  className="flex-1 flex-col gap-3 text-left"
                  data-tina-field={tinaField(
                    data,
                    `contents.${index}.name` as never
                  )}
                >
                  {item?.name && (
                    <SmartSubtext
                      text={item.name}
                      className="text-[22px] leading-7 font-medium"
                    />
                  )}

                  {item?.description && (
                    <div
                      className="prose markdown-content text-[16px] leading-6.5"
                      data-tina-field={tinaField(
                        data,
                        `contents.${index}.description` as never
                      )}
                    >
                      <TinaMarkdown content={item?.description} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
