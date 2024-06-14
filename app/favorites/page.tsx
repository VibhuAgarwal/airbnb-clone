import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { ListingCard } from "../components/ListingCard";
import { NoItems } from "../components/NoItems";

async function getData(userId: string) {
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          id: true,
          photo: true,
          description: true,
          Favorite: true,
          price: true,
          country: true,
        },
      },
    },
  });
  return data;
}

export default async function FavoriteRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const data = await getData(user?.id as string);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight transition-colors">
        Your Favorites
      </h2>
      {data.length === 0 ? (
        <NoItems
          description="Please add favorites to see them right here..."
          title="Hey! You don't have any favorites"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 grid-cols-1 mt-8">
          {data.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathName="/favorites"
              homeId={item.Home?.id as string}
              imagePath={item.Home?.photo as string}
              price={item.Home?.price as number}
              userId={user?.id}
              favoriteId={item.Home?.Favorite[0]?.id as string}
              isInFavoritesList={
                (item.Home?.Favorite?.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
