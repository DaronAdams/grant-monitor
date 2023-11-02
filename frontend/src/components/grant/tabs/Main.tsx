import React, {useRef, useState} from 'react';
import GrantData from '../../../interfaces/GrantData';
import GrantBarChart from '../GrantBarChart'
import GrantLineChart from '../GrantLineChart'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import GrantDeleteButton from '../GrantDeleteButton';
import { Button } from '@material-tailwind/react';


interface GrantMainTabProps {
  grantData: GrantData;
}

const Main:React.FC<GrantMainTabProps> = ({grantData}) => {


  const pdfRef = useRef(null);

  const [openPopUp, setOpenPopUp] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [grantDeleted, setGrantDeleted] = useState(false);

  const downloadPDF = () =>{
    const input = pdfRef.current;

    if (input){

      setButtonVisible(false);

      html2canvas(input).then((canvas) =>{

        setButtonVisible(true);

        const imgData =  canvas.toDataURL('image/png');
        const pdf = new jsPDF('p','mm','a4',true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;

        pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth * ratio,imgHeight * ratio);
        pdf.save('charts.pdf');
        

      });
    }
  };

  const openModal = () => {
    setOpenPopUp(true);
  };

  return(
    <div style={{
      width:'100%',
      height:'100%',
      padding:'10px',
      border:'1px solid black',
      borderRadius:'10px',
      margin:'10px',
    }}>
      <h1 className="font-semibold">Grant Name</h1>
  
      <div>
        <p>{`PI: ${grantData.account}`}</p>
        <p>{`PI U#: ${grantData.index}`}</p>
        <p>{`Sponsor: ${grantData.sponsor}`}</p>
        <p>{`Index: ${grantData.index}`}</p>
        <p>{`Cost Share Index: ${grantData.costShareIndex}`}</p>
        <p>{`Cayuse: ${grantData.cayuse}`}</p>
        <p>{`Dates: ${grantData.startDate} - ${grantData.endDate}`}</p>
        <p>{`Total Amount: $${grantData.totalAmount.toFixed(2)}`}</p>
        <p>{`Yearly Amount: $${grantData.yearlyAmount.toFixed(2)}`}</p>
        <p>{`NCE Application Date: ${grantData.nceAppDate ? grantData.nceAppDate : 'N/A'}`}</p>
        <p>{`Notes: ${grantData.notes || 'N/A'}`}</p>
        <p>{`Status: ${grantData.status}`}</p>
        <p>{`Created At: ${grantData.createdAt}`}</p>
        <p>{`Updated At: ${grantData.updatedAt}`}</p>
        <p>{`Fund: ${grantData.fund}`}</p>
        <p>{`Organization: ${grantData.organization}`}</p>
        <p>{`Program: ${grantData.program}`}</p>
      </div>

      <div className='py-4'>
        <GrantDeleteButton openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          onClick={openModal}
          grantData={grantData}
          grantDeleted={grantDeleted}
        />
      </div>
      

      <div className="flex flex-col w-full" ref = {pdfRef}>
        <div className="flex flex-row justify-between items-center p-4">
          <Button
            onClick={downloadPDF}
          >
            Download Charts
          </Button>
        </div>
        <div className="flex flex-row justify-between items-center p-4">
          <GrantBarChart />
        </div>
        <div className="flex flex-row justify-between items-center p-4">
          <GrantLineChart />
        </div>
      </div>
    </div>
      

  ) 
}

export default Main;