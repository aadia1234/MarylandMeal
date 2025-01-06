// import { Theme } from "@/constants/Colors";
// import { Text, View, Image, StyleSheet, TextInput } from "react-native";
// import DateTimePicker from "react-native-ui-datepicker";

import { useState } from "react";
import { Popover, PopoverArrow, PopoverBackdrop, PopoverBody, PopoverContent } from "./ui/popover";
import { Button, ButtonIcon } from "./ui/button";
import DateTimePicker from "react-native-ui-datepicker";
import { CalendarClock } from "lucide-react-native";
import { Text } from "./ui/text";
import { Center } from "./ui/center";

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       datePickerContainer: {
//         width: '90%',
//         backgroundColor: '#f0f4f3',
//         borderRadius: 10,
//         padding: 10,
//       },
//       monthYearHeader: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#4CAF50',
//         textAlign: 'center',
//         marginVertical: 10,
//       },
//       dayContainer: {
//         borderRadius: 20,
//         width: "75%",
//         // padding: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
//       selectedDay: {
//         backgroundColor: '#4CAF50', // Green background for selected date
//         borderRadius: 50,
//       },
//       selectedDayText: {
//         color: '#fff',
//         fontWeight: 'bold',
//       },
// });

// export default function Calendar(props: {date: number, onChange: (date: number) => void}) {
//     return (
//         <View style={styles.container}>
//             <DateTimePicker
//                 mode="single"
//                 date={props.date}
//                 selectedItemColor={Theme.colors.primary}
//                 headerButtonColor={Theme.colors.primary}
//                 // monthYearHeaderStyle={styles.monthYearHeader}
//                 dayContainerStyle={styles.dayContainer}
//                 // selectedDayStyle={styles.selectedDay}
//                 // selectedDayTextStyle={styles.selectedDayText}
//                 // dayContainerStyle={styles.dayText}                
//                 height={300}
//                 onChange={(param) => props.onChange(param.date as number)}
//             />
//         </View>
//     );

// }

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
            size="lg"
            variant="outline"
            className="rounded-md aspect-square"
            {...triggerProps}
          >
            <ButtonIcon as={CalendarClock} />
          </Button>
        );
      }}
    >
      <PopoverBackdrop className="bg-primary-500" />
      <PopoverContent>
        <PopoverArrow />
        <Center className="">
          <PopoverBody className="">
            <DateTimePicker
              mode="single"
              date={props.date}
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