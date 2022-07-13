import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import RecentPosts from '../components/RecentPosts';
import Search from '../components/Search';

export default function Home() {
  return (
    <>
      <Head>
      <title>Prueba - Carlos BOYZO OREGON</title>

        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Prueba Carlos Boyzo ' />
        <meta name='keywords' content='next, example, cosumo api, salud' />
        <meta name='author' content='Carlos BOYZO OREGON' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Navbar />
      <main className='shadow-md h-80 flex justify-center items-center flex-col'>
        <h1 className='text-4xl text-cyan-600'>
          Mejor con salud siempre contigo
        </h1>
        <Search />
      </main>
      <RecentPosts />
      <Footer />
    </>
  );
}
