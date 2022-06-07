import { Button, Form, Input, notification } from "antd";
import { useMessage } from "../../service/Message";


export default function Contact()
{
    const [form] = Form.useForm()
    const { sendMessage, isSending } = useMessage({
        onSuccess: () => {
            notification.success({
                message: 'Success',
                description: 'Message successfully sent'
            })
            form.resetFields()
        },
        onError: (error) => {
            notification.error({
                message: 'Message not sent',
                description: 'An error occured while sending the message'
            })
        }
    })

    const handleSubmit = (message) => {
        sendMessage(message)
    }

    return (
        <section id='contact' className="max-w-screen-lg container mx-auto py-16 px-5  min-h-screen ">
            <div className="text-center mb-16">
                <h1 className="text-blue-300 font-black text-4xl">Get In Touch</h1>
                <p className="text-gray-500">If you have any questions, inquiry, or just want to say hello. Feel free to leave a message.</p>
            </div>

            <div className="max-w-screen-md mx-auto">
                <Form form={form} layout='vertical' onFinish={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label='Name' name='name'>
                            <Input size='large' className="rounded"/>
                        </Form.Item>
                        <Form.Item label='Email' name='email'>
                            <Input type='email' size='large' className="rounded"/>
                        </Form.Item>
                    </div>
                    <Form.Item label='Message' name='message'>
                        <Input.TextArea rows={6}/>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={isSending} htmlType="submit" type="primary" className="rounded" size="large">Send Message</Button>
                    </Form.Item>

                </Form>
            </div>

        </section>
    )
}