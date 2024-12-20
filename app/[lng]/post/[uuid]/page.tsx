import { getPost } from "@/services/common";
import { IPost } from "@/services/types";
import { Chip } from "@nextui-org/react";
import "github-markdown-css";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Waline from "./_components/Waline";
interface pageProps {}

export default async function page({ params: { uuid } }: pageProps) {
  const res = await getPost(uuid);
  if (!res?.success) notFound();
  const post: IPost = res.data;
  return (
    <div
      style={{ backgroundImage: `url(${post?.notion?.cover})` }}
      className="min-w-screen bg-fixed overflow-hidden"
    >
      <div className="wrapper mt-10 bg-white rounded-lg p-4 max-w-[1000px] mx-auto">
        <div className="topshow max-w-[1000px] mx-auto">
          <h2 className="text-3xl text-primary font-bold">{post.notion?.title}</h2>
          <h3 className="text-lg mt-3">{post.notion?.title}</h3>
          <Chip size="lg" className="my-4" color="primary">
            {post.notion?.category?.name}
          </Chip>
          <div className="tags flex gap-2">
            {post.notion?.tags?.map((tag) => (
              <Chip size="sm" key={tag.id}>
                {tag.name}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      <article className="max-w-[1000px] py-4 mx-auto content">
        <div className="md rounded-lg p-4 bg-white/55">
          <Markdown className={"markdown-body rounded-lg p-4"} remarkPlugins={[remarkGfm]}>
            {post.notion?.content}
          </Markdown>
        </div>
      </article>
      <div className="max-w-[1000px] mx-auto bg-white rounded-lg p-4 mb-4">
        <Waline />
      </div>
    </div>
  );
}
