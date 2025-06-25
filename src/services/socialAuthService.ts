const OAUTH_WINDOW_FEATURES =
  "width=500,height=600,top=100,left=100,resizable=yes,scrollbars=yes,status=yes";

const googleProvider = import.meta.env.VITE_GOOGLE_OAUTH_URL;
const facebookProvider = import.meta.env.VITE_FACEBOOK_OAUTH_URL;

const signInWithProvider = (url: string) => {
  const popup = window.open(url, "_blank", OAUTH_WINDOW_FEATURES);
  if (!popup) return;

  const listener = (event: MessageEvent) => {
    if (event.origin !== window.location.origin) return;

    const { type, token, user } = event.data;
    if (type === "oauth-success" && token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.removeEventListener("message", listener);
      window.location.href = "/"; // Redirect to home page after successful login
    }
  };

  window.addEventListener("message", listener);
};

export const signInWithGoogle = () => {
  signInWithProvider(googleProvider);
};

export const signInWithFacebook = () => {
  signInWithProvider(facebookProvider);
};