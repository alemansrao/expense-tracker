// libs/authOptions.js

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { insertUserData } from "@/utils/api";

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENTID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user)
      console.log(account)
      console.log(profile)
      // await insertUserData(user);
      return true;
    },
  },
};

export default authOptions;
