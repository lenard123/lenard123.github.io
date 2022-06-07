import { Button } from "antd";


export default function About() {
    return (
        <section className="max-w-screen-lg container mx-auto py-16 px-5 text-center  min-h-screen ">
            <div className="text-center mb-16">
                <h1 className="text-blue-300 font-black text-4xl">About me</h1>
                <p className="text-gray-500">Get to know me</p>
            </div>

            <div className="grid gap-5 md:grid-cols-4">
                <img src="https://lenard123.github.io/img/me.png" className="w-36 md:w-full h-auto px-5"/>

                <div className="text-justify text-gray-300 font-light text-lg col-span-3">
                    <p className="font-bold text-xl mb-4">Who am I?</p>

                    {/* <!-- Thanks to [wloisv@gmail.com] for correcting my mistakes --> */}
                    <p className="mb-4">Hey there! I'm Lenard Mangay-ayam, a web developer based in the historic city of Caloocan.</p>

                    <p className="mb-4">I'm 20 Years old and currently a 4th year Computer Science student at University of Caloocan City. I have been coding for 4 years and have learned a lot of things along the way.</p>

                    <p className="mb-4">I am in love with web development as it is a way for me to express myself, my talents, and my skills by creating applications that many people can benefit from.</p>

                    <Button type="primary" shape="round" size="large">Download CV</Button>
                </div>
            </div>
        </section>
    )
}