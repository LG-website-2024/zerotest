import type { FC } from "react";
import type { PagesBlocksTargetAudienceTemplate } from "../../tina/__generated__/types";
import { SmartTitle } from "@/components/ui/SmartTitle";
import { SmartSubtext } from "@/components/ui/SmartSubtext";
import { tinaField } from "tinacms/react";
import Image from "next/image";

type Props = {
  data: PagesBlocksTargetAudienceTemplate;
};

export const TargetAudienceBlock: FC<Props> = ({ data }) => {
  const { header, subtext, targets1, targets2, background } = data;

  return (
    <section
      className="relative overflow-hidden py-10 sm:py-20 pb-10 bg-transparent mx-6 rounded-[40px] px-6"
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

        {targets1 && (
          <div
            className="flex flex-col lg:flex-row w-full gap-6 mx-auto max-w-332 text-center items-stretch"
            tina-data-field={tinaField(data, "targets1")}
          >
            {targets1.map((target, index) => (
              <div
                key={index}
                className="flex flex-col w-full gap-10 py-10 px-6 card-sbom items-center"
                data-tina-field={tinaField(data, `targets1.${index}` as never)}
              >
                {target?.icon && (
                  <div
                    data-tina-field={tinaField(
                      data,
                      `targets1.${index}.icon` as never
                    )}
                    className="relative flex rounded-full bg-white w-18 h-18 items-center justify-center"
                  >
                    <Image
                      src={target.icon}
                      alt="icon"
                      width={32}
                      height={32}
                      priority
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-6 text-background">
                  {target?.name && (
                    <SmartSubtext
                      tinaField={tinaField(
                        data,
                        `targets1.${index}.name` as never
                      )}
                      text={target.name}
                      className="text-center mx-auto text-[22px] leading-7.5 font-medium"
                    />
                  )}

                  {target?.description && (
                    <SmartSubtext
                      tinaField={tinaField(
                        data,
                        `targets1.${index}.description` as never
                      )}
                      text={target.description}
                      className="text-center mx-auto text-[16px]"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {targets2 && (
          <div
            className="flex flex-col lg:flex-row w-full gap-6 mx-auto max-w-332 text-center items-stretch"
            tina-data-field={tinaField(data, "targets2")}
          >
            {targets2.map((target, index) => (
              <div
                key={index}
                className="flex flex-col w-full gap-10 py-10 px-6 card-sbom items-center"
                data-tina-field={tinaField(data, `targets2.${index}` as never)}
              >
                {target?.icon && (
                  <div
                    data-tina-field={tinaField(
                      data,
                      `targets2.${index}.icon` as never
                    )}
                    className="relative flex rounded-full bg-white w-18 h-18 items-center justify-center"
                  >
                    <Image
                      src={target.icon}
                      alt="icon"
                      width={32}
                      height={32}
                      priority
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-6 text-background">
                  {target?.name && (
                    <SmartSubtext
                      tinaField={tinaField(
                        data,
                        `targets2.${index}.name` as never
                      )}
                      text={target.name}
                      className="text-center mx-auto text-[22px] leading-7.5 font-medium"
                    />
                  )}

                  {target?.description && (
                    <SmartSubtext
                      tinaField={tinaField(
                        data,
                        `targets2.${index}.description` as never
                      )}
                      text={target.description}
                      className="text-center mx-auto text-[16px]"
                    />
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
