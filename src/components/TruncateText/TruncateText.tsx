import React from "react";

import { Theme } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { useTruncate } from "./hooks/useTruncate";
import { useDomNode } from "./hooks/useDomNode";
import { isEmpty } from "lodash";

export interface ITruncateTextProps {
  text: string;
  delimiter?: string;
  suffix?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export interface IStartTruncationProps {
  signal?: AbortSignal;
  onComplete?: (value: string) => void;
}

export const TruncateText: React.FC<ITruncateTextProps> = React.memo(
  ({ text, delimiter, suffix = "...", sx }) => {
    const [isTruncating, setIsTruncating] = React.useState(true);
    const [truncateElement, setTruncateElement] =
      React.useState<HTMLElement | null>(null);
    const [textElement, setTextElement] = React.useState<HTMLElement | null>(
      null
    );
    const [suffixElement, setSuffixElement] =
      React.useState<HTMLElement | null>(null);
    const [htmlContent, setHtmlContent] = React.useState<string>("");

    React.useEffect(() => {
      console.log("render TruncateText:", htmlContent);
    });

    const handleTruncateComplete = React.useCallback(
      (value: string, htmlContent?: string) => {
        console.count("handleTruncateComplete");
        setHtmlContent(htmlContent ? htmlContent : value);
        setIsTruncating(false);
      },
      []
    );

    useTruncate({
      truncateElement,
      textElement,
      suffixElement,
      delimiter,
      onComplete: handleTruncateComplete,
    });

    const ContainerSx = {
      width: "100px",
      height: "100px",
      backgroundColor: "green",
    };

    const NoClickSx = {
      // should hidden and none-click
      pointerEvents: "none",
    };

    return (
      <>
        {isTruncating && (
          <Box
            ref={setTruncateElement}
            sx={[
              ContainerSx,
              ...(Array.isArray(sx) ? (sx as any) : [sx]),
              NoClickSx,
            ]}
          >
            <Box component="span" ref={setTextElement}>
              {text}
            </Box>
            <Box component="span" ref={setSuffixElement}>
              {suffix}
            </Box>
          </Box>
        )}

        {!isTruncating && (
          <Box
            ref={setTruncateElement}
            sx={[ContainerSx, ...(Array.isArray(sx) ? (sx as any) : [sx])]}
            dangerouslySetInnerHTML={{
              __html: htmlContent,
            }}
          />
        )}
      </>
    );
  }
);
