import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { apiRoutes } from '@constants';
import { IAlbumsDTO, IUsersDTO } from '@interfaces';
import { HTTP } from '@utils/http';
interface IProps {
    user: IUsersDTO;
    albums: IAlbumsDTO[];
}

const UsersId: NextPage<IProps> = ({ user, albums }) => {
    return (
        <>
            <Head>
                <title>Пользователь №{user.id}</title>
            </Head>
            <div className="container mx-auto">
                <h1 className="text-center font-bold text-3xl">Пользователь {user.name}</h1>
                <div>
                    <p>Name: {user.name}</p>
                    <p>User name : {user.username}</p>
                    <p>Email : {user.email}</p>
                    <p>Phone numbers : {user.phone}</p>
                    <p>
                        Website :
                        <Link href={`${user.website}`}>{user.website}</Link>
                    </p>
                    <p>Company : {user.name}</p>
                    <p>
                        Address: st. {user.address.street} city.
                        {user.address.city}
                    </p>
                </div>
                <div className="mt-8">
                    <h1 className="text-xl font-bold">Альбомы</h1>
                        <div className="grid grid-cols-4 gap-5 mt-4">
                            {albums.map((a: IAlbumsDTO, i: number) => (
                                    <Link
                                        href="/albums/[id]"
                                        as={`/albums/${a.id}`}
                                        key={i}
                                    >
                                        <a className="p-5 hover:text-white bg-gray-400 rounded">{a.title}</a>
                                    </Link>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    //["1","2","3","4","5","6","7","8","9","10"]
    const users: IUsersDTO[] = await HTTP.Request('GET', apiRoutes.users());
    const paths = users.map((u: IUsersDTO) => ({
        params: { id: `${u.id}` },
    }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
    const user: IUsersDTO = await HTTP.Request(
        'GET',
        apiRoutes.users(params.id)
    );
    const albums: IAlbumsDTO[] = await HTTP.Request(
        'GET',
        `${apiRoutes.albums()}`,
        {
            userId: params.id,
        }
    );
    return {
        props: {
            user,
            albums,
        },
        revalidate:10
    };
};

export default UsersId;
