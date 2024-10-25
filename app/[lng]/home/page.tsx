import Pagination from "@/components/Paginnation";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/services/common";
import { IPost } from "@/services/types";
import { notFound } from "next/navigation";

export default async function Home() {
  const getPostList = async () => {
    const res = await getPosts({
      current: 1,
      pageSize: 6
    });
    return res;
  };
  const res = await getPostList();

  if (!res?.success) return notFound();
  const {
    data: { list, total }
  } = res;
  return (
    <div className="grid max-w-5xl mx-auto grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:py-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="list grid grid-cols-3 gap-4">
          {list.map((item: IPost) => (
            <PostCard key={item.id} post={item} />
          ))}
        </div>
        <Pagination pageSize={6} current={1} total={total} />
      </main>
    </div>
  );
}