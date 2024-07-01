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
        <div className="flex size-96 shadow-lg rounded-2xl items-center justify-center">
            <Canvas style={{ width: '100%', height: '100%' }}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Box position={[0, 0, 0]} hoverColor={post.color} standardColor='orange' size={post.size} />
                <OrbitControls />
            </Canvas>
        </div>
    )
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

    return (<div>{posts.map((post) => {
        return (
            <Post post={post} />
        )
    })}</div>)

}