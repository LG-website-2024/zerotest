import Image from "next/image";
import { useState, type FC } from "react";
import type { PagesBlocksFaq } from "../../tina/__generated__/types";
import { SmartTitle } from "@/components/ui/SmartTitle";
import { tinaField } from "tinacms/react";
import ArrowRightIcon from "@/components/icon/ArrowRightIcon";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = {
  data: PagesBlocksFaq;
};

export const FaqBlock: FC<Props> = ({ data }) => {
  const [open, setOpen] = useState<number | null>(null);
  const { header, questions, image } = data;

  return (
    <section
      className="relative overflow-hidden pt-20 pb-15 bg-transparent"
      data-tina-field={tinaField(data)}
    >
      <div className="flex flex-col md:flex-row w-full gap-7.5 justify-center items-start px-6 md:px-30">
        <div className="flex flex-col gap-10 max-w-104.5">
          {header && (
            <SmartTitle
              as="h2"
              tinaField={tinaField(data, "header")}
              text={header}
              defaultColor="text-foreground"
              highlightColor="text-primary"
            />
          )}
          {image?.src && (
            <div
              data-tina-field={tinaField(data, "image")}
              className="relative h-20 w-20 md:h-37.5 md:w-37.5"
            >
              <Image
                src={image.src}
                alt={image?.alt || "alt image"}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col max-w-169.5! gap-4">
          {questions?.map((item, i) => (
            <div
              data-tina-field={tinaField(data, `questions.${i}` as never)}
              key={i}
              className="flex flex-col gap-0 shadow-[0_5px_15px_rgba(25,33,61,0.06)] bg-white"
              style={{
                cursor: "pointer",
                padding: "26px 32px",
                borderRadius: "16px",
                border: "1px solid #D9DBE9",
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex flex-row justify-between items-start font-medium text-[18px] leading-6">
                <span className="m-0!">{item?.question}</span>
                <div
                  className="flex items-center justify-center min-w-8.5 h-8.5 
                    shadow-[0_0.5px_1px_0_rgba(25,33,61,0.07)] rounded-full"
                  style={{
                    transform: open === i ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "all 0.5s ease",
                    background: open === i ? "#172E58" : "#F1F2F9",
                  }}
                >
                  <ArrowRightIcon color={open === i ? "#fff" : "#6F6C8F"} />
                </div>
              </div>

              <div
                style={{
                  maxHeight: open === i ? undefined : "0px",
                  opacity: open === i ? 1 : 0,
                  marginTop: open === i ? "8px" : "0px",
                  overflow: "hidden",
                  transition: "all 0.5s ease",
                  paddingBottom: open === i ? "14px" : "0px",
                  paddingTop: open === i ? "16px" : "0px",
                }}
                className="prose markdown-content text-[16px] leading-6.75 text-[#363145] m-0!"
              >
                <TinaMarkdown content={item?.answer} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
