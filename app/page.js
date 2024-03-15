import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white">
     Login page isn't ready yet, go to <Link href="/music" className="font-semibold underline hover:text-slate-300">/music</Link>
    </main>
  );
}
