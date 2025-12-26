import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/Login", // Use your custom login page
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectDB();
        
        const user = await User.findOne({ email: credentials?.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValid = await bcrypt.compare(credentials?.password || "", user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, 
});

export { handler as GET, handler as POST };