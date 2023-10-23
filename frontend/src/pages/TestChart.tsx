import React,{useRef, useState} from 'react'; 
import { HomePageSidebar } from '../components/Sidebar';
import BasicBar from '../components/BasicBarChart';
import BasicLine from '../components/BasicLineChart';

import Button from '@mui/material/Button';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const TestBar = () => {

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
  return ( 
    <>
      <div className="flex flex-row">
        <HomePageSidebar />

        <div className="flex flex-col w-full" ref = {pdfRef}>
          <div className="flex flex-row justify-between items-center p-4">
            <BasicBar />
          </div>

          <div className="flex flex-row justify-between items-center p-4">
            <BasicLine />
          </div>

        </div>
      </div>
            
      <div className="flex justify-center" style={{ marginLeft: '250px' }}>
        <Button variant="contained" onClick={downloadPDF} style={{ display: buttonVisible ? 'block' : 'none' }}>Download Charts</Button>
      </div>
    </>
        
  );
}
 
export default TestBar;


