import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { apiRoutes } from '@constants';
import { IPhotosDTO } from '@interfaces';
import { useAppDispatch, useAppSelector } from '@store';
import { shallowEqual } from 'react-redux';
import { useEffect } from 'react';
import { setPhotos } from '@slices';
import { ImagePlaceholder } from '@ui-components';
import { HTTP } from '@utils/http';

interface IProps {
    photos: IPhotosDTO[];
}

const Photos: NextPage<IProps> = ({ photos: serverPhotos }) => {
    const dispatch = useAppDispatch();
    const { photos } = useAppSelector(
        (state) => state.photos,
        shallowEqual
    );

    useEffect(() => {
        dispatch(setPhotos(serverPhotos));
    }, [dispatch, serverPhotos]);

    return (
        <>
            <Head>
                <title>Фотографии</title>
            </Head>
                <div className="container mx-auto">
                    <h1 className="text-center font-bold text-3xl">Фотографии</h1>
                    <nav className="mt-5">
                        <ul className="grid grid-cols-4 gap-5">
                            {photos.map((photo: IPhotosDTO, i: number) => (
                                <li
                                    key={i}
                                    className="text-center"
                                >
                                    <Image
                                        loader={() => `${photo.url}`}
                                        src={photo.url}
                                        width={200}
                                        height={200}
                                        unoptimized
                                        placeholder="blur"
                                        blurDataURL={ImagePlaceholder(200, 200)}
                                        alt={`photo id= ${photo.id}`}
                                    />
                                    <p className="text-center">{photo.title}</p>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const photos: IPhotosDTO[] = await HTTP.Request('GET', apiRoutes.photos());
    return {
        props: {
            photos,
        },
        revalidate: 10,
    };
};

export default Photos;
