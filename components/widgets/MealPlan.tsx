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
import { Heading } from "../ui/heading";
import { View } from "../ui/view";

export interface MealPlanData {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
}

export default function MealPlan({
  title,
  content,
}: {
  title: string;
  content: MealPlanData;
}) {
  const mealPlan: MealPlanData =
    typeof content === "string" ? JSON.parse(content) : content;

  const renderMealList = (meal: string[]) => (
    <View style={{ marginLeft: 20 }}>
      {" "}
      {meal.map((item, index) => (
        <View
          key={index}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ marginRight: 8 }}>•</Text>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );

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
          <Text>Breakfast</Text>
          {renderMealList(mealPlan.breakfast)}
          <Text>Lunch</Text>
          {renderMealList(mealPlan.lunch)}
          <Text>Dinner</Text>
          {renderMealList(mealPlan.dinner)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
