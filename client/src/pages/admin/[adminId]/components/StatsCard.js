import Image from "next/image";
import { Card, 
         CardContent, 
         CardHeader, 
         CardTitle
        } from "../../../../../components/ui/card";

const StatsCard = ({
    title,
    value,
    icon
}) => {
    return ( 
        <Card className="relative bg-white p-6 rounded-lg shadow-md text-center">
            <div className=" absolute top-[35%]">
                {icon}    
            </div>       
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold mt-2" >{value}</p>
            </CardContent>
        </Card>
    );
}
 
export default StatsCard;
