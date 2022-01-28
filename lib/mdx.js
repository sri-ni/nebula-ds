import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import getAllFilesRecursively from './files';

export const RELEASES_PATH = path.join(process.cwd(), '_releases');

export const getSourceOfFile = (fileName) => {
  return fs.readFileSync(path.join(RELEASES_PATH, fileName));
};

export const getAllReleases = () => {
  const files = getAllFilesRecursively(RELEASES_PATH);

  return files
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      fileName = fileName.split('/_releases/')[1];
      const source = getSourceOfFile(fileName);
      const slug = fileName.replace(/\.mdx?$/, '');
      const { data } = matter(source);

      return {
        frontmatter: data,
        slug: slug,
      };
    });
};

export const getSingleRelease = async (slug) => {
  if (typeof slug === 'object') {
    slug = slug.join('/');
  }

  const source = getSourceOfFile(slug + '.mdx');
  const { code, frontmatter } = await bundleMDX({
    source: source.toString(),
    cwd: RELEASES_PATH,
  });

  return {
    frontmatter,
    code,
  };
};
