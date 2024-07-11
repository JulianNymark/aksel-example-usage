"use client";
import { BodyLong, Box, Link } from "@navikt/ds-react";

const Page = () => {
  return (
    <main>
      <Box asChild marginBlock="10">
        <BodyLong>
          <Box asChild marginInline="0 5">
            <Link href="/ref-to-modal">ref-to-modal</Link>
          </Box>
          <Box asChild>
            <Link href="https://github.com/JulianNymark/aksel-example-usage/blob/main/app/ref-to-modal/page.tsx">
              (source)
            </Link>
          </Box>
        </BodyLong>
      </Box>
    </main>
  );
};

export default Page;
