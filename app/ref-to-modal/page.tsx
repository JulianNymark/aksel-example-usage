"use client";
import { BodyLong, Box, Button, Modal, Page } from "@navikt/ds-react";
import { forwardRef, RefObject, useRef } from "react";

const ComponentParent = () => {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <div className="parent">
      <ComponentChildA theRef={ref} />
    </div>
  );
};

const ComponentChildA = ({
  theRef,
}: {
  theRef: RefObject<HTMLDialogElement>;
}) => {
  return (
    <div className="childA">
      <ComponentChildB ref={theRef} />
    </div>
  );
};

/**
 * this component shows usage of forwardRef if you want to use the exact
 * prop name `ref` to pass down a ref. The typing is not ideal here, as it's
 * forced to be a RefObject<>, and forwardRef expects it as a ForwardedRef<> instead
 * */
const ComponentChildB = forwardRef<HTMLDialogElement>((_props, ref) => {
  return (
    <div className="childB">
      <ComponentChildCWithModal
        anotherRef={ref as RefObject<HTMLDialogElement>}
      />
    </div>
  );
});
ComponentChildB.displayName = "ComponentChildB";

const ComponentChildCWithModal = ({
  anotherRef: ref,
}: {
  anotherRef: RefObject<HTMLDialogElement>;
}) => {
  return (
    <div className="childC">
      <Button
        onClick={() => {
          ref.current?.showModal();
        }}
      >
        modal
      </Button>
      <Modal ref={ref} header={{ heading: "Overskrift" }}>
        <Modal.Body>
          <BodyLong>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
            incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt duis
            laborum. Proident aute culpa qui nostrud velit adipisicing minim.
            Consequat aliqua aute dolor do sit Lorem nisi mollit velit. Aliqua
            exercitation non minim minim pariatur sunt laborum ipsum.
            Exercitation nostrud est laborum magna non non aliqua qui esse.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={() => ref.current?.close()}>
            Primær
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => ref.current?.close()}
          >
            Sekundær
          </Button>
          <Button
            type="button"
            variant="tertiary"
            onClick={() => ref.current?.close()}
          >
            Tertiær
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <Box marginBlock="10">
        <BodyLong>
          {`
This is a demo of sending a "ref" down through Aksel components (specifically a ref to the "<Modal />" component)
`}
        </BodyLong>
        <ComponentParent />
      </Box>
    </main>
  );
}
