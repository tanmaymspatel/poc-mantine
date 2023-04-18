import { Stack, createStyles } from '@mantine/core'
import scrollServices from '../shared/services/scrollServices'
import { useEffect, useState } from 'react';
import ScrollList from './ScrollList';
import Header from './Header';

const useStyle = createStyles(() => ({
    header: {
        flex: "0 0 50px",
        maxHeight: "50px",
    },
    main: {
        flexGrow: 1,
        overflow: "auto"
    }
}))

function MainView() {

    const [currentView, setCurrentView] = useState("list");
    const { classes } = useStyle();
    const { getAllUsers } = scrollServices;
    const [userData, setUserData] = useState();

    const isGridView = currentView === "grid";

    useEffect(() => {
        getAllUsers().then(res => setUserData(res.data))
    }, [])
    return (
        <Stack h={"100%"} spacing={0}>
            <header className={classes.header}>
                <Header setCurrentView={setCurrentView} isGridView={isGridView} />
            </header>
            <main className={classes.main}>
                <ScrollList userData={userData} currentView={currentView} isGridView={isGridView} />
            </main>
        </Stack>
    )
}

export default MainView
