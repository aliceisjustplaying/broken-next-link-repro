import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="main">
        <Link href="https://page1.paperclip.monster">Page 1</Link>
        <br />
        <Link href="https://page2.paperclip.monster">Page 2</Link>
        <br />
      </div>
    </>
  );
}
