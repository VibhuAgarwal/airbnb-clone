import { Counter } from "@/app/components/Counter";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function DescriptionPage() {
  return (
    <>
      <div className="w-3/5 m-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe{" "}
          <span className="text-[#FF5A5F] uppercase">your home</span> as good as
          you can!
        </h2>
      </div>
      <form>
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input name="title" type="text" placeholder="Title" required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Please describe your home..."
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              placeholder="Price per night in USD"
              required
              min={10}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" required />
          </div>
          <Card>
            <CardHeader className="flex flex-col gap-y-5 ">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium underline">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    How many guests do you want?
                  </p>
                </div>
                <Counter />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium underline">Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many rooms do you have?
                  </p>
                </div>
                <Counter />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium underline">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bathrooms do you have?
                  </p>
                </div>
                <Counter />
              </div>
            </CardHeader>
          </Card>
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
