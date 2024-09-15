import "../../app/globals.css"

export default function SignUp() {
    return (
        <div className="flex h-screen">
            <div className="flex-1 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-white flex flex-col justify-center items-center text-center rounded-r-[50px] p-12">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Welcome to</h1>
                </div>
                <p>
                    ICell Form Builder Web is your go-to solution for creating, managing, and deploying professional forms easily. Whether you're building a simple contact form or a complex survey, we've got the tools to help you succeed.
                </p>

                <div className='flex'>
                    <button type="button" className="bg-white text-blue-800 border border-blue-800 px-4 py-2 rounded hover:bg-green-300 m-[15px]">Sign In</button>
                    <button type="button" className="bg-white text-blue-800 border border-blue-800 px-4 py-2 rounded hover:bg-blue-100 m-[15px]">Sign up</button>
                </div>
            </div>

            <div className="flex-1 bg-white p-12 overflow-y-auto rounded-l-[50px] ml-[5px]">
                <h2 className="text-2xl font-bold mb-5 text-black">Create your account</h2>
                <form>
                    {/* Input Group - First Name */}
                    <div className="mb-4">
                        <label htmlFor="first-name" className="block font-bold mb-2 text-black">First Name</label>
                        <input
                            type="text"
                            id="first-name"
                            placeholder="First Name"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Input Group - Last Name */}
                    <div className="mb-4">
                        <label htmlFor="last-name" className="block font-bold mb-2 text-black">Last Name</label>
                        <input
                            type="text"
                            id="last-name"
                            placeholder="Last Name"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Input Group - E-mail */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-bold mb-2 text-black">E-mail Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Input Group - Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-bold mb-2 text-black">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Input Group - Contact Number */}
                    <div className="mb-4">
                        <label htmlFor="contact" className="block font-bold mb-2 text-black">Contact Number</label>
                        <input
                            type="text"
                            id="contact"
                            placeholder="Enter your Contact Number"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Input Group - Club / Committee Name */}
                    <div className="mb-4">
                        <label htmlFor="club-name" className="block font-bold mb-2 text-black">Club / Committee Name</label>
                        <input
                            type="text"
                            id="club-name"
                            placeholder="Enter your Club / Committee Name"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Input Group - Your Position */}
                    <div className="mb-4">
                        <label htmlFor="position" className="block font-bold mb-2 text-black">Your Position</label>
                        <input
                            type="text"
                            id="position"
                            placeholder="Enter your Position"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>

                    {/* Input Group - Security Key */}
                    <div className="mb-4">
                        <label htmlFor="security-key" className="block font-bold mb-2 text-black">Security Key</label>
                        <input
                            type="text"
                            id="security-key"
                            placeholder="Enter Security Key"
                            className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex justify-center mt-6 text-black">
                        <button
                            type="submit"
                            className="w-[48%] bg-blue-800 text-white p-3 rounded hover:bg-blue-900">
                            Sign Up
                        </button>
                    </div>

                </form>


                <div className="text-center mt-5 text-black">
                    <p>
                        Already have an account?{' '}
                        <button
                            type="button"
                            className=" border text-blue-800  rounded hover:bg-green-800 hover:text-white">
                            Sign In
                        </button>
                    </p>
                    <p>OR</p>
                    <p>If you have any problems, contact the technical team.</p>
                </div>

            </div>
        </div>
    );
}
