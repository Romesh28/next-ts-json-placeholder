import { NextPage } from 'next';
import Link from 'next/link';
const NotFound: NextPage = () => {
    return (
        <div className="flex w-full min-h-screen justify-center items-center">
            <div>
                <h1 className="text-red-600 text-6xl font-bold text-center">404</h1>
                <h2 className="font-normal">Страница не найдена.</h2>
                <Link href="/">
                    <a className="text-center mt-8 text-blue-600 underline">На главную страницу.</a>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
