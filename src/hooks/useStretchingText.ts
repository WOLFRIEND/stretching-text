import { useEffect } from "react";
import { throttle } from "lodash";

export const useStretchingText = (
  textClassName: string,
  initialMinFontSize = 3
): void => {
  const stretchingText = () => {
    let fontSize: number,
      maxHeight: number,
      maxWidth: number,
      parentElement: HTMLElement,
      maxCycles: number = 100;

    const textElements: NodeList = document.querySelectorAll(
      `.${textClassName}`
    );

    if (textElements.length) {
      textElements.forEach((element) => {
        parentElement = element.parentElement;
        maxWidth = parentElement.clientWidth;
        maxHeight = parentElement.clientHeight;
        fontSize = maxHeight;

        let minFontSize = initialMinFontSize;
        let maxFontSize = fontSize;

        element["style"].fontSize = `${fontSize}px`;

        while (fontSize !== minFontSize) {
          element["style"].fontSize = `${fontSize}px`;

          if (
            element["offsetHeight"] <= maxHeight &&
            element["offsetWidth"] <= maxWidth
          ) {
            minFontSize = fontSize;
          } else {
            maxFontSize = fontSize;
          }

          fontSize = Math.floor((minFontSize + maxFontSize) / 2);

          --maxCycles;
          if (maxCycles <= 0) {
            console.error("The maximum cycle exceeded");
            break;
          }
        }

        element["style"].fontSize = `${minFontSize}px`;
      });
    }
  };

  const debouncedFunction = throttle(stretchingText, 15);

  useEffect(() => {
    window.addEventListener("resize", debouncedFunction);
    debouncedFunction();

    return () => {
      window.removeEventListener("resize", debouncedFunction);
    };
  }, []);
};
