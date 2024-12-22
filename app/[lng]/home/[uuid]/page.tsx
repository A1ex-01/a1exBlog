import { AwsomePagination } from "@/components/AwsomePagination";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/services/common";
import { IPost } from "@/services/types";
import { notFound, redirect } from "next/navigation";

export default async function HomeDetail({ params: { uuid } }: { params: { uuid: string } }) {
  if (+uuid === 1) redirect("/home");
  if (Number(uuid) != +uuid) notFound();
  const getPostList = async () => {
    const res = await getPosts({
      current: +uuid,
      pageSize: 6
    });
    return res;
  };
  const res = await getPostList();
  if (!res?.success) notFound();
  const {
    data: { list, total }
  } = res;
  return (
    <div className="mb-10">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="list grid grid-cols-3 gap-4">
          {list.map((item: IPost) => (
            <PostCard key={item.id} post={item} />
          ))}
        </div>
        <AwsomePagination parentPath="/home" pageSize={6} page={+uuid} totalCount={total} />
      </main>
    </div>
  );
}
