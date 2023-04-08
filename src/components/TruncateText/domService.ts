export const domService = {
  cloneElement: function (element: HTMLElement): HTMLElement {
    const cloneContent = element.cloneNode(true);
    const wrapperCloneElement = document.createElement("span");
    wrapperCloneElement.style.cssText = "display:inline-block";
    wrapperCloneElement.appendChild(cloneContent);

    const cloneElement =
      (wrapperCloneElement.firstElementChild as HTMLElement) ||
      wrapperCloneElement;

    return cloneElement;
  },
  cloneElements: function (elements: HTMLElement[]): HTMLElement[] {
    const cloneElements = elements.map((element: HTMLElement) =>
      this.cloneElement(element)
    );
    return cloneElements;
  },
  getDimension: function (element: HTMLElement): CSSStyleDeclaration {
    return window.getComputedStyle(element);
  },
};
