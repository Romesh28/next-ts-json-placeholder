import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Главная страница</title>
            </Head>
            <div className="container mx-auto">
                <h1 className="text-center text-3xl font-bold">HOME PAGE</h1>
                <p>
                    <Link href="/users">
                        <a className="text-blue-600">Пользователи</a>
                    </Link>
                </p>
                <p>
                    <Link href="/albums">
                        <a className="text-blue-600">Альбомы</a>
                    </Link>
                </p>
                <p>
                    <Link href="/photos">
                        <a className="text-blue-600">Фотографии</a>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Home;
