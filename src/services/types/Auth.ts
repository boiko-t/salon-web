export default interface AuthService<T> {
  signIn(login: string, password: string): Promise<T>;
  signUpPassword(login: string, password: string): Promise<T>;
  signInGoogle(): Promise<T>;
  signOut();
}
