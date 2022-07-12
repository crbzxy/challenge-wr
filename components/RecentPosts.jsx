import { data } from 'autoprefixer';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const RecentPosts = () => {
  // use state to store the data
  const [posts, setPosts] = useState([]);

  //make a request to the API for most recent posts
  const fetchPosts = () => {
    fetch(
      'https://beta.mejorconsalud.com/wp-json/mc/v3/posts?orderby=date&order=desc'
    )
      .then((res) => res.json())
      .then((data) => setPosts(data.data));
  };
  // use effect to fetch the data
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <section className='bg-cyan-600 text-white min-h-screen flex flex-col p-7 items-center justify-center'>
        <h2 className=' py-6 text-4xl font-bold text-center mb-3 '>
          Más relevantes
        </h2>
        <div className='grid lg:grid-cols-3  gap-6 grid-flow-row-dense sm:grid-cols-1 '>
          {posts.map((post) => {
            console.log(post);
            const imageThumbnail =
              post.featured_media === null
                ? '/no_images.png'
                : post.featured_media.medium;

            const { title, excerpt, link } = post;
            return (
              <Link href={`/posts/${post.id}`} passHref key={post.id}>
                <div className=' hover:cursor-pointer flex flex-col'>
                  <Image
                    src={imageThumbnail}
                    // src={post.featured_media.thumbnail}
                    alt={post.slug}
                    height={300}
                    width={150}
                    className={'image rounded-lg'}
                  />
                  <h3 className='hover:text-cyan-300 hover:cursor-pointer titulos'>
                    {title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default RecentPosts;
