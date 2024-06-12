"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function CreationSubmit() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button type="Submit" size="lg">
          Next
        </Button>
      ) : (
        <Button type="Submit" size="lg">
          Next
        </Button>
      )}
    </>
  );
}
