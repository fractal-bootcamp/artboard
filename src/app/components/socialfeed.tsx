import { Post } from "@prisma/client";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Box } from "./create";

async function getAllPosts() {
    const response = await fetch('/api/getAllPosts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('Error creating/updating user');
    }
    return response.json();
}

function Post({ post }: { post: Post }) {
    return (
        <div className="relative">

            <div className="flex size-96 shadow-lg rounded-2xl items-center justify-center">

                <Canvas style={{ width: '100%', height: '100%' }}>
                    <ambientLight intensity={Math.PI / 2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                    <Box position={[0, 0, 0]} hoverColor={post.color} standardColor='orange' size={post.size} />
                    <OrbitControls />
                </Canvas>
                <div className="absolute bottom-0 left-0 p-2">
                    <p>Created by: {post.userName}</p>
                    <div className="flex flex-row">
                        <button className="">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />

                            </svg>
                        </button>
                        <p> {post.likes}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

function sortedList(posts: Post[]) {
    return posts.sort((a, b) => b.createdAt < a.createdAt ? -1 : 1);
}


export default function Feed() {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getAllPosts().then((data) => {
            setPosts(data)
            console.log("data, ", data);
        })
        console.log(posts);
    }, [])

    return (<div>{sortedList(posts).map((post) => {
        return (
            <Post post={post} />
        )
    })}</div>)

}