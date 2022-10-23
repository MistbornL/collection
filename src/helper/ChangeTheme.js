import axios from "axios";

export const ChangeTheme = async (email, theme, token) => {
  await axios.put(
    `http://localhost:5000/users/profile/theme`,
    { email: email, theme: theme }, // This is the body
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
