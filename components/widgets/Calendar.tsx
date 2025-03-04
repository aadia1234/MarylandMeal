import { useState } from "react";
import { Popover, PopoverArrow, PopoverBackdrop, PopoverBody, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import DateTimePicker from "react-native-ui-datepicker";
import { Center } from "../ui/center";

export default function Calendar(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Popover
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      placement={props.placement}
      size="full"
      trigger={(triggerProps) => {
        return (
          <Button
            size="md"
            variant="link"
            className="rounded-md"
            {...triggerProps}
          >
            {props.children}
            {/* <ButtonIcon as={CalendarClock} /> */}
          </Button>
        );
      }}
    >
      <PopoverBackdrop className="bg-black" />
      <PopoverContent>
        <PopoverArrow />
        <Center className="">
          <PopoverBody className="">
            <DateTimePicker
              mode="single"
              date={props.date}
              maxDate={Date.now()}
              displayFullDays
              selectedItemColor="#fa1932" // need to double check!
              headerButtonColor="#fa1932"
              headerButtonsPosition="around"
              dayContainerStyle={{ aspectRatio: 1, margin: "auto", borderRadius: 8 }}
              onChange={(params) =>
                props.setDate(new Date(params.date as Date))
              }
            />
          </PopoverBody>
        </Center>
      </PopoverContent>
    </Popover>
  );
};