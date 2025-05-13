import axios from 'services/axios.customize';

export const fetchAlbumsAPI = (start: number, end: number) => {
    const urlBackend = `/albums?_start=${start}&_end=${end}`;
    return axios.get<IBackendRes<IAlbum>>(urlBackend);
};

export const getAlbumsByIdAPI = (id: number) => {
    const urlBackend = `/albums/${id}`;
    return axios.get<IBackendRes<IAlbum>>(urlBackend)
}

export const getUserByIdAPI = (id: number) => {
    const urlBackend = `/users/${id}`;
    return axios.get<IBackendRes<IUser>>(urlBackend)
}

export const getAlbumsByIdUserAPI = (start: number, end: number ,id: number) => {
    const urlBackend = `/albums?_start=${start}&_end=${end}&userId=${id}`;
    return axios.get<IBackendRes<IAlbum>>(urlBackend)
}

export const fetchUsersAPI = () => {
    const urlBackend = "/users";
    return axios.get<IBackendRes<IUser>>(urlBackend)
}

export const fetchThumbnailUrlAlbumIdAPI = (start: number, end: number, id: number) => {
    const urlBackend = `/photos?_start=${start}&_end=${end}&userId=${id}`;
    return axios.get<IBackendRes<IPhoto>>(urlBackend)
}

export const fetchUserPaginationAPI = (start: number, end: number) => {
    const urlBackend = `/users?_start=${start}&_end=${end}`;
    return axios.get<IBackendRes<IUser>>(urlBackend);
};

