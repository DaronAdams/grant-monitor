import React, {useRef, useState} from 'react';
import GrantData from '../../../interfaces/GrantData';
import GrantBarChart from '../GrantBarChart'
import GrantLineChart from '../GrantLineChart'
import Button from '@mui/material/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


interface GrantMainTabProps {
  grantData: GrantData;
}

const Main:React.FC<GrantMainTabProps> = ({grantData}) => {


  const pdfRef = useRef(null);

  const [buttonVisible, setButtonVisible] = useState(true);

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
        <p>{`Account: ${grantData.account}`}</p>
        <p>{`Cayuse: ${grantData.cayuse}`}</p>
        <p>{`Fund: ${grantData.fund}`}</p>
        <p>{`Organization: ${grantData.organization}`}</p>
        <p>{`Program: ${grantData.program}`}</p>
        <p>{`Sponsor: ${grantData.sponsor}`}</p>
        <p>{`Index: ${grantData.index}`}</p>
        <p>{`Cost-Share Index: ${grantData.costShareIndex}`}</p>
        <p>{`NCE App Date: ${grantData.nceAppDate}`}</p>
        <p>{`Start Date: ${grantData.startDate}`}</p>
        <p>{`End Date: ${grantData.endDate}`}</p>
        <p>{`Status: ${grantData.status}`}</p>
        <p>{`Total Amount: $${grantData.totalAmount}`}</p>
        <p>{`Yearly Amount: ${grantData.yearlyAmount}`}</p>
        <p>{`Notes: ${grantData.notes || 'N/A'}`}</p>
        <p>{`Created At: ${grantData.createdAt}`}</p>
        <p>{`Updated At: ${grantData.updatedAt}`}</p>
      </div>

      

      <div className="flex flex-col w-full" ref = {pdfRef}>
        <div className="flex flex-row justify-between items-center p-4">
          <Button variant="contained" onClick={downloadPDF} style={{ display: buttonVisible ? 'block' : 'none' }}>Download Charts</Button>
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