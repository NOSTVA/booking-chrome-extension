import {
  Card,
  CardBody,
  Text,
  HStack,
  Stack,
  Flex,
  Spacer,
  StackDivider,
  useDisclosure,
  Button,
  Box,
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { autoFill, getAction } from "../functions";
import { updateAppointement } from "../../public/utils/api";
import Moment from "react-moment";
export default function Appointment({ appointment: initApp }) {
  const storedColor = localStorage.getItem(initApp._id) === "done";
  const [color, setColor] = useState(storedColor);

  const [appointment, setAppointment] = useState(initApp);
  const date = getAction(_id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { _id, applicants, email, phone, status, visa, expectedTravelDate } =
    appointment;

  return (
    <Card size="sm" bg={color ? "red.900" : ""}>
      <CardBody>
        <Stack divider={<StackDivider />}>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Text color="twitter.400">{email} </Text>
            </Flex>
            <ActionsMenu
              onClose={onClose}
              isOpen={isOpen}
              onOpen={onOpen}
              appointment={appointment}
              setAppointment={setAppointment}
              color={color}
              setColor={setColor}
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

function ActionsMenu({
  isOpen,
  onClose,
  onOpen,
  appointment,
  setAppointment,
  handleSpecial,
  color,
  setColor,
}) {
  const storedColor = localStorage.getItem(appointment._id) === "done";
  const [isChecked, setIsChecked] = useState(storedColor);

  const handleCheckboxChange = () => {
    if (isChecked) {
      localStorage.removeItem(appointment._id);
      setColor(false);
    } else {
      localStorage.setItem(appointment._id, "done");
      setColor(true);
    }
    setIsChecked(!isChecked);
  };
  const handleStatus = async (appointment, status) => {
    const data = await updateAppointement(appointment._id, {
      status,
    });
    setAppointment((prev) => ({
      ...prev,
      status: data.status,
      updatedAt: data.updatedAt,
      lastUpdatedBy: [data.lastUpdatedBy],
    }));
  };
  useEffect(() => {
    const items = localStorage.getItem(appointment._id);
    setIsChecked(!!items);
  }, [appointment._id]);
  return (
    <>
      <Box>
        <HStack mb={"10px"}>
          <Button
            size="xs"
            onClick={() => autoFill(appointment)}
            isDisabled={appointment.status == "complete"}
          >
            Auto fill
          </Button>
          <Button
            size="xs"
            onClick={async () => handleStatus(appointment, "complete")}
            isDisabled={appointment.status == "complete"}
          >
            Set status complete
          </Button>
        </HStack>
        <Stack>
          <Button
            size="xs"
            onClick={async () => handleStatus(appointment, "pending")}
            isDisabled={appointment.status == "pending"}
          >
            Set status pending
          </Button>
          <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>
            Make it special
          </Checkbox>

          <Moment fromNow>{appointment.updatedAt}</Moment>
          <Text>
            By{" "}
            {appointment.lastUpdatedBy?.[0]?.email?.split("@")[0] || "unkown"}
          </Text>
        </Stack>
      </Box>
    </>
  );
}
