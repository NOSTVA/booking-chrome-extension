import {
  Card,
  CardBody,
  Text,
  HStack,
  Stack,
  Flex,
  Spacer,
  StackDivider,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { ArrowRightIcon, CheckIcon, HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { autoFill, getAction, getTimeAgo } from "../functions";

export default function Appointment({ appointment }) {
  const { _id, applicants, email, phone, status, visa, expectedTravelDate } =
    appointment;
  const date = getAction(_id);
  const timeAgo = getTimeAgo(date) || "-";
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card size="sm">
      <CardBody>
        <Stack divider={<StackDivider />}>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Text color="twitter.400">{email} </Text>
              <Text>{timeAgo || "-"} </Text>
            </Flex>
            <ActionsMenu
              onClose={onClose}
              isOpen={isOpen}
              onOpen={onOpen}
              appointment={appointment}
            />
          </Flex>

          <HStack width="full">
            <Stack width="full">
              <Flex>
                <Text as="b">Travel Date</Text>
                <Spacer />
                <Text>{expectedTravelDate.split("T")[0]}</Text>
              </Flex>
              <Flex>
                <Text as="b">Phone</Text>
                <Spacer />
                <Text>{phone}</Text>
              </Flex>
            </Stack>
            <Stack width="full">
              <Flex>
                <Text as="b">Status</Text>
                <Spacer />
                <Text>{status}</Text>
              </Flex>
              <Flex>
                <Text as="b">Visa</Text>
                <Spacer />
                <Text>{visa}</Text>
              </Flex>
            </Stack>
          </HStack>

          <Stack>
            {applicants.map(({ _id, firstName, lastName, passportNumber }) => {
              return (
                <Flex key={_id}>
                  <Text>{firstName + " " + lastName}</Text>
                  <Spacer />
                  <Text>{passportNumber}</Text>
                </Flex>
              );
            })}
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}

function ActionsMenu({ isOpen, onClose, onOpen, appointment }) {
  return (
    <Menu isLazy onClose={onClose} isOpen={isOpen}>
      <MenuButton
        onClick={onOpen}
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        size="xs"
        variant="ghost"
      />

      <MenuList>
        <MenuItem
          icon={<ArrowRightIcon />}
          onClick={() => autoFill(appointment)}
        >
          Auto Fill
        </MenuItem>
        <MenuItem icon={<CheckIcon />}>Set status complete</MenuItem>
      </MenuList>
    </Menu>
  );
}
