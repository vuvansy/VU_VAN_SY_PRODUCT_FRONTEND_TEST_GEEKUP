import { fetchUserPaginationAPI } from '@/services/api';
import { EyeOutlined } from '@ant-design/icons';
import { Avatar, Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const PAGE_SIZE_DEFAULT = 10;

const UserTable = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataUsers, setDataUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);

    const current = parseInt(searchParams.get('current') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || `${PAGE_SIZE_DEFAULT}`, 10);


    useEffect(() => {
        loadUsers((current - 1) * pageSize, current * pageSize);
    }, [current, pageSize]);

    const loadUsers = async (start: number, end: number) => {
        setLoading(true);
        try {
            const res = await fetchUserPaginationAPI(start, end);
            if (res.data) {
                const users = Array.isArray(res.data) ? res.data : [res.data];
                setDataUsers(users);
            }
        } finally {
            setLoading(false);
        }
    };

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Avatar',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) =>
                <Avatar alt={name}
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name ?? '')}&background=0D8ABC&color=fff&rounded=true`}
                />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email: string) => <Link to={`mailto:${email}`}>{email}</Link>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone: string) => <Link to={`tel:${phone}`}>{phone}</Link>,
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            render: (website: string) => <Link to={`https://${website}`} target="_blank" rel="noopener noreferrer">{website}</Link>,
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/users/${record.id}`}>
                        <Button className="!px-[7px] !py-0 !h-[24px]" color="default" variant="outlined">
                            <EyeOutlined /> Show
                        </Button>
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h4 className="text-[20px] font-medium">Users</h4>
            <div className='pt-[12px]'>
                <Table<IUser>
                    rowKey="id"
                    columns={columns}
                    dataSource={dataUsers}
                    loading={loading}
                    pagination={false}
                />

            </div>
        </div>
    )
}
export default UserTable