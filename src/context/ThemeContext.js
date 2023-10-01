import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

function ThemeContext({ children }) {
  const theme = extendTheme({ config });
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

export default ThemeContext;
