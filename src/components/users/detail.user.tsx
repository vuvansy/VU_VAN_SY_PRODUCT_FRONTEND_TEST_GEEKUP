import { getAlbumsByIdUserAPI, getUserByIdAPI } from "@/services/api";
import { ArrowLeftOutlined, EyeOutlined, SolutionOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Card, Divider } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Space, Table } from 'antd';
import type { TableProps } from 'antd';
import Loading from "components/layout/loading";


const UserAlbumsDetail = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [dataAlbumsByIdUser, setDataAlbumsByIdUser] = useState<IAlbum[]>([]);

    const loadUser = async (id: number) => {
        try {
            const res = await getUserByIdAPI(id);
            if (res?.data) setUser(res.data);
        } catch (err) {
            console.error("Error loading user:", err);
        }
    };

    const loadAlbumsByIdUser = async (start: number, end: number, id: number) => {
        setLoading(true);
        try {
            const res = await getAlbumsByIdUserAPI(start, end, id);
            if (res.data) {
                const albums = Array.isArray(res.data) ? res.data : [res.data];
                setDataAlbumsByIdUser(albums);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            const userId = parseInt(id, 10);
            loadUser(userId);
            loadAlbumsByIdUser(0, 10, userId);
        }
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const columns: TableProps<IAlbum>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '12%',
        },

        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '66%',
        },

        {
            title: 'Actions',
            key: 'action',
            width: '22%',
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


    return (
        <div>
            {loading &&
                <Loading />
            }

            {user && (
                <>
                    <Breadcrumb
                        items={[
                            {
                                href: '/users',
                                title: (
                                    <>
                                        <SolutionOutlined />
                                        <span>Users</span>
                                    </>
                                ),
                            },
                            {
                                title: 'Show',
                            },
                        ]}
                    />
                    <div className="flex items-center my-[4px]">
                        <div className="!pr-[16px]">
                            <Button type="text" className="w-[32px]" onClick={handleBack}>
                                <ArrowLeftOutlined className="text-[16px]" />
                            </Button>
                        </div>

                        <span>
                            <h4 className="text-[20px] font-medium">Show User</h4>
                        </span>
                    </div>
                    <div className="pt-[12px]">
                        <Card >
                            <Card >
                                <div className="flex gap-[16px]">
                                    <div>
                                        <Avatar alt={user?.name} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? '')}&background=0D8ABC&color=fff&rounded=true`} />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-[16px] mb-[8px] font-medium">{user.name}</p>
                                        <Link to={`mailto:${user?.email}`}>{user?.email}</Link>
                                    </div>
                                </div>
                                <Divider />
                                <h4 className="mb-[10px] text-[20px] font-medium">Albums</h4>
                                <Table<IAlbum>
                                    rowKey="id"
                                    loading={loading}
                                    columns={columns}
                                    dataSource={dataAlbumsByIdUser}
                                    pagination={false} />
                            </Card>
                        </Card>
                    </div>

                </>

            )}
        </div>
    )
}
export default UserAlbumsDetail