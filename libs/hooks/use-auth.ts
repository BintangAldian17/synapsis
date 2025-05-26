type UserLogin = {
  email: string;
  access_token: string;
  rememberMe?: boolean;
};

export const useAuth = () => {
  const isBrowser = typeof window !== "undefined";

  const signIn = (accessToken: string, user: UserLogin) => {
    if (!isBrowser) return;
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const getToken = () => {
    if (!isBrowser) return null;
    return localStorage.getItem("access_token");
  };

  const getCurrentUser = (): UserLogin | undefined => {
    if (!isBrowser) return;
    const user = localStorage.getItem("user");
    if (!user) return;
    return JSON.parse(user);
  };

  const saveRememberedCredentials = (email: string, accessToken: string) => {
    if (!isBrowser) return;
    localStorage.setItem("rememberedEmail", email);
    localStorage.setItem("rememberedAccessToken", accessToken);
  };

  const getRememberedCredentials = () => {
    if (!isBrowser) return { email: null, accessToken: null };
    const email = localStorage.getItem("rememberedEmail");
    const accessToken = localStorage.getItem("rememberedAccessToken");
    return { email, accessToken };
  };

  const clearRememberedCredentials = () => {
    if (!isBrowser) return;
    localStorage.removeItem("rememberedEmail");
    localStorage.removeItem("rememberedAccessToken");
  };

  return {
    signIn,
    getToken,
    getCurrentUser,
    saveRememberedCredentials,
    getRememberedCredentials,
    clearRememberedCredentials,
  };
};
