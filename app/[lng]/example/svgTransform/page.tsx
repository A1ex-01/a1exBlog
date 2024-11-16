"use client";
import IconTransform from "@/components/IconTransform";
import { useCommon } from "@/providers/CommonProvider";
import { getFragmentWorker } from "@/utils";
import "github-markdown-css";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
interface SvgTransformProps {}

const md = `
\`\`\`tsx
async asyncData({ $axios, query, n2token }) {
}
\`\`\`
`;
const paths = {
  star: {
    color: "#fff312",
    d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
  },
  heart: {
    color: "#ff0088",
    d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  }
};

export default function SvgTransform(props: SvgTransformProps) {
  const { codeFragments } = useCommon();
  return (
    <div>
      <h1>svg 过度变换</h1>
      <main>
        <div className="wrapper mx-auto w-max">
          <IconTransform startIconifyIcon="tabler:star" endIconifyIcon="tabler:heart" />
        </div>
        <div className="codeBox">
          <Markdown
            className={"markdown-body rounded-lg p-4"}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                // custom
                return !inline && match ? (
                  <SyntaxHighlighter PreTag="div" language={match[1]} {...props}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {getFragmentWorker(
              codeFragments?.find((f) => f.title === "IconTransform")?.fragment!,
              "tsx"
            )}
          </Markdown>
        </div>
      </main>
    </div>
  );
}