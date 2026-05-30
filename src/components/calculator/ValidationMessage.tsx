type ValidationMessageProps = {
  message?: string;
};

export function ValidationMessage({ message }: ValidationMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="field-error" role="alert">
      {message}
    </p>
  );
}
