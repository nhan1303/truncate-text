import { isEqual } from "lodash";
import React from "react";

export interface IDomDimension {
  width: string;
  height: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

export const useDomNode = <T extends Element = HTMLElement>(): [
  T | null,
  React.Ref<T>,
  IDomDimension | null
] => {
  const [domNode, setDomNode] = React.useState<T | null>(null);
  const [domDimension, setDomDimension] = React.useState<IDomDimension | null>(
    null
  );

  const refCallback = React.useCallback((node: T | null) => {
    if (node !== null) {
      setDomNode(node);
    }
  }, []);

  React.useEffect(() => {
    if (!domNode) return; // wait for the elementRef to be available
    const resizeObserver = new ResizeObserver(
      (element: ResizeObserverEntry[]) => {
        // listen the size of the element changes
        // const node = element[0].target;
        // console.log("ResizeObserver node", node);
        // const computedStyle = getComputedStyle(node);
        // const { width, height, lineHeight, fontFamily, fontSize, fontWeight } =
        //   computedStyle;
        // const newDimension = {
        //   width,
        //   height,
        //   lineHeight,
        //   fontFamily,
        //   fontSize,
        //   fontWeight,
        // };
        // if (!isEqual(newDimension, domDimension)) {
        //   setDomDimension(newDimension);
        // }
      }
    );
    resizeObserver.observe(domNode);
    return () => resizeObserver.disconnect(); // clean up
  }, []);
  return [domNode, refCallback, domDimension];
};
