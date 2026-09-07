export default function SectionLabel({ icon: Icon, children, center = false }) {
  return (
    <div className={`section-label${center ? " section-label--center" : ""}`}>
      <span className="section-label__mark" aria-hidden="true">
        <Icon size={16} />
      </span>
      <p className="label text-ink-2">{children}</p>
    </div>
  );
}
