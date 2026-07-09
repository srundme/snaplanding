export default function ContentRenderer({ sections }) {
  return sections.map((section, index) => {
    if (section.type === "h2") {
      return (
        <h2 key={index} className="mt-10 font-display text-xl font-semibold text-white">
          {section.content}
        </h2>
      );
    }

    if (section.type === "p") {
      return <p key={index}>{section.content}</p>;
    }

    if (section.type === "ul") {
      return (
        <ul key={index} className="mt-3 list-disc space-y-2 pl-5">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

    return null;
  });
}
