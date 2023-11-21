import NavSpeedDial from '../components/NavSpeedDial';
import CreateGrantForm from '../components/forms/CreateGrantForm';


const CreateGrantPage = () => {

  return (
    <>
      <div className="flex flex-row h-20">
        <NavSpeedDial />
        <CreateGrantForm />
      </div>
    </>
  )
}


export default CreateGrantPage;