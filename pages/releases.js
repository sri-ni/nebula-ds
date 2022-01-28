import Link from "next/link";
import {getAllReleases} from "../lib/mdx";
import Layout from '../components/layout';
import Container from '../components/container';
import Header from '../components/header';
import PostTitle from '../components/post-title';
import Head from 'next/head';
import {CMS_NAME} from '../lib/constants';
import PostHeader from '../components/post-header';
import PostBody from '../components/post-body';

export default function Releases({releases}) {
  return (
    <Layout>
      <Head>
        <title>Releases</title>
      </Head>
      <Container>
        <section
          className="flex-col md:flex-row flex items-center md:justify-between pt-8 pb-8 pl-8 pr-8 bg-gray-50 bg-transparent sticky top-0 backdrop-blur">
          <Link href='/releases'>
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 starwars-blue dark:text-red-400"
              style={{cursor: 'pointer'}}>
              Releases.
            </h1>
          </Link>


          <Link href='/'>
            <a className="nav-link text-xl font-regular text-stone-700">
              Home
            </a>
          </Link>

        </section>
        <section
          className="flex-col md:flex-row flex items-center md:justify-between pt-8 pb-8 pl-8 pr-8 bg-gray-50 bg-transparent text-gray-500">
          <ul>
            {releases.map((release, index) => (
              <li key={index} className="mb-4 underline">
                <Link href={`releases/${release.slug}`}>{release.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const releases = getAllReleases();

  return {
    props: {releases},
  };
};
