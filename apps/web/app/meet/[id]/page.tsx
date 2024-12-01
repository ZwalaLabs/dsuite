import React from "react";
import Meet from "./Meet";

export default function page({ params }: { params: { id: string } }) {
  console.log({ id: params.id });
  return (
    <main>
      <Meet />
    </main>
  );
}
