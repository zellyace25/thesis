import { useEffect, useState } from "react";
import LoadingPage from "./Pages/LoadingPage";
import LoginPage from "./Pages/LoginPage";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return loading ? <LoadingPage/>: <LoginPage/>
}
