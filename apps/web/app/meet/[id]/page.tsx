import React from "react";
import Meet from "./Meet";

export default function page({ params }: { params: { id: string } }) {
  return (
    <main>
      <Meet />
    </main>
  );
}
