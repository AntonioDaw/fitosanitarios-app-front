/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import z from "zod";

export const userCredentials = z.object({
  email: z.string().email({ message: 'Email no válido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});
export const authOptions = ({
  providers: [
    CredentialsProvider({
      authorize: async credentials => {

        const parseCredentials = userCredentials.safeParse(credentials);

        if (!parseCredentials.success) {

          return null;
        }

        const { email, password } = parseCredentials.data;

        try {
          const login = await fetch(`https://merry-art-production.up.railway.app/api/login`, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, password })
          });

          if (login.status !== 200) {

            return null;
          }
          const user = await login.json();

          

          return user
          ;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt(params: any) {
      const { token, user, trigger } = params;
      if (trigger === "signIn" && user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.token = user.token;
      }
      console.log('hola', token);
      return token;
    },
    async session(params: any) {
      const { session, token } = params;
      session.user.id = token.id as string;
      session.user.token = token.token as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;
      console.log('aqui esta', session);
      return session;
    }
  }
})

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);