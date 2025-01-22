import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";

const AdminCard = ({ user }) => {
    return (
        <Card className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6 bg-gradient-to-br from-white to-blue-400 text-gray-800">

            <Image
                src={user.Avtar}
                alt={`${user.FirstName} ${user.LastName}'s Avatar`}
                height={80}
                width={80}
                className="rounded-full object-cover"
            />

            <div>
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold">
                        {user.FirstName} {user.LastName}
                    </CardTitle>
                </CardHeader>
                <CardContent className="font-bold mt-2 space-y-1 text-gray-600">
                    <p>Email: {user.Email}</p>
                    <p>Contact: {user.ContactNumber}</p>
                    <p>Club: {user.Club}</p>
                    <p>Position: {user.Position}</p>
                </CardContent>
            </div>
        </Card>
    );
};

export default AdminCard;
