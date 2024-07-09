import { AuthProvider } from "@/context/auth_context";
import { PostProvider } from "@/context/post_context";
import ReplyProvider from "@/context/reply_context";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <PostProvider>
          <ReplyProvider>
            <Component {...pageProps} />
          </ReplyProvider>
        </PostProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
