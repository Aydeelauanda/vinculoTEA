import type { ReactNode } from "react";

export default function Section({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginBottom: "32px" }}>
      <h3 style={{ marginBottom: "16px", color: "#333" }}>{title}</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px"
        }}
      >
        {children}
      </div>
    </section>
  );
}
