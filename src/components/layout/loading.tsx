import { Spin } from "antd"


const Loading = () => {
    return (
        <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <Spin size="large" />
        </div>
    )
}
export default Loading