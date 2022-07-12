
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../img/logo.svg';

const Navbar = () => {

  return (
    <>
      <div className='relative bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='flex justify-between items-center   py-6 md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <Link href='/'>
                
                <a >
                <Image
                  className='h-8 w-auto sm:h-10 cursor-pointer'
                  src={Logo}
                  alt='logo'
                  width={270}
                  height={48}
                />
               </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
