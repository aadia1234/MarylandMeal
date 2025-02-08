import { Icon } from "@/components/ui/icon";
import { LucideIcon } from "lucide-react-native";
import { z } from "zod";

export interface AccountCardType {
  iconName: LucideIcon | typeof Icon;
  subText: string;
  endIcon: LucideIcon | typeof Icon;
  isLast?: boolean;
}

// export interface UserStats {
//   friends: string;
//   friendsText: string;
//   followers: string;
//   followersText: string;
//   rewards: string;
//   rewardsText: string;
//   posts: string;
//   postsText: string;
// }

// Define the Zod schema
export const userSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  oldPassword: z.string().min(1, "wee").max(50, "weew"),
  newPassword: z.string().min(1, "ree").max(50, "weew"),
});

export type userSchemaDetails = z.infer<typeof userSchema>;
