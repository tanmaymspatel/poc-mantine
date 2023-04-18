import { useCallback, useLayoutEffect, useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query'

import { Table, createStyles } from "@mantine/core";
import SingleUser from "./SingleUser";
import scrollServices from "../shared/services/scrollServices";
import { log } from "console";

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


function ScrollList({ userData, currentView, isGridView }: any) {

    const { classes, cx } = useStyle();
    const { getUsers } = scrollServices;
    const [a, setA] = useState<any>()


    const {
        fetchNextPage, //function 
        hasNextPage, // boolean
        isFetchingNextPage, // boolean
        data,
        status,
        error
    } = useInfiniteQuery('/users', ({ pageParam = 1 }) => getUsers(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length + 1 : undefined
        }
    })

    const intObserver = useRef<any>()
    const lastPostRef = useCallback((user: any) => {
        if (isFetchingNextPage) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(users => {
            if (users[0].isIntersecting && hasNextPage) {
                fetchNextPage()
            }
        })

        if (user) intObserver.current.observe(user)
    }, [isFetchingNextPage, fetchNextPage, hasNextPage])

    // if (status === 'error') return <p className='center'>Error: {error.message}</p>

    // Helper function that allows finding first element in the view port
    const findFirstElementInViewPort = (elements: any) =>
        Array.prototype.find.call(
            elements,
            element => element.getBoundingClientRect().y >= 150 // header offset
        );

    // Ref to the container with elements
    const containerRef = useRef<any>(null);

    const scrollTo = useMemo(() => {
        // Find all elements in container which will be checked if are in view or not
        const nodeElements = containerRef.current?.querySelectorAll("[data-item]");

        if (nodeElements) {
            return findFirstElementInViewPort(nodeElements);
        }

        return undefined;
    }, [currentView]);

    useLayoutEffect(() => {
        if (scrollTo) {
            // Scroll to element with should be in view after rendering
            scrollTo.scrollIntoView();
            // Scroll by height of header
            window.scrollBy(0, -150);
        }
    }, [scrollTo, currentView]);


    const content = data?.pages?.map((pg) => {
        return pg.map((user: any, index: number) => {
            if (pg.length === index + 1) {
                return <SingleUser ref={lastPostRef} key={user.id} user={user} isGridView={isGridView} />
            }
            return <SingleUser key={user.id} user={user} isGridView={isGridView} />
        })
    })


    const getEl = () => {
        let id = (parseInt(localStorage.getItem("id") as string));
        id--;
        const isClicked = localStorage.getItem("isClicked") as string
        if (isClicked === "yes") document.getElementById(`td-${id}`)?.scrollIntoView();
    }

    useEffect(() => {
        getEl()
    }, [getEl])



    return (
        <>
            <Table striped highlightOnHover horizontalSpacing="md" verticalSpacing="md" fontSize="md">
                <thead
                    className={cx(classes.head,
                        { [classes.header_visibility]: isGridView }
                    )}>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>User id</th>
                        <th>IsCompleted</th>
                    </tr>
                </thead>

                <tbody ref={containerRef} className={isGridView ? classes.list_grid : ""} >
                    {content}
                </tbody>
            </Table>
            {/* <div ref={containerRef}>
        </div> */}
        </>
    )
}

export default ScrollList;
