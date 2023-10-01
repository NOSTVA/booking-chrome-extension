import { Container } from "@chakra-ui/react";
import React from "react";

export default function Layout({ children }) {
  return (
    <Container width="md" maxW="md" py="2">
      {children}
    </Container>
  );
}
