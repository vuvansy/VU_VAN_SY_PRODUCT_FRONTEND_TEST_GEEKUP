import { fetchAlbumsAPI, fetchUsersAPI } from '@/services/api';
import { EyeOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { TablePaginationConfig } from 'antd/es/table';

const PAGE_SIZE_DEFAULT = 10;
const TOTAL_ALBUMS = 100;

const AlbumTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataAlbums, setDataAlbums] = useState<IAlbum[]>([]);
    const [dataUsers, setDataUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);

    const current = parseInt(searchParams.get('current') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || `${PAGE_SIZE_DEFAULT}`, 10);

    useEffect(() => {
        const currentParam = searchParams.get('current');
        const pageSizeParam = searchParams.get('pageSize');

        if (!currentParam || !pageSizeParam) {
            setSearchParams({
                current: currentParam || '1',
                pageSize: pageSizeParam || `${PAGE_SIZE_DEFAULT}`,
            });
        }
    }, []);

    useEffect(() => {
        loadAlbums((current - 1) * pageSize, current * pageSize);
    }, [current, pageSize]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadAlbums = async (start: number, end: number) => {
        setLoading(true);
        try {
            const res = await fetchAlbumsAPI(start, end);
            if (res.data) {
                const albums = Array.isArray(res.data) ? res.data : [res.data];
                setDataAlbums(albums);
            }
        } finally {
            setLoading(false);
        }
    };

    const loadUsers = async () => {
        const res = await fetchUsersAPI();
        if (res.data) {
            const users = Array.isArray(res.data) ? res.data : [res.data];
            setDataUsers(users);
        }
    };

    const handleTableChange = (pagination: TablePaginationConfig) => {
        setSearchParams({
            current: String(pagination.current),
            pageSize: String(pagination.pageSize),
        });
    };

    const columns: TableProps<IAlbum>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '60%',
        },
        {
            title: 'User',
            dataIndex: 'userId',
            key: 'userId',
            width: '22%',
            render: (userId: number) => {
                const user = dataUsers.find((u) => u.id === userId);
                if (!user) return 'Unknown';

                // const initials = user.name
                //     .split(' ')
                //     .map((word) => word[0])
                //     .join('')
                //     .toUpperCase();
                // const color = getAvatarColor(user.id);
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                )}&background=0D8ABC&color=fff&rounded=true`;


                return (
                    // <Link to={`/users/${user.id}`} className="cursor-pointer">
                    //     <Space size="middle">
                    //         <Avatar style={{ backgroundColor: color, color: '#000' }}>
                    //             {initials}
                    //         </Avatar>
                    //         {user.name}
                    //     </Space>
                    // </Link>
                    <Link to={`/users/${user.id}`} className="cursor-pointer">
                        <Space size="middle">
                            <Avatar src={avatarUrl} />
                            {user.name}
                        </Space>
                    </Link>
                );
            },
        },
        {
            title: 'Actions',
            key: 'action',
            width: '13%',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/albums/${record.id}`}>
                        <Button className="!px-[7px] !py-0 !h-[24px]" color="default" variant="outlined">
                            <EyeOutlined /> Show
                        </Button>
                    </Link>
                </Space>
            ),
        },
    ];

    // const getAvatarColor = (id: number): string => {
    //     const colors = [
    //         '#f56a00',
    //         '#7265e6',
    //         '#ffbf00',
    //         '#00a2ae',
    //         '#1890ff',
    //         '#87d068',
    //         '#f5222d',
    //     ];

    //     let hash = id;
    //     for (let i = 0; i < 10; i++) {
    //         hash = (hash << 5) - hash + (id % 256);
    //     }

    //     const index = Math.abs(hash) % colors.length;
    //     return colors[index];
    // };

    return (
        <Table<IAlbum>
            rowKey="id"
            columns={columns}
            dataSource={dataAlbums}
            loading={loading}
            pagination={{
                current,
                pageSize,
                total: TOTAL_ALBUMS,
                showSizeChanger: true,
            }}
            onChange={handleTableChange}
        />
    );
};

export default AlbumTable;
