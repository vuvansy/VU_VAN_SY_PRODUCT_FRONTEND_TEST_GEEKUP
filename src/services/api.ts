import axios from 'services/axios.customize';

export const fetchAlbumsAPI = (start: number, end: number) => {
    const urlBackend = `/albums?_start=${start}&_end=${end}`;
    return axios.get<IBackendRes<IAlbum[]>>(urlBackend);
};

export const fetchUsersAPI = () => {
    const urlBackend = "/users";
    return axios.get<IBackendRes<IUser>>(urlBackend)
}