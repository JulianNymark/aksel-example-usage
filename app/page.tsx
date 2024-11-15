"use client";
import { Box, Heading, HStack, Link, VStack } from "@navikt/ds-react";

const createLink = (inputLink: string) => {
  return (
    <HStack>
      <Box asChild marginInline="0 5">
        <Link href={`/${inputLink}`}>{inputLink}</Link>
      </Box>
      <Box asChild>
        <Link
          href={`https://github.com/JulianNymark/aksel-example-usage/blob/main/app/${inputLink}/page.tsx`}
        >
          (source)
        </Link>
      </Box>
    </HStack>
  );
};

const Page = () => {
  return (
    <main>
      <VStack marginBlock="10" gap={"4"}>
        <Heading level="1" size="medium">
          Diverse
        </Heading>
        <Box>{createLink("ref-to-modal")}</Box>
        <Box>{createLink("fileupload-with-aria-live")}</Box>
        <Heading level="1" size="medium">
          Typescript
        </Heading>
        <Box>{createLink("string-type-to-token")}</Box>
      </VStack>
    </main>
  );
};

export default Page;
