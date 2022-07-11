import Link from 'next/link';
import Navbar from '../components/Navbar';

const defaultEnpoint =
  'https://beta.mejorconsalud.com/wp-json/mc/v3/posts?orderby=date&order=desc';

export async function getServerSideProps() {
  const res = await fetch(defaultEnpoint);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  console.log(data);
  const { posts = [] } = data;

  return (
    <>
      <Navbar />
      <main className='shadow-md h-80 flex justify-center items-center'>
        <h1 className='  text-3xl font-bold '>Hello world!</h1>
      </main>
      <section className='py-4 flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold'>Articulos más relevantes</h2>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/post/${post.id}`}>
                  <p>{post.pages}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
