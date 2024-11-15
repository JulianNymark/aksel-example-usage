"use client";

import {
  Alert,
  FileObject,
  FileRejected,
  FileRejectionReason,
  FileUploadItemProps,
  Heading,
  VStack,
} from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { UNSAFE_FileUpload as FileUpload } from "@navikt/ds-react";

const MAX_FILES = 3;
const MAX_SIZE_MB = 1;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

const CustomItem = ({
  index,
  onDelete,
  ...props
}: FileUploadItemProps & {
  index: number;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(
      () => {
        setLoading(false);
      },
      1700 * index + 1,
    );
  }, [index]);

  return (
    <FileUpload.Item
      {...props}
      status={loading ? "uploading" : "idle"}
      button={{
        action: "delete",
        onClick: onDelete,
      }}
      as="li"
    />
  );
};

const errors: Record<FileRejectionReason, string> = {
  fileType: "Filformatet støttes ikke",
  fileSize: `Filen er større enn ${MAX_SIZE_MB} MB`,
};

function getListError(acceptedFiles: FileObject[]) {
  const filesTooMany = acceptedFiles.length - MAX_FILES;
  if (filesTooMany === 1)
    return "Du har lagt ved en fil for mye, vennligst fjern en fil";
  if (filesTooMany > 1)
    return `Du har lagt ved ${filesTooMany} filer for mye, vennligst fjern ${filesTooMany} filer`;
}

const Render = () => {
  const [files, setFiles] = useState<FileObject[]>([]);

  function addFiles(filesToAdd: FileObject[]) {
    setFiles([...files, ...filesToAdd]);
  }

  function removeFile(fileToRemove: FileObject) {
    setFiles(files.filter((file) => file !== fileToRemove));
  }

  const acceptedFiles = files.filter((file) => !file.error);
  const rejectedFiles = files.filter((f): f is FileRejected => f.error);

  return (
    <FileUpload style={{ width: 500, maxWidth: "100%", margin: "0 auto" }}>
      <VStack gap="6">
        <FileUpload.Dropzone
          label="Last opp filer til søknaden"
          description={`Maks størrelse ${MAX_SIZE_MB} MB`}
          accept=".doc,.docx,.xls,.xlsx,.pdf"
          maxSizeInBytes={MAX_SIZE}
          fileLimit={{ max: MAX_FILES, current: acceptedFiles.length }}
          onSelect={addFiles}
        />

        {getListError(acceptedFiles) && (
          <Alert variant="error">{getListError(acceptedFiles)}</Alert>
        )}

        {acceptedFiles.length > 0 && (
          <VStack gap="2">
            <Heading level="3" size="xsmall">
              {`Vedlegg (${acceptedFiles.length} av maks ${MAX_FILES})`}
            </Heading>
            <VStack as="ul" gap="3">
              {acceptedFiles.map((file, index) => (
                <CustomItem
                  key={index}
                  index={index}
                  file={file.file}
                  onDelete={() => removeFile(file)}
                />
              ))}
            </VStack>
          </VStack>
        )}
        <div id="file-errors" aria-live="polite">
          {rejectedFiles.map((rejected, index) => {
            return <span key={index}>{errors[rejected.reasons[0]]}</span>;
          })}
        </div>
        {rejectedFiles.length > 0 && (
          <VStack gap="2">
            <Heading level="3" size="xsmall">
              Vedlegg med feil
            </Heading>
            <VStack as="ul" gap="3">
              {rejectedFiles.map((rejected, index) => (
                <CustomItem
                  key={index}
                  index={index}
                  file={rejected.file}
                  error={errors[rejected.reasons[0]]}
                  onDelete={() => removeFile(rejected)}
                />
              ))}
            </VStack>
          </VStack>
        )}
      </VStack>
    </FileUpload>
  );
};

export default Render;
