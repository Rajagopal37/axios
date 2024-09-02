import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ name: "", email: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  // Get posts
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log("Get Error", err));
  }, []);

  // Add post
  const addPost = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", newPost)
      .then((res) => {
        setPosts([...posts, res.data]);
        setNewPost({ name: "", email: "" });
      })
      .catch((err) => console.log("Post Error", err));
  };

  // Update post
  const updatePost = () => {
    axios
      .put(
        `https://jsonplaceholder.typicode.com/users/${currentPostId}`,
        newPost
      )
      .then((res) => {
        setPosts(
          posts.map((post) => (post.id === currentPostId ? res.data : post))
        );
        setNewPost({ name: "", email: "" });
        setIsUpdating(false);
        setCurrentPostId(null);
      })
      .catch((err) => console.log("Put Error", err));
  };

  // Delete post
  const deletePost = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((err) => console.log("Delete Error", err));
  };

  const handleSubmit = () => {
    if (isUpdating) {
      updatePost();
    } else {
      addPost();
    }
  };

  const handleEditClick = (post) => {
    setNewPost({ name: post.name, email: post.email });
    setIsUpdating(true);
    setCurrentPostId(post.id);
  };

  return (
    <>
      <div className="d-flex d-flex justify-content-center">
        <div className="bg-gray py-3">
          <div className="container ">
            <h1 className="text-center">AXIOS CRUD OPERATION</h1>
          </div>
        </div>

        <div className="container my-4">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Name"
              value={newPost.name}
              onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
            />
            <label htmlFor="floatingName">Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              value={newPost.email}
              onChange={(e) =>
                setNewPost({ ...newPost, email: e.target.value })
              }
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <button className="btn btn-success mb-3" onClick={handleSubmit}>
            {isUpdating ? "Update Post" : "Add Post"}
          </button>

          <div style={{ height: "400px", overflowY: "scroll" }}>
            <table className="table table-striped table-hover table-borderless mt-4">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Update</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{post.name}</td>
                    <td>{post.email}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditClick(post)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deletePost(post.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
