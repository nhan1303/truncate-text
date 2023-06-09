import { isEmpty } from "lodash";
import React from "react";
import { domService } from "../domService";
import { truncateService } from "../truncateService";

export interface IuseTruncateProps {
  truncateElement: HTMLElement | null;
  textElement: HTMLElement | null;
  suffixElement: HTMLElement | null;
  delimiter?: string;
  onComplete?: (value: string, htmlContent?: string) => void;
}

export interface IStartTruncationProps {
  elements: HTMLElement[];
  maxHeight: number;
  signal?: AbortSignal;
  onComplete?: (value: string, htmlContent?: string) => void;
}

export const useTruncate = ({
  truncateElement,
  textElement,
  suffixElement,
  delimiter = " ",
  onComplete,
}: IuseTruncateProps) => {
  const startTruncation = ({
    elements,
    maxHeight,
    onComplete,
    signal,
  }: IStartTruncationProps): Promise<string> => {
    if (signal?.aborted) {
      return Promise.reject(new DOMException(`Aborted`, `AbortError`));
    }

    return new Promise((resolve, reject) => {
      console.log("Promise startTruncation Started");
      let timeout: NodeJS.Timeout | undefined;

      const abortHandler = () => {
        clearTimeout(timeout);
        reject(new DOMException(`Aborted`, `AbortError`));
      };

      timeout = setTimeout(() => {
        // setup truncation
        const cloneElements = domService.cloneElements(elements);

        // performs truncation
        const truncatedText = truncateService.truncate(
          cloneElements,
          maxHeight,
          delimiter
        );

        cloneElements[0].removeAttribute('style')
        console.log("cloneElements", cloneElements[0].outerHTML);

        onComplete?.(truncatedText, cloneElements[0].outerHTML);
        console.log("Promise startTruncation Resolved");

        resolve("Promise startTruncation Resolved");
        signal?.removeEventListener("abort", abortHandler);
      }, 0);

      signal?.addEventListener("abort", abortHandler);
    });
  };

  React.useEffect(() => {
    if (
      isEmpty(truncateElement) ||
      isEmpty(textElement) ||
      isEmpty(suffixElement)
    ) {
      return;
    }

    console.count("useEffect startTruncation");

    const abortController = new AbortController();
    const maxHeight = truncateElement.offsetHeight;

    startTruncation({
      elements: [truncateElement, textElement, suffixElement],
      maxHeight,
      onComplete,
      signal: abortController.signal,
    }).catch((e: DOMException) => console.log(e.name));

    return () => {
      console.count("Cleanup useEffect: cancel previous truncation");
      abortController.abort();
    };
  }, [
    truncateElement,
    textElement,
    suffixElement,
    onComplete,
    // mainDimension,
    // suffixDimension,
    // handleTruncateComplete,
  ]);
};
