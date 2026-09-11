import type { FC } from "react";
import type { PagesBlocksCapabilitiesTemplate } from "../../tina/__generated__/types";
import { SmartTitle } from "@/components/ui/SmartTitle";
import { SmartSubtext } from "@/components/ui/SmartSubtext";
import { tinaField } from "tinacms/react";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = {
  data: PagesBlocksCapabilitiesTemplate;
};

export const CapabilitesBlock: FC<Props> = ({ data }) => {
  const { header, subtext, capabilities, background } = data;

  return (
    <section
      className="relative overflow-hidden py-10 md:py-20 pb-10 bg-transparent mx-6 rounded-[40px] px-6"
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
      <div className="flex flex-col gap-10 mx-auto text-center items-center">
        <div className="flex flex-col gap-3">
          {header && (
            <SmartTitle
              as="h2"
              tinaField={tinaField(data, "header")}
              text={header}
              defaultColor="text-background"
              highlightColor="text-primary"
            />
          )}

          {subtext && (
            <SmartSubtext
              tinaField={tinaField(data, "subtext")}
              text={subtext}
              className="text-center mx-auto text-[22px] leading-7.5 font-medium text-background"
            />
          )}
        </div>

        {capabilities && (
          <div
            className="flex flex-col xl:flex-row w-full gap-6 mx-auto max-w-388"
            tina-data-field={tinaField(data, "capabilities")}
          >
            {capabilities.map((item, index) => (
              <div
                key={index}
                className="flex flex-col w-full gap-10 p-6 rounded-[40px] border border-primary items-center bg-[#243135]"
                data-tina-field={tinaField(
                  data,
                  `capabilities.${index}` as never
                )}
              >
                {item?.icon && (
                  <div
                    data-tina-field={tinaField(
                      data,
                      `capabilities.${index}.icon` as never
                    )}
                    className="relative flex rounded-full w-57.25 h-57.25 items-center justify-center"
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
                  className="flex flex-col gap-10 text-left text-background"
                  data-tina-field={tinaField(
                    data,
                    `capabilities.${index}.name` as never
                  )}
                >
                  {item?.name && (
                    <SmartSubtext
                      text={item.name}
                      className="text-[20px] md:text-[24px] leading-7.5 font-bold md:min-h-20"
                    />
                  )}

                  {item?.description && (
                    <div
                      className="prose markdown-content text-[16px] leading-5.75"
                      data-tina-field={tinaField(
                        data,
                        `capabilities.${index}.description` as never
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
