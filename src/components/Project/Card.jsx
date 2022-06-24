import { FolderOutlined, GithubOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useState } from "react";

const PreviewImages = ({ visible, setVisible, images }) => {
    if (images === null) return null;

    return (
        <div className="hidden">
            <Image.PreviewGroup
                preview={{ 
                    visible, 
                    onVisibleChange: (vis) => setVisible(vis),
                }}
                >
                {images.map((image) => (
                    <Image src={image} key={image}/>
                ))}
            </Image.PreviewGroup>
        </div>
    )
}

export default function Card({ title, description, tags, links, images = null }) {

    const [visible, setVisible] = useState(false)

    return (
        <div className="hover:shadow-lg bg-[#112240] p-6 rounded flex flex-col">
            <div className='flex justify-between'>
                <FolderOutlined onClick={() => setVisible(true)} className='text-2xl text-green-500' />

                <PreviewImages images={images} visible={visible} setVisible={setVisible} />

                <div className='flex gap-2 items-center'>
                    {links?.github &&
                        <a href={links.github} target='_blank'><GithubOutlined /></a>
                    }

                    {links?.web &&
                        <a href={links.web} target='_blank'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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