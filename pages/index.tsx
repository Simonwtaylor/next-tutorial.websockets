import * as React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const useSocket = (url: string) => {
  let socket: any;

  React.useEffect(() => {
    const socketObj = new WebSocket(url);

    socket = socketObj;

    const cleanUp = () => {
      socketObj.close();
    };

    return cleanUp;
  }, []);

  return socket;
};

const IndexPage = () => {
  const socket = useSocket("ws://localhost:8080/ws");

  React.useEffect(() => {
    if (socket) {
      socket.onmessage = (data: any) => {
        console.log(data);
      };
    }
  }, [socket]);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
}

export default IndexPage
