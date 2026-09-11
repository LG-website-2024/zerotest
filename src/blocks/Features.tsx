import { useState, type FC } from "react";
import type { PagesBlocksFeaturesTemplate } from "../../tina/__generated__/types";
import { SmartTitle } from "@/components/ui/SmartTitle";
import { SmartSubtext } from "@/components/ui/SmartSubtext";
import { tinaField } from "tinacms/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  data: PagesBlocksFeaturesTemplate;
};

export const FeaturesBlock: FC<Props> = ({ data }) => {
  const { header, subtext, tabs } = data;
  const [activeTab, setActiveTab] = useState("item-0");

  const activeIndex = parseInt(activeTab.split("-")[1]);

  return (
    <section
      className="relative pt-20 pb-20 px-6 flex flex-col gap-10 justify-center items-center"
      data-tina-field={tinaField(data)}
    >
      <div className="flex flex-col gap-6 mx-auto text-center items-center">
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
      </div>

      {tabs && (
        <div className="flex flex-col xl:flex-row w-full gap-10 max-w-388.75">
          {/* Left Sidebar: Scrollable List */}
          <div className="w-full xl:w-[38%] flex flex-col gap-4 xl:max-h-150 overflow-y-auto pr-3 custom-scrollbar pt-2 pb-6">
            <Accordion
              type="single"
              collapsible={false}
              value={activeTab}
              onValueChange={(val) => val && setActiveTab(val)}
              className="flex flex-col gap-6"
            >
              {tabs.map((tab, index) => {
                const value = `item-${index}`;
                const isActive = activeTab === value;

                return (
                  <AccordionItem
                    data-tina-field={tinaField(
                      data,
                      `tabs.${index}` as never
                    )}
                    key={index}
                    value={value}
                    className={`border border-[#CCDAF5] rounded-[30px] transition-all duration-500 px-6 py-4 cursor-pointer
                    ${
                      isActive
                        ? "bg-primary border-primary text-white shadow-2xl shadow-green-900/10"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    {/* AccordionTrigger handles the Heading */}
                    <AccordionTrigger
                      data-tina-field={tinaField(
                        data,
                        `tabs.${index}.title.heading` as never
                      )}
                      className="hover:no-underline py-5 [&>svg]:hidden text-left cursor-pointer"
                    >
                      <h3 className="text-[16px] md:text-2xl font-semibold md:leading-7.5 whitespace-pre-line">
                        {tab?.title?.heading}
                      </h3>
                    </AccordionTrigger>

                    {/* AccordionContent handles the Rich Text Description */}
                    <AccordionContent
                      data-tina-field={tinaField(
                        data,
                        `tabs.${index}.title.expanded` as never
                      )}
                    >
                      <div
                        className={`prose markdown-content max-w-none transition-colors duration-500
                                ${isActive ? "prose-invert" : "text-slate-600"}
                                prose-ul:list-disc prose-ul:pl-4 prose-li:my-1
                            `}
                      >
                        <TinaMarkdown content={tab?.title?.expanded} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Right Side */}
          <div className="flex-1 w-full sticky top-10">
            <div className="relative w-full aspect-16/10 rounded-[3rem] overflow-hidden bg-white">
              <div
                key={activeTab}
                className="h-full w-full animate-in fade-in zoom-in-95 duration-700 p-6 flex items-center justify-center"
              >
                <div className="prose prose-img:rounded-xl prose-img:shadow-sm max-w-none w-full">
                  <TinaMarkdown content={tabs[activeIndex]?.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
