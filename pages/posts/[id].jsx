import React from 'react';
import Navbar from '../../components/Navbar';
import Moment from 'moment';
import Head from 'next/head';

export const getStaticPaths = async () => {
  const res = await fetch(
    'https://beta.mejorconsalud.com/wp-json/mc/v3/posts?orderby=date&order=desc'
  );
  const posts = await res.json();

  const paths = posts.data.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://beta.mejorconsalud.com/wp-json/mc/v3/posts/${params.id}`
  );
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
};

function PagePost({ post }) {
  const imageThumbnail =
    post.featured_media === null
      ? '/no_images.png'
      : post.featured_media.medium_large;
  return (
    <>
      <Head>
        <title>
          Carlos BOYZO OREGON
          {post.metas.title}
        </title>
        <meta name='description' content={post.metas.description} />
        <meta property='og:title' content='The Rock' />
        <meta property='og:type' content={post.metas.description} />
        <meta property='og:url' content='/sss' />
        <meta property='og:image' content={post.metas.image} />
      </Head>
      <div>
        <Navbar />
        <section>
          <div className='container mx-auto px-4'>
            <h1 className='py-4 text-4xl font-bold text-rose-300 text-center'>
              {post.title}
            </h1>
            <picture>
              <img
                src={imageThumbnail}
                alt={post.slug}
                className='rounded-lg w-full h-100'
              />
            </picture>
            <div className='flex flex-col md:flex-row gap-5 py-5'>
              <div className='w-full md:w-1/1'>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
              <div className='w-full md:w-1/4 text-xs'>
                <span>
                  {' '}
                  <strong>Categoria:</strong> {post.categories[0].name}
                </span>
                <p>
                  <span>
                    <strong>Autor:</strong> {post.author?.name}
                  </span>
                </p>

                <span>Ultima Actualizacion :</span>
                {Moment(post.modified).format('DD-MM-YYYY')}

                <div className='contenedor'>
                  <div className='flex flex-col md:flex-row gap-5 justify-center '>
                    <div>
                      {post.author && (
                        <picture>
                          <img
                            className='rounded-lg '
                            src={post.author?.picture}
                            alt={post.author?.name}
                          />
                        </picture>
                      )}
                    </div>
                  </div>
                  <br />
                  <div>
                    <h5>
                      {' '}
                      <strong>Biografia:</strong>{' '}
                      <span> {post.author?.name}</span>{' '}
                    </h5>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: post.author?.description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section></section>
      </div>
    </>
  );
}

export default PagePost;
