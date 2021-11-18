import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { apiRoutes } from '@constants';
import { IUsersDTO } from '@interfaces';
import { useAppDispatch, useAppSelector } from '@store';
import { setUsers } from '@slices';
import { shallowEqual } from 'react-redux';
import { HTTP } from '@utils/http';

interface IProps {
    users: IUsersDTO[];
}

const Users: NextPage<IProps> = ({ users: serverUsers }) => {
    const dispatch = useAppDispatch();
    const { users, loading } = useAppSelector(
        (state) => state.users,
        shallowEqual
    );
    useEffect(() => {
        dispatch(setUsers(serverUsers));
    }, [serverUsers, dispatch]);

    return (
        <>
            <Head>
                <title>Пользователи</title>
                <meta
                    name="description"
                    content="Список пользователей сайта typicode.tj"
                />
                <meta name="keywords" content="пользователи , typicode.tj" />
            </Head>
            <div className="container mx-auto">
                <h1 className="text-center font-bold text-3xl">Пользователи</h1>
                <div className="grid grid-cols-5 gap-5 mt-5">
                    {users.map((u: IUsersDTO, i: number) => (
                        <div className="border border-black rounded flex justify-between flex-wrap h-80" key={i}>
                                <div className="w-full text-center font-black">
                                    {u.username}
                                </div>
                                <div className="px-2 h-44">
                                    <p>Tel: {u.phone}</p>
                                    <p>Email: {u.email}</p>
                                    <p>Website: {u.website}</p>
                                    <p>Company: {u.company.name}</p>
                                    <p>
                                        Address: {u.address.city},
                                        {u.address.street}
                                    </p>
                                </div>
                                    <Link
                                        href={`/users/[id]`}
                                        as={`/users/${u.id}`}
                                    >
                                        <a className="p-2 w-full bg-blue-500 flex justify-center items-center text-white rounded-b">
                                            Перейти
                                        </a>
                                    </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            users: await HTTP.Request('GET', apiRoutes.users()),
        },
        revalidate: 10,
    };
};
export default Users;
