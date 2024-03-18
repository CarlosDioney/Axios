'use client'
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () =>{
  const [posts, setPosts] = useState([]);
  const api='https://jsonplaceholder.typicode.com/posts';
  useEffect(()=>{
    const getPosts = async()=>{
      const { data: res } = await axios.get(api).catch(function (error) {
        if (error.response) {
          // La respuesta fue hecha y el servidor respondió con un código de estado que esta fuera del rango 
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          console.log(error.request);
        } else {
          // Algo paso al preparar la petición que lanzo un Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
      setPosts(res)
    };
    getPosts();
  }, [] );

  const addPost = async () =>{
    const post = {title: "Nuevo Post", body: "new"};
    await axios.post(api, post);
    setPosts([post, ...posts]);
  };
  
  const updatedPost = async (post) =>{
    post.title = 'titulo actualizado';
    await axios.put(api + '/' + post.id);
    const postsClone = [...posts];
    const index = postsClone.indexOf(post);
    postsClone[index] = {...post};
    setPosts(postsClone);
  };
  const deletePost = async (post) =>{
    await axios.delete(api + '/' + post.id + post);
    setPosts(posts.filter(p=> p.id !== post.id));
  };

  return (<>
  <div className="container">
    <h2> There are {posts.length} post in the database</h2>
    <button onClick={addPost} className='btn btn-primary'>Agregar</button>
    <table className='table'>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Actualizar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) =>(
          <tr key={post.id}>
            <td>{post.title}</td>
            <td>
              <button onClick={() => updatedPost(post)} className='btn btn-info btn-sm'>Actualizar</button>
            </td>
            <td>
              <button onClick={()=> deletePost(post)} className='btn btn-danger btn-sm'>Eliminar</button>
            </td>
          </tr>
        )
          )}
      </tbody>
    </table>
  </div>
  </>);
}
export default Home;