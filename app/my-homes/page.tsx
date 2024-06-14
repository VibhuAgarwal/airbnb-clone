import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { ListingCard } from "../components/ListingCard";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItems";

async function getData(userId: string) {
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      description: true,
      price: true,
      photo: true,
      Favorite: {
        where: {
          userId: userId,
        },
      },
    },
    orderBy: {
      createdAT: "desc",
    },
  });
  return data;
}

export default async function MyHomes() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/");
  const data = await getData(user?.id as string);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-bold tracking-tight transition-colors">
        Your Homes
      </h2>
      {data.length === 0 ? (
        <NoItems
          title="Sorry! You don't have any homes..."
          description="Please create your own listing to see it right here!"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 grid-cols-1 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              price={item.price as number}
              location={item.country as string}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoritesList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/my-homes"
            />
          ))}
        </div>
      )}
    </section>
  );
}
