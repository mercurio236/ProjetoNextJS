import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import firebase from '../../services/firebaseConnection';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),


  ],
  callbacks: {
    async session(session, profile) {
      try {
        const lastDonate = await firebase.firestore().collection('users')
        .doc(String(profile.sub))
        .get()
        .then((snapshot) =>{
          if(snapshot.exists){
            return snapshot.data().lastDonate.toDate();
          }else{
            return null // que esse user não é apoiador
          }
        })

        return {
          ...session,
          id: profile.sub,
          vip: lastDonate ? true : false,
          lastDonate: lastDonate
        }
      } catch (err) {
        return {
          ...session,
          id: null,
          vip: false,
          lastDonate: null
        }
      }
    },
    async signIn(user, account, profile) {
      const { email } = user;
      try {
        return true;

      } catch (err) {
        console.log('Deu Erro', err);
        return false
      }

    }
  },

  database: process.env.DATABASE_URL,
})