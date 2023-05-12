/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-04 12:44:18
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-05 06:46:41
 * @FilePath: \workspace\news-system\src\pages\_app.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/store";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    localStorage.getItem("token") || router.push("/login");
  }, []);

  const isLoginPage = router.pathname === "/login";

  return isLoginPage ? (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) : (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
