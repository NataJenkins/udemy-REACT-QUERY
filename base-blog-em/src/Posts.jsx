import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null);

    // replace with useQuery
    const { data, isError, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if (isLoading) {
        return <h3>Loading...</h3>;
    }
    if (isError) {
        return (
            <h3>
                Error fetching posts Error: <p>{error.toString()}</p>
            </h3>
        );
    }
    return (
        <>
            <ul>
                {data?.map((post) => (
                    <li
                        key={post.id}
                        className="post-title"
                        onClick={() => setSelectedPost(post)}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button disabled onClick={() => {}}>
                    Previous page
                </button>
                <span>Page {currentPage + 1}</span>
                <button disabled onClick={() => {}}>
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && <PostDetail post={selectedPost} />}
        </>
    );
}
