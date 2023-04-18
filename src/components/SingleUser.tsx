import { Badge, Button, Card, Group, Image, MediaQuery, Text, createStyles } from '@mantine/core';
import { NavLink, useHref, useNavigate } from 'react-router-dom';
import react, { useEffect, useState, useRef } from 'react';
import { log } from 'console';

const useStyle = createStyles(() => ({
    text_ellipsis: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "300px"
    },

}))

const SingleUser = react.forwardRef(({ user, isGridView, }: any, ref: any) => {

    const { classes } = useStyle();
    const navigate = useNavigate();
    // const [elRef, setelREf] = useState<any>()

    const elementRef = useRef<any>();
    let clickedElement: any;

    const navigateToDetails = (id: number, e: any) => {
        navigate(`${id}`);
        console.log(document.getElementById(`td-${id}`));
        clickedElement = (document.getElementById(`td-${id}`));
        // console.log(clickedElement);
        localStorage.setItem("clickedElement", clickedElement.outerHTML);
        localStorage.setItem("id", JSON.stringify(id));
        localStorage.setItem("isClicked", "yes");
        localStorage.setItem("ypos", (elementRef.current.getBoundingClientRect().y));
    }


    const body = (
        <>
            {!isGridView &&
                <>
                    <td >{user.id}</td>
                    <td ref={elementRef} id={`td-${user.id}`} style={{ cursor: "pointer" }} >{user.title}</td>
                    <td>{user.userId}</td>
                    <td>{user.completed ? "YES" : "NO"}</td>
                </>
            }

            {isGridView &&
                <MediaQuery smallerThan={"sm"} styles={{ display: "block" }}>
                    <td colSpan={5} style={isGridView ? { flexGrow: 1, flexShrink: 1 } : {}}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder >
                            <Image
                                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                height={160}
                                alt="Norway"
                            />

                            <Group position="apart" mt="md" mb="xs">
                                <Text weight={500}>id:{user.id}</Text>
                                <Badge color="pink" variant="light">
                                    User id: {user.userId}
                                </Badge>
                            </Group>

                            <Text size="sm" color="dimmed" className={classes.text_ellipsis}

                                style={{ cursor: "pointer" }}
                            >
                                {user.title}
                            </Text>

                            <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                                IsCompleted: {user.completed ? "YES" : "NO"}
                            </Button>
                        </Card>
                    </td>
                </MediaQuery>
            }
        </>
    )

    const content = ref
        ? <tr ref={ref} data-item="true" style={isGridView ? { display: "flex" } : {}} onClick={(e) => navigateToDetails(user?.id, e)}>{body}</tr>
        : <tr data-item="true" style={isGridView ? { display: "flex" } : {}} onClick={(e) => navigateToDetails(user?.id, e)}>{body}</tr>

    return content
})

export default SingleUser
