import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(creds, req) {
        console.log(creds, req);
        const user = {
          name: "zwrotka",
          password: "zwortka1",
        };
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
