'use client'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react';
import Create from './components/create';
import Feed from './components/socialfeed';
import { useUser } from "@clerk/clerk-react";

async function createOrUpdateUser(clerkIdentifier: string, fullName: string | null) {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ clerkIdentifier, fullName }),
  });

  if (!response.ok) {
    console.error('Error creating/updating user');
  }
  console.log(response)
}

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [page, setPage] = useState('create')

  useEffect(() => {
    if (isSignedIn) {
      createOrUpdateUser(user.id, user.fullName);
    }
  }, [isSignedIn, user])

  return (
    <>
      <div className='flex flex-col w-full h-full'>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <a className="btn btn-ghost text-xl text-black">Art Generator</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <div className="join">
              <SignedIn>
                <input className="join-item btn w-auto" type="radio" name="options" aria-label="Art Builder" onClick={() => setPage('create')} />
                <input className="join-item btn w-auto" type="radio" name="options" aria-label="Social Feed" onClick={() => setPage('feed')} />
              </SignedIn>
            </div>
          </div>
          <div className="navbar-end">
            <button className="btn btn-square btn-ghost text-black w-auto px-4">

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>

            </button>
          </div>
        </div>

        <hr className='divider text-black m-0' />
        <SignedIn>
          <div className='flex justify-center items-center h-screen'>
            {page === 'create' ? <Create /> : <Feed />}
          </div>
        </SignedIn>

      </div>
    </>
  );
}