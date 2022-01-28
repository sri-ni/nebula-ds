import React from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllReleases, getSingleRelease } from '../../lib/mdx';
import Layout from '../../components/layout';
import Container from '../../components/container';
import Header from '../../components/header';
import PostTitle from '../../components/post-title';
import Head from 'next/head';
import { CMS_NAME } from '../../lib/constants';
import PostHeader from '../../components/post-header';
import PostBody from '../../components/post-body';
import Link from 'next/link';
import CustomLink from '../../components/custom-link';

const Release = ({ code, frontmatter }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <Layout>
      <Head>
        <title>Nebula | {frontmatter.title}</title>
      </Head>
      <Container>
        <section className="flex-col md:flex-row flex items-center md:justify-between pt-8 pb-8 pl-8 pr-8 bg-gray-50 bg-transparent sticky top-0 backdrop-blur">
          <Link href="/releases">
            <h1
              className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 starwars-blue dark:text-red-400"
              style={{ cursor: 'pointer' }}
            >
              {frontmatter.title}
            </h1>
          </Link>

          <Link href="/releases">
            <a className="nav-link text-xl font-regular text-stone-700">
              Releases
            </a>
          </Link>
        </section>
        <section className="flex-col md:flex-row flex items-center md:justify-between pt-8 pb-8 pl-8 pr-8 bg-gray-50 bg-transparent text-gray-500">
          <div className="wrapper">
            <h2
              className="text-xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8 starwars-blue dark:text-red-400 mb-8"
              style={{ cursor: 'pointer' }}
            >
              {frontmatter.excerpt}
            </h2>
            <Component
              components={{
                a: CustomLink,
              }}
            />
          </div>
        </section>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const post = await getSingleRelease(params.slug);
  return {
    props: { ...post },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllReleases().map(({ slug }) => ({
    params: {
      slug: slug.split('/'),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export default Release;
