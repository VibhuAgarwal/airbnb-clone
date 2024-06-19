/* eslint-disable @next/next/no-img-element */
import { createReservation } from "@/app/actions";
import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalender } from "@/app/components/SelectCalender";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function getData(homeId: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      price: true,
      title: true,
      createdAT: true,
      categoryName: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeId,
        },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="w-3/4 mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of home"
          src={`https://aushouajbtaovubjfkam.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>
      <div className="flex justify-between mt-8 gap-x-24">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} / {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Rooms</p> *{" "}
            <p>{data?.bathrooms} Bathrooms</p>
          </div>
          <div className="flex items-center mt-6">
            <img
              src={
                data?.User?.profileImage ??
                "https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"
              }
              alt="User Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">
                Hosted by {data?.User?.firstName as string}
              </h3>
              <p className="text-sm text-muted-foreground">
                Host since{" "}
                {
                  (data?.createdAT.getDate() +
                    "/" +
                    data?.createdAT.getMonth() +
                    "/" +
                    data?.createdAT.getFullYear()) as number | React.ReactNode
                }
              </p>
            </div>
          </div>
          <Separator className="my-7" />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className="my-7" />
          <p>{data?.description}</p>
          <Separator className="my-7" />
          <HomeMap locationValue={country?.value as string} />
        </div>
        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params?.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalender reservation={data?.Reservation} />

          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className="w-full" asChild>
              <Link href="/api/auth/login">Make a reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
