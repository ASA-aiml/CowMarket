import { getListings } from "@/app/actions/listings";
import Feed from "@/components/Feed";
import PullToRefresh from "@/components/PullToRefresh";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: initialListings } = await getListings({ page: 1 });

  return (
    <div className="min-h-screen md:pl-64 transition-all duration-300">
      <PullToRefresh>
        <Feed initialListings={initialListings} />
      </PullToRefresh>
    </div>
  );
}
