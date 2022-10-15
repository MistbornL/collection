import axios from "axios";
import i18n from "../i18n";

export const LanguageHandler = async (token, language, email) => {
  await axios
    .put(
      `https://collection-server-mistborn.herokuapp.com/users/language/${email}`,
      { language: language },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        i18n.changeLanguage(language);
        localStorage.setItem("language", language);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
