import { ReactNode, useEffect, useState } from "react";
import { get } from "./utils/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  title: string;
  body: string;
  uderId: number;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();
  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts"
        )) as RawDataBlogPost[];

        const blogPosts: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchedPosts(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError("Failed to fetch posts: " + error.message);
        } else {
          setError("Failed to fetch posts");
        }
      }
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  let content: ReactNode;
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  if (isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>;
  }

  if (error) {
    content = <ErrorMessage text={error} />;
  }

  return (
    <main>
      <img src={fetchingImg} alt="image for fetching" />
      {content}
    </main>
  );
}

export default App;
