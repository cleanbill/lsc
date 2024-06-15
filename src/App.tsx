import Sync from './components/sync'

function App() {
  const overwriteData = () => {

  };

  const data = { "Some": "Data" };

  return (
    <>
      <Sync overwriteData={overwriteData} data={data}></Sync>
    </>
  )
}

export default App
