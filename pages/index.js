import Link from 'next/link';
import Navbar from '../components/Navbar';
import RecentPosts from '../components/RecentPosts';
import Search from '../components/Search';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className='shadow-md h-80 flex justify-center items-center'>
        <Search />
      </main>
      <RecentPosts />
    </>
  );
}
