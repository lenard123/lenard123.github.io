import {  Menu } from "antd";

export default function Topbar() {
    return (
        <div className='flex justify-between items-center gap-8 max-w-screen-lg mx-auto'>
            <span className='text-xl font-bold whitespace-nowrap text-slate-300'>Lenard M.</span>
            <Menu
                theme='dark'
                mode='horizontal'
                items={[
                    { key: 1, label: <a href='#about'>About</a> },
                    { key: 2, label: <a href='#skills'>Skills</a> },
                    { key: 3, label: <a href='#projects'>Projects</a> },
                    { key: 4, label: <a href='#contact'>Contact</a>}
                ]}
            />
        </div>
    )
}