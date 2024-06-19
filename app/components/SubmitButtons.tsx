"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Heart, Loader, Loader2 } from "lucide-react";
import Link from "next/link";

export function CreationSubmit() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button type="submit" size="lg">
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Please Wait!
        </Button>
      ) : (
        <Button type="submit" size="lg">
          Next
        </Button>
      )}
    </>
  );
}

export function AddToFavoriteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          disabled
        >
          <Loader className="text-primary h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="h-4 w-4 " />
        </Button>
      )}
    </>
  );
}

export function DeleteFromFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          disabled
        >
          <Loader className="text-primary h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="h-4 w-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  );
}

export function ReservationSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="w-4 h-4 animate-spin my-2" />
          Please wait...
        </Button>
      ) : (
        <Button className="w-full" type="submit">
          Make a reservation
        </Button>
      )}
    </>
  );
}
