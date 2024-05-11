import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import UserDetailContext from "../../Context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";

const Layout = () => {
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetail } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      // console.log("Before getting access token");

      try {
        const res = await getAccessTokenWithPopup({
          authorizationParams: {
            audience: "http://localhost:8000",
            scope: "openid profile email",
          },
        });

        // console.log(res);
        // console.log("After getting access token");
        localStorage.setItem("access_token", res);
        setUserDetail((prev) => ({ ...prev, token: res }));
        mutate(res);
      } catch (error) {
        console.error("Error getting access token -> ", error);
      }
    };

    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
