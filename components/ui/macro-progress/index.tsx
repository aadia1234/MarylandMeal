import { Grid, GridItem } from "@/components/ui/grid";
import Macro from "@/interfaces/Macro";
import MacroCard from "@/components/MacroCard";

const MacroProgressView = ({ target, consumed, preview }: { target: Macro, consumed: Macro, preview?: Macro }) => {
  const macros = [
    { macro: "calories", target: target.calories, consumed: consumed.calories, preview: preview?.calories },
    { macro: "protein", target: target.protein, consumed: consumed.protein, preview: preview?.protein },
    { macro: "carbs", target: target.carbs, consumed: consumed.carbs, preview: preview?.carbs },
    { macro: "fats", target: target.fats, consumed: consumed.fats, preview: preview?.fats }
  ];

  return (
    <Grid className="gap-y-2 gap-x-2" _extra={{ className: "grid-cols-2" }}>
      {
        macros.map((entry, index) => {
          return (
            <GridItem _extra={{ className: "col-span-1" }} key={index}>
              <MacroCard {...entry} />
            </GridItem>
          );
        })
      }
    </Grid>
  );
}

export { MacroProgressView };