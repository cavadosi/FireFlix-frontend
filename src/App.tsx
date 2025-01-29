import Layout from './components/core/Layout';
import './App.css'

function App() {

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log(apiBaseUrl);

  return (
    <>
      <Layout></Layout>
    </>
  )
}

export default App
