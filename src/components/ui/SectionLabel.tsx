type SectionLabelProps = {
  children: React.ReactNode;
};

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/40">
      {children}
    </p>
  );
}