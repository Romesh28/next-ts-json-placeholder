

export const apiRoutes = Object.freeze(
    Object.seal({
        users: (id: number | string = '') => `/users/${id}`,
        albums: (id: number | string = '') => `/albums/${id}`,
        photos: (id: number | string = '') => `/photos/${id}`,
    })
);
