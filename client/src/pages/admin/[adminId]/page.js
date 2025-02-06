import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import StatsCard from "./components/StatsCard";
import UpcomingEventsCard from "./components/UpcomingEventsCard";
import FormTable from "./components/FormTable";
import { AiOutlineForm, AiOutlineCalendar } from "react-icons/ai";
import { MdQuestionAnswer } from "react-icons/md";
import FormResponsesTable from "./components/formResponseTable";
import "../../../app/globals.css";

const AdminProfilePage = () => {
    const router = useRouter();
    const { adminId } = router.query;

    const [user, setUser] = useState(null); // Dynamically fetched user data
    const [forms, setForms] = useState([]); // Forms data fetched from API
    const [loadingUser, setLoadingUser] = useState(true); // Loading state for user
    const [loadingForms, setLoadingForms] = useState(true); // Loading state for forms
    const [selectedForm, setSelectedForm] = useState(null);
    const [showDashboard, setShowDashboard] = useState(true);
    const [seed, setSeed] = useState(null);
    const [formResponses, setFormResponses] = useState({});
    const [loadingResponses, setLoadingResponses] = useState(false);

    const getCurrentUser = async () => {
        try {
            const response = await fetch("https://formbuilder-backend-2.onrender.com/api/v1/currentuser", {
                credentials: "include",
                mode: "cors"
            });
            
            const data = await response.json();
            
            if (data.success) {
                return data.user;
            } else {
                throw new Error("Failed to get user info");
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
            return null;
        }
    };

    useEffect(() => {
    if (typeof window !== 'undefined') {
      let savedSeed = localStorage.getItem('avatarSeed');
      
      if (!savedSeed) {
        savedSeed = Math.random().toString(36).substring(7);
        localStorage.setItem('avatarSeed', savedSeed);
      }
      
      setSeed(savedSeed);
    }

        // Fetch user data from API
        const fetchUser = async () => {
            const userInfo = await getCurrentUser();
            if (userInfo) {
              console.log('User info:', userInfo);
              setUser(userInfo);
            } else {
              router.push('/signin/signin');
            }
          }
          fetchUser();

        // Fetch forms data from API
        const fetchForms = async () => {
            try {
                const response = await fetch("https://formbuilder-backend-2.onrender.com/api/v1/form", {
                    credentials: "include",
                    mode: "cors"
                });
                const formsData = await response.json();
                // Ensure formsData is an array
                setForms(Array.isArray(formsData) ? formsData : []);
                setLoadingForms(false);
            } catch (error) {
                console.error("Error fetching forms data:", error);
                setForms([]);
                setLoadingForms(false);
            }
        };

        fetchForms();
    }, []);

    const totalForms = Array.isArray(forms) ? forms.length : 0;
    const totalResponses = Array.isArray(forms) 
        ? forms.reduce((total, form) => total + Number(form?.responses || 0), 0)
        : 0;

    const handleFormClick = (form) => {
        setSelectedForm(form);
        console.log("Selected form:", form);
        fetchFormResponses(form._id);
    };

    const handleDashboardClick = () => {
        setShowDashboard(!showDashboard);
    };

    const handleShare = (form) => {
        const shareableLink = `${window.location.origin}/forms/${form._id}`;
        navigator.clipboard.writeText(shareableLink)
            .then(() => alert("Form link copied to clipboard!"))
            .catch((err) => {
                console.error("Error copying to clipboard:", err);
                alert("Failed to copy link, please try again.");
            });
    };

    const handleDelete = async (form) => {
        try {
            // Log form object to verify ID
            console.log("Form to delete:", form);
            
            // Check if form._id exists (MongoDB typically uses _id)
            const formId = form._id || form.id;
            
            if (!formId) {
                throw new Error('Form ID is missing');
            }
    
            const response = await fetch(`https://formbuilder-backend-2.onrender.com/api/v1/form/${formId}`, {
                method: 'DELETE',
                credentials: 'include',
                mode: 'cors'
            });
    
            if (response.ok) {
                const updatedForms = forms.filter((f) => (f._id || f.id) !== formId);
                setForms(updatedForms);
                setSelectedForm(null);
                alert('Form deleted successfully');
            } else {
                throw new Error('Failed to delete form');
            }
        } catch (error) {
            console.error('Error deleting form:', error);
            alert('Failed to delete form. Please try again.');
        }
    };

    const handleOnCreateForm = () => {
        router.push("/formbuilder/page");
    };

    const handleLogout = async () => {
        try {const response = await fetch('https://formbuilder-backend-2.onrender.com/api/v1/logout', {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        });
        if (response.ok) {
            localStorage.clear();
            router.push('/signin/signin')
        } else{
            alert('Error during logout, please try again later')
        }
    } catch(error){
            console.log('Error during logout:', error)
        }
    }

    const handleViewResponse = (responseNumber) => {
        console.log("View details for Response:", responseNumber);
        router.push();
    };

    const fetchFormResponses = async (formId) => {
        try {
            setLoadingResponses(true);
            const response = await fetch(`https://formbuilder-backend-2.onrender.com/api/v1/form-response/${formId}`, {
                credentials: 'include',
                mode: 'cors',
            });
            const data = await response.json();
            // Store it
            setFormResponses((prev) => ({ ...prev, [formId]: data }));
        } catch (error) {
            console.error('Error fetching responses:', error);
        } finally {
            setLoadingResponses(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-blue-50">
            <div className="w-64 bg-blue-800 text-white p-6 flex flex-col">
            <img src="/assets/icell_white.png" alt="logo" className="w-80 h-auto top-0 left-0 relative" />


                {user ? ( 
                    <div className="flex flex-col items-center mb-8">
                    <img
                        src={`https://api.dicebear.com/6.x/bottts/svg?seed=${seed}`
                        || "/placeholder-avatar.png"}
                        alt="Admin Avatar"
                        className="w-20 h-20 rounded-full mb-4 border-4 border-blue-700"
                    />
                    <h2 className="text-xl font-semibold">{user?.FirstName} {user?.LastName}</h2>
                    <p className="text-sm text-blue-200 mt-1">{user?.Position || "N/A"}</p>
                </div>
                ): <>
                    <p>Loading User</p>
                </>}

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

            <div className="flex-1 py-8 px-6 bg-white">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-800">Admin Panel</h1>
                </header>

                {loadingForms ? (
                    <p>Loading forms...</p>
                ) : (
                    <div>
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
                    </div>
                )}

                    {selectedForm && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                {selectedForm.title} Responses
                            </h2>
                            <div className="bg-white rounded-lg shadow-md p-4">
                                {loadingResponses ? (
                                    <p>Loading responses...</p>
                                ) : (
                                    <FormResponsesTable 
                                        responses={formResponses[selectedForm._id] || []}
                                        questions={selectedForm.questions || []}
                                    />
                                )}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default AdminProfilePage;
