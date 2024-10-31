import { Box } from "@navikt/ds-react";

export default function Page() {
  let scoped_string;

  const value = 42;

  if (value < 8) {
    scoped_string = "surface-default" as const;
  } else {
    scoped_string = "surface-danger" as const;
  }

  console.log(scoped_string);

  return <Box background={scoped_string}>box contents</Box>;
}
