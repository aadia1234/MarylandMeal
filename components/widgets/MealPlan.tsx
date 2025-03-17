import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import { Text } from "../ui/text";

export default function MealPlan({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Accordion
      size="md"
      variant="unfilled"
      type="single"
      defaultValue={["a"]}
      className="my-2 w-full rounded-xl border border-outline-0 bg-white"
    >
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText className="font-primary">
                    {title}
                  </AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <Text>{content}</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
