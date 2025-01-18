import { Center } from "./ui/center";
import { Spinner } from "./ui/spinner";

export default function LoadingSpinner() {
    return (
      <Center className="w-full h-full bg-white">
        <Spinner size="small" className="text-primary-500" />
      </Center>
    );
  };