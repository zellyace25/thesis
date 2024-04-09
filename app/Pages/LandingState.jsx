import React, { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import LoginPage from "./LoginPage";

export default function LandingState() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return loading ? <LoadingPage /> : <LoginPage />;
}
