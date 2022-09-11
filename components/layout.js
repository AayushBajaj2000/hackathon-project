import React from "react";
import Head from "next/head";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>{children}</main>

      <footer></footer>
    </>
  );
};

export default Layout;