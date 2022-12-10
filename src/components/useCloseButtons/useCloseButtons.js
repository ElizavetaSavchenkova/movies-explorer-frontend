//import React from "react";
import { useEffect } from "react";

export default function useCloseButtons(closeAllPopups, isInfoTooltipOpen) {

  useEffect(() => {
    function handleClickOverlay(event) {
      if (event.target.classList.contains("popup")) {
        if (isInfoTooltipOpen) {
          closeAllPopups();
        }
      }
    }

    function handleClickButton() {
      if (isInfoTooltipOpen) {
        closeAllPopups();
      }
    }

    document.addEventListener("mousedown", handleClickOverlay);
    document.addEventListener("keyup", handleClickButton);

    return () => {
      document.removeEventListener("mousedown", handleClickOverlay);
      document.removeEventListener("keyup", handleClickButton);
    };
  }, [closeAllPopups, isInfoTooltipOpen]);
}
