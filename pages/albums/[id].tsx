import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { HTTP } from '@utils/http';
import { IAlbumsDTO, IPhotosDTO } from '@interfaces';
import { apiRoutes } from '@constants';
import { ImagePlaceholder } from '@ui-components';

interface IProps {
    album: IAlbumsDTO;
    photos: IPhotosDTO[];
}

const AlbumId: NextPage<IProps> = ({ album, photos }) => {
    return (
        <>
            <Head>
                <title>Альбом №{album.id}</title>
            </Head>
            <div className="container mx-auto">
                <h1 className="text-center font-bold text-3xl">album {album.title}</h1>
                <div>
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
                                        alt={`${photo.id}`}
                                    />
                                    <p>{photo.title}</p>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export const getStaticProps = async ({ params }: any) => {
    const album: IAlbumsDTO = await HTTP.Request(
        'GET',
        apiRoutes.albums(params.id)
    );
    const photos: IPhotosDTO[] = await HTTP.Request('GET', apiRoutes.photos(), {
        albumId: params.id,
    });
    return {
        props: {
            album,
            photos,
        },
        revalidate: 10,
    };
};
export const getStaticPaths = async () => {
    // 1 - 100 ;
    const albums: IAlbumsDTO[] = await HTTP.Request('GET', apiRoutes.albums());
    const paths = albums.map((a: IAlbumsDTO) => ({
        params: { id: `${a.id}` },
    }));
    return {
        paths,
        fallback: false,
    };
};

export default AlbumId;
