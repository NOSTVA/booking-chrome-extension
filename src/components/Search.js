import React from "react";
import {
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
} from "@chakra-ui/react";

function Search({ value, onChange, field, setField }) {
  return (
    <Container width="md" maxW="md">
      <FormControl>
        <FormLabel>Search Appointments</FormLabel>
        <HStack spacing={2}>
          <Input
            size="sm"
            type="text"
            placeholder="Enter keywords"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <Select
            size="sm"
            value={field}
            width={60}
            onChange={(e) => setField(e.target.value)}>
            <option value="passportNumber">Passport</option>
            <option value="email">Email</option>
            <option value="status">Status</option>
          </Select>
        </HStack>
      </FormControl>
    </Container>
  );
}

export default Search;
