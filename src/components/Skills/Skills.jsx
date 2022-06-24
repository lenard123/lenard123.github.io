import { Card, Image, List, Typography } from "antd";

const { Title } = Typography
const language = [
    { label: 'Javascript', logo: '/assets/icons/javascript.svg' },
    { label: 'PHP', logo: '/assets/icons/php.png' },
    { label: 'C#.Net', logo: '/assets/icons/csharp.png' },
    { label: 'CSS3', logo: '/assets/icons/css.png' },
    { label: 'HTML5', logo: '/assets/icons/html5.svg' },
    { label: 'MySQL', logo: '/assets/icons/mysql.png' }
]

const framework = [
    { label: 'ReactJS', logo: '/assets/icons/react.svg' },
    { label: 'VueJs', logo: '/assets/icons/vuejs.svg' },
    { label: 'Laravel', logo: '/assets/icons/laravel.svg' },
    { label: 'AndtD', logo: '/assets/icons/antd.svg' },
    { label: 'Tailwind CSS', logo: '/assets/icons/tailwind.png' },
    { label: 'Firebase', logo: '/assets/icons/firebase.png' },
]

const tools = [
    { label: 'Git', logo: '/assets/icons/git.png' },
    { label: 'Github', logo: '/assets/icons/github.svg' },
]

export default function Skills() {
    return (
        <section id='skills' className="max-w-screen-lg container mx-auto py-16 px-5  min-h-screen ">
            <div className="text-center mb-16">
                <h1 className="text-blue-300 font-black text-4xl">My Skill Set</h1>
                <p className="text-gray-500">Languanges and Frameworks I'm capable of</p>
            </div>

            <div className='grid sm:grid-cols-3 gap-y-4'>
                <Card title={<Title level={4}>Language</Title>}>
                    <List
                        itemLayout="horizontal"
                        dataSource={language}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Image preview={false} height={32} width={32} src={item.logo} />}
                                    title={<div className="ant-typography-h5">{item.label}</div>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
                <Card title={<Title level={4}>Framework / Libraries</Title>}>
                    <List
                        itemLayout="horizontal"
                        dataSource={framework}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Image preview={false} height={32} width={32} src={item.logo} />}
                                    title={<div className="ant-typography-h5">{item.label}</div>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
                <Card title={<Title level={4}>Tools</Title>}>
                    <List
                        itemLayout="horizontal"
                        dataSource={tools}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Image preview={false} height={32} width={32} src={item.logo} />}
                                    title={<div className="ant-typography-h5">{item.label}</div>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>

        </section>
    )
}