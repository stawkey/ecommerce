import React from "react";
import { Layout, Menu, Input } from "antd";

const { Header } = Layout;
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const items = new Array(10).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));

const navbar = () => {
    return (
        <Layout>
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 30px 0 30px",
                    backgroundColor: "grey",
                }}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Elden_Ring_logo_black.svg"
                    width="200"
                    style={{ marginRight: "30px" }}
                />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    items={items}
                    style={{ flex: 1, minWidth: 0, backgroundColor: "grey" }}
                />
                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    enterButton
                    style={{ maxWidth: "250px" }}
                />
            </Header>
        </Layout>
    );
};

// import { ConfigProvider, theme } from "antd";
// <ConfigProvider
//         theme={{
//             algorithm: theme.darkAlgorithm,
//             token: {
//                 colorPrimary: "#000000",
//             },
//         }}
//     >
//         <div className="App">
//             <Navbar />
//         </div>
//     </ConfigProvider>

export default navbar;
