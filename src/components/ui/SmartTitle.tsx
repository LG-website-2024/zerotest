"use client";
import React from "react";

interface SmartTitleProps {
  text: string;
  defaultColor?: string;
  highlightColor?: string;
  className?: string;
  tinaField?: string;
  as?: "h1" | "h2" | "h3";
}

export const SmartTitle = ({
  text,
  defaultColor = "text-foreground",
  highlightColor = "text-primary",
  className = "",
  tinaField = "",
  as: Tag = "h1",
}: SmartTitleProps) => {
  if (!text) return null;

  const parts = text.split(/(\{.*?\})/g);
  let wordCount = 0;

  const renderWords = (content: string, isHighlighted: boolean) => {
    const subParts = content.split(/(\s+)/);

    return subParts.map((part, i) => {
      if (part.match(/\s/)) {
        return <React.Fragment key={i}>{part}</React.Fragment>;
      }

      const currentDelay = wordCount * 0.1;
      wordCount++;

      return (
        <span
          key={i}
          className={`animate-reveal opacity-0 inline-block ${
            isHighlighted ? highlightColor : ""
          }`}
          style={{ animationDelay: `${currentDelay}s` }}
        >
          {part}
        </span>
      );
    });
  };

  const tagStyles = {
    h1: "text-[48px] md:text-[60px]",
    h2: "text-[28px] sm:text-[48px]",
    h3: "text-[40px] sm:text-[40px]",
  };

  return (
    <Tag
      data-tina-field={tinaField}
      className={`${tagStyles[Tag]} whitespace-pre-line ${defaultColor} ${className}`}
    >
      {parts.map((part, index) => {
        if (part.startsWith("{") && part.endsWith("}")) {
          const cleanText = part.slice(1, -1);
          return (
            <React.Fragment key={index}>
              {renderWords(cleanText, true)}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            {renderWords(part, false)}
          </React.Fragment>
        );
      })}
    </Tag>
  );
};
