import CalendarView from '../../CalendarView';
import GrantData from '../../../interfaces/GrantData';
import GrantBarChart from '../GrantBarChart'
import GrantLineChart from '../GrantLineChart'
import Button from '@mui/material/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {useRef, useState} from 'react';


interface GrantMainTabProps {
  grantData: GrantData;
}

const Visuals:React.FC<GrantMainTabProps> = ({grantData}) => {

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
    <>
      <div className="flex flex-row justify-center pt-4">

        <div>
      Grant Start Date
          <CalendarView displayDate={grantData.startDate} />
        </div>

        <div className="px-4">
      Today's Date
          <CalendarView displayDate={new Date()} />
        </div>

        <div>
      Grant End Date
          <CalendarView displayDate={grantData.endDate} />
        </div>

      </div>
      
      <div className="flex flex-row w-full justify-center" ref = {pdfRef}>

        <div className="flex flex-row justify-between items-center p-4">
          <GrantBarChart startDate={new Date(grantData.startDate)} endDate={new Date(grantData.endDate)} TotalAmount={grantData.totalAmount} />
        </div>

        <div className="flex flex-row justify-between items-center p-4">
          <GrantLineChart startDate={new Date(grantData.startDate)} endDate={new Date(grantData.endDate)} TotalAmount={grantData.totalAmount} />
        </div>
        
      </div>

      <div className="flex flex-row justify-center items-center p-4">
        <Button variant="contained" onClick={downloadPDF} style={{ display: buttonVisible ? 'block' : 'none' }}>Download Charts</Button>
      </div>
    
    </>
  ) 
} 
export default Visuals;