import { useEffect } from "react";
import { throttle } from "lodash";

export const useStretchingTextWithCache = (
  textClassName: string,
  initialMinFontSize = 3
): void => {
  const stretchingText = () => {
    let fontSize: number, maxHeight: number, maxWidth: number, parentElement;

    let cachedMaxHeight: number, cachedMaxWidth: number, cachedFontSize: number;

    const textElements: NodeList = document.querySelectorAll(
      `.${textClassName}`
    );

    if (textElements) {
      textElements.forEach((element) => {
        parentElement = element.parentElement;
        maxHeight = parentElement.clientHeight;
        maxWidth = parentElement.clientWidth;
        let minFontSize = initialMinFontSize;
        fontSize = maxHeight;

        let maxFontSize = fontSize;

        if (cachedMaxHeight && cachedMaxWidth && cachedFontSize) {
          element["style"].fontSize = `${cachedFontSize}px`;
          return;
        }

        element["style"].fontSize = `${fontSize}px`;

        let maxCycles = 50;

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
        cachedFontSize = minFontSize;
        cachedMaxHeight = maxHeight;
        cachedMaxWidth = maxWidth;
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
