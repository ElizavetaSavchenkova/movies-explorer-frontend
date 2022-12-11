//import React from "react";
import { useEffect } from "react";

export default function useCloseButtons(closeAllPopups, isInfoTooltipOpen, isPopupMenuOpen, setIsPopupMenuOpen) {

  useEffect(() => {
    function handleClickOverlay(event) {
      if (event.target.classList.contains("popup")) {
        if (isInfoTooltipOpen) {
          closeAllPopups();
        } else if (event.target.classList.contains("popup-menu")) {
          if (isPopupMenuOpen) {
            setIsPopupMenuOpen(false);
          }
        }
      }
    }

    function handleClickButton() {
      if (isInfoTooltipOpen) {
        closeAllPopups();
      } else if (isPopupMenuOpen) {
        setIsPopupMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOverlay);
    document.addEventListener("keyup", handleClickButton);

    return () => {
      document.removeEventListener("mousedown", handleClickOverlay);
      document.removeEventListener("keyup", handleClickButton);
    };
  }, [closeAllPopups, isInfoTooltipOpen, isPopupMenuOpen, setIsPopupMenuOpen]);
}
