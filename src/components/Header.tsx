import { Switch } from '@mantine/core'
import { useCallback } from 'react';

function Header({ setCurrentView, isGridView }: any) {

    const changeListView = useCallback(() => {
        setCurrentView((prev: any) => prev === 'list' ? "grid" : "list");
    }, [setCurrentView])

    return (
        <Switch
            onLabel="Grid"
            offLabel="List"
            size='lg'
            onChange={changeListView}
            checked={isGridView}
        />
    )
}

export default Header;
