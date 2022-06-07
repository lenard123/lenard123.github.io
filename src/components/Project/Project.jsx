import { FolderOutlined, GithubOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

const ProjectCard = ({ title, description, tags, links }) => {
    return (
        <div className="shadow-lg bg-[#112240] p-6 rounded flex flex-col">
            <div className='flex justify-between'>
                <FolderOutlined className='text-2xl text-green-500' />

                <div className='flex gap-2 items-center'>
                    {links?.github &&
                        <a href={links.github} target='_blank'><GithubOutlined /></a>
                    }

                    {links?.web &&
                        <a href={links.web} target='_blank'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    }
                </div>

            </div>

            <h4 className='mt-4 text-xl font-semibold text-gray-200'>{title}</h4>

            <p className='mt-4 text-gray-300 flex-grow'>{description}</p>

            <div className='mt-4 flex gap-2 flex-wrap font-light text-gray-400'>
                {tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
        </div>
    )
}


export default function Project() {
    return (
        <section id='projects' className="max-w-screen-lg container mx-auto py-16 px-5  min-h-screen ">
            <div className="text-center mb-16">
                <h1 className="text-blue-300 font-black text-4xl">Projects</h1>
                <p className="text-gray-500">Lists of Apps and System that I created.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <ProjectCard
                    title='Alspace - Alumni Management System'
                    description='Alspace Alumni Management System is developed to aid communication between CSD administrators, staff and alumni.'
                    tags={['PHP', 'Laravel', 'ReactJS', 'MySQL', 'TailwindCSS', 'AntDesign']}
                    links={{ github: 'https://github.com/lenard123/alspace', web: 'https://alspace.me', }}
                />

                <ProjectCard
                    title='Techgear'
                    description='TechGear is an Ecommerce website that sells electronics and gadgets. This project is built using Alpine JS and Tailwind CSS on top of Laravel. '
                    tags={['PHP', 'Laravel', 'TailwindCSS', 'MySQL', 'AlpineJS']}
                    links={{ github: 'https://github.com/lenard123/techgear', web: 'https://techgear.studio/', }}
                />

                <ProjectCard
                    title='Web Based Voting System'
                    description='A system that allows admin to create and manage an election online.'
                    tags={['PHP', 'Laravel', 'VueJS', 'MySQL']}
                    links={{ github: 'https://github.com/lenard123/Voting-System/', web: 'https://voting-system-2.herokuapp.com/', }}
                />

                <ProjectCard
                    title='My Personal Blog'
                    description='A website where I can published a blog post and my projects.'
                    tags={['VueJS', 'TailwindCSS', 'Firebase']}
                    links={{ github: 'https://github.com/lenard123/blog/', web: 'https://lenard123.github.io/blog/', }}
                />

                <ProjectCard
                    title='Fastfood POS System'
                    description='This system allows business owners to track sales, cash flow, food inventory and can help simplify your bookkeeping enormously.'
                    tags={['C#.Net', 'WinForms', 'Guna2UI', 'MySQL']}
                    links={{ github: 'https://github.com/lenard123/fastfood-pos-csharp/' }}
                />


            </div>

        </section>
    )
}