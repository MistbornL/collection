import axios from "axios";

export const ChangeTheme = async (email, theme, token) => {
  await axios.put(
    `https://collection-server.vercel.app/users/profile/theme`,
    { email: email, theme: theme }, // This is the body
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
