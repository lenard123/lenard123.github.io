import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css'
import { BackTop, Layout, Typography } from 'antd';
import Topbar from './components/Topbar/Topbar';
import Banner from './components/Banner/Banner';
import About from './components/About/About';
import Skills from './components/Skills/Skills';

const { Header, Footer, Content } = Layout;
const { Title } = Typography

function App() {

  return (
    <Layout className='bg-transparent'>
      <Header className=''>
        <Topbar />
      </Header>
      <Content>
        <Banner />
        <About />
        <Skills />
        <BackTop />
      </Content>
    </Layout>
  )
}

export default App
