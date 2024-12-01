import React from "react";
import Meet from "./Meet";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  console.log({ id });

  return (
    <main>
      <Meet />
    </main>
  );
}
