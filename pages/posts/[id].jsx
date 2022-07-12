import React from 'react'
import Navbar from '../../components/Navbar'
import Moment from "moment";
export const getStaticPaths = async () => {
  const res = await fetch('https://beta.mejorconsalud.com/wp-json/mc/v3/posts?orderby=date&order=desc')
  const posts = await res.json()
 
  const paths = posts.data.map(post => ({
    params: {
      id: post.id.toString()
    }
  }))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`https://beta.mejorconsalud.com/wp-json/mc/v3/posts/${params.id}`)
  const post = await res.json()
  return {
    props: {
      post
    }
  }
}


function PagePost({post} ) {
  return (

    <div >
      <Navbar   />
      <section>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold">{post.title}</h1>
              <span> Categoria: {post.categories[0].name}</span>
              <p><div>Autor: {post.author?.name}</div></p>
              
             
              <span >Ultima Actualizacion :</span>
              {Moment(post.modified).format("DD-MM-YYYY")}
              <picture>
              <img src={post.featured_media.thumbnail} alt={post.slug} className="rounded-lg w-full h-100" />
              </picture>
            </div>
            <div className="w-full md:w-1/2">
              
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </div>
     </section>

    </div>
  )
}

export default PagePost