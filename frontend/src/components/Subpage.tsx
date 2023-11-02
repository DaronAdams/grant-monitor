
interface SubpageProps {
    children: React.ReactNode; // Define children as a prop
  }

const Subpage: React.FC<SubpageProps> = ({children}) => {
  return (
    <div className="flex flex-col w-full">
      {children}
    </div>
  );

}

export default Subpage;