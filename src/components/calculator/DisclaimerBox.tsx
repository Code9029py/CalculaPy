type DisclaimerBoxProps = {
  children: React.ReactNode;
};

export function DisclaimerBox({ children }: DisclaimerBoxProps) {
  return (
    <section className="disclaimer-box">
      <h2>Aviso orientativo</h2>
      <p>{children}</p>
    </section>
  );
}
