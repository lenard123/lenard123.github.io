import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css'
import { BackTop, ConfigProvider, Layout, Typography } from 'antd';
import Topbar from './components/Topbar/Topbar';
import Banner from './components/Banner/Banner';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Project from './components/Project/Project';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

const { Header, Content } = Layout;
const { Title } = Typography

function App() {

  return (
    <ConfigProvider>
      <Layout className='bg-transparent'>
        <Header className='sticky top-0 z-10'>
          <Topbar />
        </Header>
        <Content>
          <Banner />
          <About />
          <Skills />
          <Project />
          <Contact />
          <BackTop />
        </Content>
        <Footer/>
      </Layout>
    </ConfigProvider>
  )
}

export default App
