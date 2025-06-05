"use client";
export default function Home() {
  return (
    <div>
      {Array.from({ length: 100 }, (_, i) => i + 1).map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
