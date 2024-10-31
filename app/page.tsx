"use client";
import { Box, HStack, Link, VStack } from "@navikt/ds-react";

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
      <VStack marginBlock="10">
        {createLink("ref-to-modal")}
        {createLink("string-type-to-token")}
      </VStack>
    </main>
  );
};

export default Page;
