import { createCategoryPage } from "@/app/actions";
import { SelectCategory } from "@/app/components/SelectCategory";
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
        <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
          <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
            <Button
              variant="secondary"
              size="lg"
              className="hover:bg-[#FF5A5F]"
              asChild
            >
              <Link href="/">Cancel</Link>
            </Button>
            <Button size="lg">Save</Button>
          </div>
        </div>
      </form>
    </>
  );
}
