import { useState } from 'react';
import { Navbar, Center, Tooltip, createStyles, Stack, rem, Image, Text, MediaQuery } from '@mantine/core';
import { NavLink } from 'react-router-dom'

import logo1R from '../../assets/images/1R-logo.svg'

const useStyles = createStyles((theme) => ({
    link: {
        width: "100%",
        height: rem(50),
        borderRadius: theme.radius.sm,
        fontSize: "20px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.white,
        opacity: 0.5,
        borderLeft: `2px solid transparent`,
        cursor: "pointer",
        transition: "0.2s all",
        textDecoration: "none",
        '&:hover': {
            borderLeft: `2px solid ${theme.white}`,
            opacity: 1,
        },
        [theme.fn.smallerThan('sm')]: {
            justifyContent: "start",
            paddingLeft: "70px"
        }
    },

    active: {
        opacity: 1,
        borderLeft: `2px solid ${theme.white}`,
        [theme.fn.smallerThan('sm')]: {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
                0.1
            ),
        }
    },
    imageContainer: {
        [theme.fn.smallerThan('sm')]: {
            justifyContent: "start",
            paddingLeft: "70px"
        }
    }
}));

interface NavbarLinkProps {
    icon: string;
    label: string;
    active?: boolean;
    onClick?(): void;
}

function NavbarLink({ icon, label, active, onClick }: NavbarLinkProps) {
    const { classes, cx } = useStyles();
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <NavLink to={`/${label.toLowerCase()}`} onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                <Text component="span" className={icon}></Text>
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Text ml="lg">{label}</Text>
                </MediaQuery>
            </NavLink>
        </Tooltip>
    );
}

const mockdata = [
    { icon: "icon-dashboard", label: 'Dashboard' },
    { icon: "icon-projects", label: 'Projects' },
    { icon: "icon-team", label: 'Teams' },
    { icon: "icon-organization", label: 'Organization' },
    { icon: "icon-reimbursement", label: 'Reimbursement' },
    { icon: "icon-finance", label: 'Finance' },
];

function MainNavbar() {
    const [active, setActive] = useState(0);
    const { classes } = useStyles();

    const links = mockdata.map((link: any, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => setActive(index)}
        />
    ));

    return (
        <Stack
            h={"100%"}
            w={"100%"}
            p={0}
            spacing={0}
            sx={(theme) => ({
                backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
                    .background,
            })}
        >
            <Center p="md" className={classes.imageContainer}>
                <Image width={32} fit='contain' src={logo1R} alt='1R-logo' />
            </Center>
            <Navbar.Section grow mt={50}>
                <Stack spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>
        </Stack>
    );
}

export default MainNavbar;