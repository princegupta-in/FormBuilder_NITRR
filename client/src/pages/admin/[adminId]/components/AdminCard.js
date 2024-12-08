import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";

const AdminCard = ({
    user
}) => {
    return ( 
        <Card className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <Image src={user.Avtar} height={20} width={20} />
            <CardHeader>
                <CardTitle>{user.FirstName} {user.LastName}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{user.Email}</p>
                <p>{user.ContactNumber}</p>
                <p>{user.Club}</p>
                <p>{user.Position}</p>
            </CardContent>
        </Card>
     );
}
 
export default AdminCard;