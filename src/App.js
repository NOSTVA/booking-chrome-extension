import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Search from "./components/Search";
import List from "./components/List";
import { filterAppointments, getAppointments } from "./functions";
import { Box, Spinner, Stack, useColorModeValue } from "@chakra-ui/react";

export default function App() {
  const [term, setTerm] = useState("");
  const [field, setField] = useState("passportNumber");
  const [appointments, setAppointments] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAppointments();
      setAppointments(data);
      setIsFetching(false);
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <Box
        position="fixed"
        top={0}
        right={0}
        left={0}
        zIndex={2}
        py={2}
        bg={useColorModeValue("white", "gray.800")}>
        <Search
          value={term}
          onChange={setTerm}
          field={field}
          setField={setField}
        />
      </Box>
      <Box mt={20} mb={2}>
        {!isFetching ? (
          <List items={filterAppointments(appointments, term, field)} />
        ) : (
          <Stack alignItems="center">
            <Spinner
              size="lg"
              thickness="4px"
              emptyColor="gray.200"
              color="blue.500"
            />
          </Stack>
        )}
      </Box>
    </Layout>
  );
}
