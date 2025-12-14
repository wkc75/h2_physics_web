import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { BaseUnitTable } from "@/components/BaseUnitTable";
import PracticeMCQ_BaseVsDerived from "@/components/PracticeMCQ_BaseVsDerived";
import PracticeMCQ_PrefixesConversion from "@/components/PracticeMCQ_PrefixesConversion";
import PracticeMCQ_Homogenity from "@/components/PracticeMCQ_Homogenity";

export default async function Page() {
  const source = fs.readFileSync(
    path.join(
      process.cwd(),
      "app",
      "physics",
      "measurements",
      "physical-quantities-prefixes",
      "content.mdx"
    ),
    "utf8"
  );

  return (
    <MDXRemote
        source={source}
        components={{
        BaseUnitTable,
        PracticeMCQ_BaseVsDerived,
        PracticeMCQ_PrefixesConversion,
        PracticeMCQ_Homogenity,
        }}
        options={{
        mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
        },
        }}
    />
);
}
