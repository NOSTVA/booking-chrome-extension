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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { autoFill, getAction } from "../functions";
import { updateAppointement } from "../../public/utils/api";
import Moment from "react-moment";
export default function Appointment({ appointment: initApp }) {
  const [appointment, setAppointment] = useState(initApp);
  const date = getAction(_id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { _id, applicants, email, phone, status, visa, expectedTravelDate } =
    appointment;

  return (
    <Card size="sm">
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

function ActionsMenu({ isOpen, onClose, onOpen, appointment, setAppointment }) {
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
          <Moment fromNow>{appointment.updatedAt}</Moment>
          <Text>
            By {appointment.lastUpdatedBy[0]?.email?.split("@")[0] || "unkown"}
          </Text>
        </Stack>
      </Box>
    </>
  );
}
