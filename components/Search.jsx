import { useMemo, useRef, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import Link from 'next/link';

const AutocompleteItem = ({ id, title, excerpt }) => {
  return (
   
      
    <li className='text-left' key={id}>
      <Link href={`/posts/${id}`}>
        <a className='hover:bg-blue-300 flex gap-1 p-5'>
          
          
            <div><p className=' text text-sm font-semibold'>{title}</p>
            <p className='text-xs text-gray-600'>{excerpt}</p></div>
         
        </a>
      </Link>
    </li>
    
    
  );
};

export default function Search(props) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Busca un articulo sobre salud',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'data',
            getItems: ({ query }) => {
              if (!!query) {
                return fetch(
                  `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?search=${query}&page=1&orderby=relevance`
                ).then((res) => res.json());
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <div className='flex flex-col w-full justify-center text-center'>
      
<form
      ref={formRef}
      className='flex w-full justify-center mb-20 sm:mb-0 sm:min-w-full '
      {...formProps}>
      <div className='flex relative p-1  bg-gradient-to-tr from-cyan-600 to-pink-300 rounded-full w-5/6 lg:w-3/6 '>
          <input
            
          type={'text'}
          ref={inputRef}
          className=' text-center flex-1 p-2 pl-4 rounded-full w-full'
          {...inputProps}
        />
        {autocompleteState.isOpen && (
          <div
            className='absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10'
            ref={panelRef}
            {...autocomplete.getPanelProps()}>
            {autocompleteState.collections.map((collection, index) => {
              const { items } = collection;
              console.log({ items });
              return (
                <section key={`${index}`}>
                  <h2 className='text-sm font-bold text-center mb-3'>
                  Resultados {items[0].pages}
                  </h2>
                  {items[0].pages >= 0 && (
                    <ul {...autocomplete.getListProps()}>
                      
                      {items[0].data.map((item) => (
                        <AutocompleteItem key={item.id}
                          
                          {...item} />
                      ))}
                    </ul>
                  )}
                  {items[0].pages === 0  &&(
                    <p className='text-center text-gray-600 p-4 w-full'>
                     ¡No hay artículos relacionados con el término de búsqueda!
                    </p>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </form>

    </div>
  );
}
