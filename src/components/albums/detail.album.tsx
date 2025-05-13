import { getAlbumsByIdAPI, getUserByIdAPI } from "@/services/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined, ProfileOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Card, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from "components/layout/loading";

const DetailAlbums = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dataAlbums, setDataAlbums] = useState<IAlbum | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            loadAlbumsById(Number(id));
        }
    }, [id]);

    const loadAlbumsById = async (id: number) => {
        setLoading(true);
        try {
            const res = await getAlbumsByIdAPI(id);
            if (res.data) {
                setDataAlbums(res.data);
                const userId = res.data.userId;
                if (userId) {
                    const userRes = await getUserByIdAPI(userId);
                    if (userRes.data) {
                        setUser(userRes.data);
                    }
                }
            }
        } catch (error) {
            console.error("Error loading album data", error);
        } finally {
            setLoading(false);
        }
    };
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div>
            {loading &&
                <Loading/>
            }

            {dataAlbums && (
                <>
                    <Breadcrumb
                        items={[
                            {
                                href: '/albums',
                                title: (
                                    <>
                                        <ProfileOutlined />
                                        <span>Albums</span>
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
                            <h4 className="text-[20px] font-medium">Show Album</h4>
                        </span>
                    </div>
                    <div className="pt-[12px]">
                        <Card >
                            <Card >
                                <div className="flex gap-[16px]">
                                    <div>
                                        <Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? '')}&background=0D8ABC&color=fff&rounded=true`} />
                                    </div>
                                    <div className="flex flex-col">
                                        <Link to={`/users/${user?.id}`} className="text-[16px] mb-[8px] font-medium">{user?.name}</Link>
                                        <a className="cursor-pointer">{user?.email}</a>
                                    </div>
                                </div>
                                <Divider />
                                <h4 className="text-[20px] font-medium">{dataAlbums.title}</h4>
                            </Card>
                        </Card>
                    </div>

                </>

            )}
        </div>
    )
}

export default DetailAlbums