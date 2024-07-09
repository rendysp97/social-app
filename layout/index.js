import Head from "next/head";
import Nav from "@/components/nav";

export default function Layout({ children, metaTitle, metaDescription }) {
  return (
    <div className="p-20  underline font-bold text-3xl  ">
      <Head>
        <title>{`Create Next App - ${metaTitle}`}</title>
        <meta
          name="description"
          content={metaDescription || "Generated by create next app"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      {children}
    </div>
  );
}
