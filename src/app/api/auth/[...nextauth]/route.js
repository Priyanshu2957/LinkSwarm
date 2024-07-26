import clientPromise from "@/libs/mongoClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export const authOptions={
    adapter: MongoDBAdapter(clientPromise),
    secret : process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackUrl: 'http://localhost:3000/api/auth/callback/google',
        })
],
callbacks: {
    async redirect({ url, baseUrl }) {
      // If url contains `authenticated`, redirect to baseUrl which is '/'
      if (url === '/') {
        return `${baseUrl}/account`;
      }
      // If url contains `login`, redirect to `/login`
      if (url === '/login') {
        return `${baseUrl}/login`;
      }
      return baseUrl;
    }
  },
};
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }