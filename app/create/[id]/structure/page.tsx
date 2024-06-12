import { createCategoryPage } from "@/app/actions";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { SelectCategory } from "@/app/components/SelectCategory";
import { CreationSubmit } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StructureRoute({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these describe{" "}
          <span className="text-[#FF5A5F]">Your Home?</span>
        </h2>
      </div>
      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectCategory />
        <CreationBottomBar />
      </form>
    </>
  );
}
