import "../styles/globals.css";
import Layout from "@components/layout";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <div className="relative overflow-x-clip">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}

export default MyApp;
