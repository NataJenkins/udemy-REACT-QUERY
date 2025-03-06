import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation }) {
    // replace with useQuery

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["comments", post.id],
        queryFn: () => fetchComments(post.id),
    });

    if (isLoading) {
        <h3>Loading...</h3>;
    }
    if (isError) {
        <h3>Error fetching comments: {error.toString()}</h3>;
    }
    return (
        <>
            <h3 style={{ color: "blue" }}>{post.title}</h3>
            <div>
                <button onClick={() => deleteMutation.mutate(post.id)}>
                    Delete
                </button>{" "}
                {deleteMutation.isPending && (
                    <p className="loading">Deleting the post</p>
                )}
                {deleteMutation.isError && (
                    <p className="error">Error deleting the post</p>
                )}
                {deleteMutation.isSuccess && (
                    <p className="success">Post was (not) deleted</p>
                )}
            </div>
            <button>Update title</button>
            <p>{post.body}</p>
            <h4>Comments</h4>
            {data?.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    );
}
