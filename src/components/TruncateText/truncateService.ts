export const truncateService = {
  truncate: function (
    elements: HTMLElement[],
    maxHeight: number,
    delimiter: string
  ): string {
    const [truncateElement, textElement, suffixElement] = elements;
    const originalText = textElement.textContent || "";

    // render mimic TruncateText element
    document.body.appendChild(truncateElement);

    // prepares necessary styles to truncation
    const styles = [
      "height:auto",
      "maxHeight:none",

      // reduces trigger reflow, repaint
      "position:absolute",
      "top:0;left:0",
      "opacity:0",
    ];

    truncateElement.style.cssText = styles.join(";");

    if (truncateElement.offsetHeight <= maxHeight) {
      return originalText;
    }

    const words = originalText.split(delimiter);

    let max = words.length - 1;
    let min = 0;
    let midpoint;

    while (min < max) {
      midpoint = (min + max + 1) >> 1;
      const testFitContent = words.slice(0, midpoint).join(delimiter);

      textElement.innerText = testFitContent;
      truncateElement.innerHTML =
        textElement.innerHTML + suffixElement.innerHTML;

      // re-check truncateElement's dimension after update new test words
      if (truncateElement.offsetHeight > maxHeight) {
        max = midpoint - 1;
      } else {
        min = midpoint;
      }
    }

    document.body.removeChild(truncateElement);
    return words.slice(0, max).join(delimiter);
  },
};
