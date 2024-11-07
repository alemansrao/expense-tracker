import { callback } from "chart.js/helpers";
import NextAuth from "next-auth";
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
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Call your custom function here
      insertUserData(user);

      // Return true to allow sign-in
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
