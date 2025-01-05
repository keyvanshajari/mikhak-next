import NextAuth from "next-auth/next";
import ErrorMessages from "@/common/constants/error-messages";
import api from "@/common/network/api";
import { UserModel } from "@/types/auth";
import { ObjectStringAny } from "@/types/types";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobile: { label: "mobile", type: "text" },
        nationalCode: { label: "nationalCode", type: "text" },
        type: { label: "type", type: "text" },
        otpCode: { label: "otpCode", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) throw Error(ErrorMessages[400]);

          const res = await api.post("/userotp", {
            mobile: credentials.mobile,
            nationalCode: credentials.nationalCode,
            type: credentials.type,
            otpCode: credentials.otpCode,
          });

          if (!(res.data as ObjectStringAny)["isSuccess"]) {
            Error(ErrorMessages[400]);
          }

          return {
            id: (res.data as ObjectStringAny)["userId"],
            phoneNumber: (res.data as ObjectStringAny)["phoneNumber"],
            fullname: (res.data as ObjectStringAny)["fullname"],
            patientCode: (res.data as ObjectStringAny)["patientCode"],
            clinicId: (res.data as ObjectStringAny)["clinicId"],
            clinicName: (res.data as ObjectStringAny)["clinicName"],
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }: { session: any; token: any }) => {
      const _user: UserModel = token as UserModel;
      return {
        ...session,
        user: _user,
      };
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const _user: UserModel = user as UserModel;
        token = {
          ...token,
          ..._user,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
