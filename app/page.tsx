import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="main">
        <Link href="https://broken-next-link-repro.vercel.app/page1">
          Page 1
        </Link>
        <br />
        <Link href="https://broken-next-link-repro.vercel.app/page2">
          Page 2
        </Link>
        <br />
      </div>
    </>
  );
}
