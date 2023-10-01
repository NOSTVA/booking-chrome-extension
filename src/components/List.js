import React from "react";
import { Stack } from "@chakra-ui/react";
import Appointment from "./Appointment";

export default function List({ items }) {
  return (
    <Stack spacing={5}>
      {items?.map((appointment) => {
        return <Appointment key={appointment._id} appointment={appointment} />;
      })}
    </Stack>
  );
}
