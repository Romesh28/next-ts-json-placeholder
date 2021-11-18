import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { HTTP } from '@utils/http';
import { apiRoutes } from '@constants';
import { IAlbumsDTO } from '@interfaces';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store';
import { setAlbums } from '@slices';
import { shallowEqual } from 'react-redux';

interface IProps {
    albums: IAlbumsDTO[];
}

const Albums: NextPage<IProps> = ({ albums: serverAlbums }) => {
    const dispatch = useAppDispatch();
    const { albums, loading } = useAppSelector(
        (state) => state.albums,
        shallowEqual
    );
    useEffect(() => {
        dispatch(setAlbums(serverAlbums));
    }, [dispatch, serverAlbums]);

    if (loading) {
        return <p>Загрузка...</p>;
    } else {
        return (
            <>
                <Head>
                    <title>Альбомы</title>
                </Head>
                <div className="container mx-auto">
                    <h1 className="text-center font-bold text-3xl">Albums page</h1>
                    <div className="grid grid-cols-4 gap-5 mt-5">
                        {albums.map((album: IAlbumsDTO, i: number) => (
                            <Link
                                href="/albums/[id]"
                                as={`/albums/${album.id}`}
                                key={i}
                            >
                              <a className="p-2 rounded bg-gray-400 h-16 hover:bg-gray-600 hover:text-white flex justify-center items-center">
                                 {album.title}
                              </a>
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        );
    }
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            albums: await HTTP.Request('GET', apiRoutes.albums()),
        },
        revalidate: 10,
    };
};

export default Albums;
