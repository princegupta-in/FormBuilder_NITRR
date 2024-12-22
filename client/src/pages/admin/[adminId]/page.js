import { useRouter } from "next/router";
import { Button } from '../../../../components/ui/button'
import StatsCard from './components/StatsCard'
import AdminCard from './components/AdminCard'
import FormTable from './components/FormTable'
import { AiOutlineForm } from "react-icons/ai";
import { MdQuestionAnswer } from "react-icons/md";
import "../../../app/globals.css"

const AdminProfilePage = () => {
    const router = useRouter();
    const { adminId } = router.query;
    
    // const user = await getUser({
    //     where: {
    //         id: adminId,
    //     },
    // });
    const user = {
        FirstName: "John",
        LastName: "Doe",
        Email: "johndoe@gmail.com",
        ContactNumber: "0123456789",
        Avtar: "https://res.cloudinary.com/dhpftsqpt/image/upload/v1730090038/vnldch255xtsvvlhcgqs.jpg",
        Club: "ICELL",
        Position: "Executive",
    }
    // const forms = await getForms({
    //     where: {
    //         createdBy: adminId,
    //     },
    // });
    const forms = [
        {
            title: "Event A" ,
            responses: 400,
            createdAt: "2024-10-26"
        },
        {
            title: "Event B" ,
            responses: 400,
            createdAt: "2024-10-26"
        },
        {
            title: "Event C" ,
            responses: 400,
            createdAt: "2024-10-26"
        },
        {
            title: "Event D" ,
            responses: 400,
            createdAt: "2024-10-26"
        },
        {
            title: "Event E" ,
            responses: 400,
            createdAt: "2024-10-26"
        },
    ];
    
    const totalForms = forms.length;
    const totalResponses = forms.reduce((total, form) => {
        return total + (Number(form.responses));
    }, 0);

    const handleOnCreateForm = () => {
        router.push('/formbuilder/page')
    }
    const handleLogout = async () => {
        try {const response = await fetch('http://localhost:4000/api/v1/logout', {
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

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Admin Profile</h1>
                <Button 
                    className="bg-white text-lime-700 px-4 py-2 rounded-md shadow-md"
                    onClick={handleOnCreateForm}
                >
                    Create New Form
                </Button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <AdminCard user={user} />
                <StatsCard title="Total Forms" value={totalForms} icon={<AiOutlineForm size={75}/>} />
                <StatsCard title="Total Responses" value={totalResponses} icon={<MdQuestionAnswer size={75} />} />
            </div>
            <FormTable forms={forms} />
            <Button 
                    className="bg-red-600 text-white-700 px-4 py-2 rounded-md shadow-md md:absolute bottom-6 right-6 mt-4"
                    onClick={handleLogout}
                >Logout
                </Button>
        </div>
        )
}

 export default AdminProfilePage;