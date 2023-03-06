import { Pokemon } from "pokemon/DB";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Chip,
} from "@material-tailwind/react";
import { memo } from "react";

interface DisplayCardProps {
  name: Pokemon["name"]["english"];
  type: Pokemon["type"];
  reference_number: Pokemon["reference_number"];
  thumbnailUrl: Pokemon["thumbnailUrl"];
}

function DisplayCard({
  name,
  type,
  reference_number,
  thumbnailUrl,
}: DisplayCardProps) {
  return (
    <Card className="w-full md:w-[20rem] h-fit">
      <CardBody className="flex flex-col text-center relative justify-center items-center space-y-4 py-4">
        <Typography
          variant="h3"
          className="absolute text-5xl text-slate-500 top-3 right-3 font-bold"
        >
          #{reference_number}
        </Typography>
        <Image alt={name} width={150} height={150} src={thumbnailUrl} />
        <Typography variant="h3">{name}</Typography>
      </CardBody>
      <CardFooter
        divider
        className="flex items-center justify-end space-x-4 py-4"
      >
        {type.map((type) => (
          <Chip key={type.english} value={type.english} />
        ))}
      </CardFooter>
    </Card>
  );
}

export default memo(DisplayCard);
