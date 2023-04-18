import { MediaQuery, Header, Burger, useMantineTheme, Group, Image, Text, TextInput, ActionIcon } from '@mantine/core';

import addLeave from '../../assets/images/icon-add.svg';
import iconSearch from '../../assets/images/icon-search.svg';
import iconSetting from '../../assets/images/icon-settings.svg';
import iconNotifications from '../../assets/images/icon-notification.svg';
import iconHelp from '../../assets/images/icon-help.svg';
import imageUser from '../../assets/images/image-employee.svg';

function MainHeader({ opened, setOpened }: any) {

    const theme = useMantineTheme();
    return (
        <MediaQuery smallerThan="sm" styles={!opened ? { left: 0 } : {}}>
            <Header height={"70"} p="md" >
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}
                    >
                        <MediaQuery smallerThan="sm" styles={opened ? { display: 'none' } : { display: "block" }}>

                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o: boolean) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                    </MediaQuery>
                    <MediaQuery smallerThan={"sm"} styles={{ justifyContent: "end" }}>
                        <Group position='apart' w={"100%"}>
                            <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                                <Group>
                                    <Text component='a'>
                                        <Image width={32} fit='contain' src={addLeave} alt='add-leave' />
                                    </Text>
                                    <TextInput placeholder="Search Anything" icon={<Image width="sm" fit='contain' src={iconSearch} alt='seach-icon' />} />
                                </Group>
                            </MediaQuery>
                            <Group spacing="md">
                                <ActionIcon>
                                    <Image width={16} fit='contain' src={iconSetting} alt='settings' />
                                </ActionIcon>
                                <ActionIcon>
                                    <Image width={16} fit='contain' src={iconNotifications} alt='notifications' />
                                </ActionIcon>
                                <ActionIcon>
                                    <Image width={16} fit='contain' src={iconHelp} alt='help' />
                                </ActionIcon>
                                <ActionIcon>
                                    <Image width={36} fit='contain' src={imageUser} alt='employee-image' />
                                </ActionIcon>
                            </Group>
                        </Group>
                    </MediaQuery>
                </div>
            </Header>
        </MediaQuery>
    )
}

export default MainHeader
