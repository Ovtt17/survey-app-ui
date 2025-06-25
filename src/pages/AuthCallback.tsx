import { useEffect } from "react";

const AuthCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");

    if (token && user && window.opener) {
      window.opener.postMessage({
        type: "oauth-success",
        token: decodeURIComponent(token),
        user: JSON.parse(decodeURIComponent(user)),
      }, window.opener.origin);

      window.close();
    }
  }, []);

  return <p className="text-center p-4">Procesando autenticación...</p>;
};

export default AuthCallback;