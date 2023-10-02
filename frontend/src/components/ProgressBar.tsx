import { Progress } from "@material-tailwind/react";

export function ProgressLabel(){
    return( 
        <div className="flex w-full flex-col gap-4">
            <Progress value={50} label="In Progress" color="green" />
        </div>
    );

}