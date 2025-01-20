import { useRouter } from "next/router";
import { useState } from "react";
import StatsCard from "./components/StatsCard";
import UpcomingEventsCard from "./components/UpcomingEventsCard";
import FormTable from "./components/FormTable";
import { AiOutlineForm, AiOutlineCalendar } from "react-icons/ai";
import { MdQuestionAnswer } from "react-icons/md";
import "../../../app/globals.css";

const AdminProfilePage = () => {
    const router = useRouter();
    const { adminId } = router.query;
    const [selectedForm, setSelectedForm] = useState(null); 
    const [showDashboard, setShowDashboard] = useState(true);

    const user = {
        FirstName: "John",
        LastName: "Doe",
        Email: "johndoe@gmail.com",
        ContactNumber: "0123456789",
        Avatar: "https://res.cloudinary.com/dhpftsqpt/image/upload/v1730090038/vnldch255xtsvvlhcgqs.jpg",
        Club: "ICELL",
        Position: "Executive",
    };

    // Forms state for handling form updates
    const [forms, setForms] = useState([
        { id: 1, title: "Event A", responses: 25, createdAt: "2024-10-26" },
        { id: 2, title: "Event B", responses: 10, createdAt: "2024-10-26" },
        { id: 3, title: "Event C", responses: 50, createdAt: "2024-10-26" },
    ]);

    const totalForms = forms.length;
    const totalResponses = forms.reduce((total, form) => total + Number(form.responses), 0);

    const handleFormClick = (form) => {
        setSelectedForm(form);
    };

    const handleDashboardClick = () => {
        setShowDashboard(!showDashboard);
    };

    const handleShare = (form) => {
        const shareableLink = `${window.location.origin}/forms/${form.id}`;
        navigator.clipboard.writeText(shareableLink)
            .then(() => alert("Form link copied to clipboard!"))
            .catch((err) => {
                console.error("Error copying to clipboard:", err);
                alert("Failed to copy link, please try again.");
            });
    };

    // Handle form deletion
    const handleDelete = (form) => {
        const updatedForms = forms.filter((f) => f.id !== form.id); 
        setForms(updatedForms);
        setSelectedForm(null);  
    };

    // Navigate to form builder page
    const handleOnCreateForm = () => {
        router.push("/formbuilder/page");
    };

    // Handle logout process
    const handleLogout = async () => {
        router.push("/");
    };

    const handleViewResponse = (responseNumber) => {
        console.log("View details for Response:", responseNumber);
        router.push();
    };
    

    return (
        <div className="flex min-h-screen bg-blue-50">
            <div className="w-64 bg-blue-800 text-white p-6 flex flex-col">
                <img
                    src="/assets/icell_dark.png"
                    alt="logo"
                    className="w-48 h-auto mb-8"
                />
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={user.Avatar}
                        alt="Admin Avatar"
                        className="w-20 h-20 rounded-full mb-4 border-4 border-blue-700"
                    />
                    <h2 className="text-xl font-semibold">{user.FirstName} {user.LastName}</h2>
                    <p className="text-sm text-blue-200 mt-1">{user.Position}</p>
                </div>

                <ul className="space-y-6">
                    <li>
                        <button
                            className="w-full text-left text-lg hover:bg-blue-700 p-3 rounded transition-all duration-200"
                            onClick={handleDashboardClick}
                        >
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left text-lg hover:bg-blue-700 p-3 rounded transition-all duration-200"
                            onClick={handleOnCreateForm}
                        >
                            Create Form
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left text-lg hover:bg-blue-700 p-3 rounded transition-all duration-200"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 py-8 px-6 bg-white">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-800">Admin Panel</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <UpcomingEventsCard
                        title="Upcoming Events"
                        value={0}
                        icon={<AiOutlineCalendar size={60} />}
                        className="bg-blue-100 shadow-lg hover:shadow-2xl transition duration-200"
                    />
                    <StatsCard
                        title="Total Forms"
                        value={totalForms}
                        icon={<AiOutlineForm size={60} />}
                        className="bg-blue-100 shadow-lg hover:shadow-2xl transition duration-200"
                    />
                    <StatsCard
                        title="Total Responses"
                        value={totalResponses}
                        icon={<MdQuestionAnswer size={60} />}
                        className="bg-blue-100 shadow-lg hover:shadow-2xl transition duration-200"
                    />
                </div>

                <div className="overflow-hidden bg-blue-100 shadow-lg rounded-xl p-6">
                    <FormTable
                        forms={forms}
                        onFormClick={handleFormClick}  
                        onShare={handleShare}          
                        onDelete={handleDelete}        
                    />
                </div>

                {selectedForm && (
                    <div className="mt-8 p-6 bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedForm.title} Responses</h2>
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <ul className="space-y-4">
                                {Array.from({ length: selectedForm.responses }, (_, i) => (
                                    <li key={i} className="flex items-center space-x-3 text-gray-700">
                                        <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center">{i + 1}</span>
                                        <span className="flex-1">Response {i + 1}</span>
                                        <button 
                                            className="text-blue-600 hover:underline"
                                            onClick={handleViewResponse}  // View specific response
                                        >
                                            View
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProfilePage;
