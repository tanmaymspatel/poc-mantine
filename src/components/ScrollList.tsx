import { useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Badge, Button, Card, Group, Image, Paper, Table, Text, createStyles } from "@mantine/core";
import SingleUser from "./SingleUser";


const useStyle = createStyles((theme) => ({
    head: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.white,
    },
    list: {
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gridGap: "5px",
    },
    list_grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "5px",

        [theme.fn.smallerThan('xl')]: {
            gridTemplateColumns: "repeat(2, 1fr)",
        },
        [theme.fn.smallerThan('md')]: {
            gridTemplateColumns: "repeat(1, 1fr)",
        }
    },
    header_visibility: {
        visibility: "hidden",
        display: "none"
    }
}))


function ScrollList({ userData, currentView, isGridView, fetchNewData, hasMore }: any) {

    const { classes, cx } = useStyle();

    // Helper function that allows finding first element in the view port
    const findFirstElementInViewPort = (elements: any) =>
        Array.prototype.find.call(
            elements,
            element => element.getBoundingClientRect().y >= 85 // nav height offset
        );

    // Ref to the container with elements
    const containerRef = useRef<any>(null);

    // const scrollTo = useMemo(() => {
    //     // Find all elements in container which will be checked if are in view or not
    //     const nodeElements = containerRef.current?.querySelectorAll("[data-item]");
    //     if (nodeElements) {
    //         return findFirstElementInViewPort(nodeElements);
    //     }

    //     return undefined;
    // }, [currentView]);

    // useLayoutEffect(() => {
    //     if (scrollTo) {
    //         // Scroll to element with should be in view after rendering
    //         scrollTo.scrollIntoView();
    //         // Scroll by height of nav
    //         window.scrollBy(0, -85);
    //     }
    // }, [scrollTo, currentView]);

    return (
        <InfiniteScroll
            dataLength={30}
            next={() => { console.log("hello") }}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        // endMessage={<h6>Katam</h6>}
        >
            <Table striped highlightOnHover horizontalSpacing="md" verticalSpacing="md" fontSize="md">
                <thead
                    className={cx(classes.head,
                        { [classes.header_visibility]: isGridView }
                    )}>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>id</th>
                        <th>User id</th>
                        <th>IsCompleted</th>
                    </tr>
                </thead>


                <tbody ref={containerRef} className={isGridView ? classes.list_grid : ""} >
                    {
                        userData?.map((user: any) => (
                            <SingleUser key={user.id} user={user} isGridView={isGridView} />
                        ))
                    }
                </tbody>
            </Table>
        </InfiniteScroll>
    )
}

export default ScrollList;
