type ValidationMessageProps = {
  id?: string;
  message?: string;
};

export function ValidationMessage({ id, message }: ValidationMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="field-error" id={id} role="alert">
      {message}
    </p>
  );
}
