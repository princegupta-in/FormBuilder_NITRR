import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";

const StatsCard = ({ title, value, icon }) => {
    return (
        <Card className=" relative bg-gradient-to-br bg-gradient-to-r from-blue-200 to-blue-400 text-gray-800 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            {/* Icon at the top */}
            <div className="absolute top-4 right-4 text-5xl text-black">
                {icon}
            </div>

            <CardHeader className="mb-4">
                <CardTitle className="text-2xl font-bold tracking-wide">{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-4xl font-extrabold">{value}</p>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
