import Card from './Card'


export default function Project() {
    return (
        <section id='projects' className="max-w-screen-lg container mx-auto py-16 px-5  min-h-screen ">
            <div className="text-center mb-16">
                <h1 className="text-blue-300 font-black text-4xl">Projects</h1>
                <p className="text-gray-500">Lists of Apps and System that I created.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <Card
                    title='Alspace - Alumni Management System'
                    description='Alspace Alumni Management System is developed to aid communication between CSD administrators, staff and alumni.'
                    tags={['PHP', 'Laravel', 'ReactJS', 'MySQL', 'TailwindCSS', 'AntDesign']}
                    links={{ github: 'https://github.com/lenard123/alspace', web: 'https://alspace.me', }}
                    images={Array(19).fill(null).map((o, i) => `assets/img/ss/alspace/${i+1}.png`)}
                />

                <Card
                    title='Techgear'
                    description='TechGear is an Ecommerce website that sells electronics and gadgets. This project is built using Alpine JS and Tailwind CSS on top of Laravel. '
                    tags={['PHP', 'Laravel', 'TailwindCSS', 'MySQL', 'AlpineJS']}
                    links={{ github: 'https://github.com/lenard123/techgear', web: 'https://techgear.studio/', }}
                />

                <Card
                    title='Web Based Voting System'
                    description='A system that allows admin to create and manage an election online.'
                    tags={['PHP', 'Laravel', 'VueJS', 'MySQL']}
                    links={{ github: 'https://github.com/lenard123/Voting-System/', web: 'https://voting-system-2.herokuapp.com/', }}
                />

                <Card
                    title='My Personal Blog'
                    description='A website where I can published a blog post and my projects.'
                    tags={['VueJS', 'TailwindCSS', 'Firebase']}
                    links={{ github: 'https://github.com/lenard123/blog/', web: 'https://lenard123.github.io/blog/', }}
                />

                <Card
                    title='Fastfood POS System'
                    description='This system allows business owners to track sales, cash flow, food inventory and can help simplify your bookkeeping enormously.'
                    tags={['C#.Net', 'WinForms', 'Guna2UI', 'MySQL']}
                    links={{ github: 'https://github.com/lenard123/fastfood-pos-csharp/' }}
                />


            </div>

        </section>
    )
}