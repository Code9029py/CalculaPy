type CalculatorSupportGridProps = {
  children: React.ReactNode;
};

export function CalculatorSupportGrid({
  children
}: CalculatorSupportGridProps) {
  return (
    <div className="calculator-support calculator-support-grid">{children}</div>
  );
}

export function CalculatorSupportNote({
  children
}: CalculatorSupportGridProps) {
  return <div className="calculator-support-note">{children}</div>;
}
