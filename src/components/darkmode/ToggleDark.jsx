import React from "react";
import { ChangeTheme } from "../../helper/ChangeTheme";
import "./DarkMode.css";

export const DarkMode = () => {
  const token = localStorage.getItem("token");
  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
      if (token) {
        ChangeTheme(
          localStorage.getItem("email"),
          "light",
          localStorage.getItem("token")
        );
      }
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      if (token) {
        ChangeTheme(
          localStorage.getItem("email"),
          "dark",
          localStorage.getItem("token")
        );
      }
      theme = darkTheme;
    }
  };

  return (
    <button
      className={theme === "dark" ? clickedClass : ""}
      id="darkMode"
      onClick={(e) => switchTheme(e)}
    ></button>
  );
};

export default DarkMode;
