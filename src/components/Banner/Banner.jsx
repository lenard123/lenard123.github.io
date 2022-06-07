import { Button } from "antd";


export default function Banner() {
    return (
        <section className="container mx-auto py-40 px-5 text-center  -mt-16">
            <h1 className="uppercase text-white text-xl leading-6 mb-6 sm:text-3xl sm:leading-10">
                I am <span className="text-blue-300 font-semibold">Lenard Mangay-ayam</span> <br />
                and I'm a Full Stack Web Developer
            </h1>

            <p className="text-gray-300 mb-8">
                I can develop a website using ReactJS and Laravel framework.<br />
                I can also do desktop application using WinForms .Net framework.
            </p>

            <Button shape='round' type='primary'>Learn more</Button>

        </section>
    )
}