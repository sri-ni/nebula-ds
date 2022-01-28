import { CMS_NAME } from '../lib/constants';
import Link from 'next/link';

export default function BlogIntro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between pt-8 pb-8 pl-8 pr-8 bg-gray-50 bg-transparent sticky top-0 backdrop-blur">
      <Link href="/blog">
        <h1
          className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 starwars-blue dark:text-red-400"
          style={{ cursor: 'pointer' }}
        >
          Blog.
        </h1>
      </Link>

      <Link href="/">
        <a className="nav-link text-xl font-regular text-stone-700">Home</a>
      </Link>
    </section>
  );
}
