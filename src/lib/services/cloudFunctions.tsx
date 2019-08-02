import { functions } from './firebase';

type SignIn = (args: { 
  username: string,
  password?: string
}) => Promise<{
  data: {
    success: boolean,
    data?: any,
    errorType?: string,
  }
}>
export const signIn: SignIn = functions.httpsCallable('signIn');

type SetPassword = (args: {
  password: string
}) => Promise<{
  data: {
    success: boolean,
  }
}>;
export const setPassword: SetPassword = functions.httpsCallable('setPassword');