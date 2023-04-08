export const truncateService = {
  truncate: function (
    elements: HTMLElement[],
    maxHeight: number,
    delimiter: string
  ): string {
    const [containerElement, mainElement, suffixElement] = elements;
    const originalText = mainElement.textContent || "";

    // render mimic TruncateText element
    document.body.appendChild(containerElement);

    // prepares necessary styles to truncation
    const styles = [
      "height:auto",
      "maxHeight:none",

      // reduces trigger reflow, repaint
      "position:absolute",
      "top:0;left:0",
      "opacity:0",
    ];

    containerElement.style.cssText = styles.join(";");

    if (containerElement.offsetHeight <= maxHeight) {
      return originalText;
    }

    const words = originalText.split(delimiter);

    let max = words.length - 1;
    let min = 0;
    let midpoint;

    while (min < max) {
      midpoint = (min + max + 1) >> 1;
      const testFitContent = words.slice(0, midpoint).join(delimiter);

      mainElement.innerText = testFitContent;
      containerElement.innerHTML =
        mainElement.innerHTML + suffixElement.innerHTML;

      // re-check containerElement's dimension after update new test words
      if (containerElement.offsetHeight > maxHeight) {
        max = midpoint - 1;
      } else {
        min = midpoint;
      }
    }

    document.body.removeChild(containerElement);
    return words.slice(0, max).join(delimiter);
  },
};
