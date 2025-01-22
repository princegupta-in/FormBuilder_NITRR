import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineShareAlt, AiOutlineDelete } from "react-icons/ai";


const FormTable = ({ forms, onFormClick, onShare, onDelete }) => {
    return (
        <div className="w-full mt-6 p-6 bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-lg">
            {/* Title */}
            <h1 className="font-extrabold text-2xl mb-6 text-gray-800 text-center">
                All Forms
            </h1>

            {forms.length === 0 ? (
                // Empty state
                <div className="flex items-center justify-center text-gray-500 text-lg">
                    No Forms Created
                </div>
            ) : (
                // Table
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="font-bold text-gray-700 text-center py-3">
                                Form Name
                            </th>
                            <th className="font-bold text-gray-700 text-center py-3">
                                Responses
                            </th>
                            <th className="font-bold text-gray-700 text-center py-3">
                                Created At
                            </th>
                            <th className="font-bold text-gray-700 text-center py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {forms.map((form, index) => (
                            <tr
                                key={index}
                                className="hover:bg-blue-50 transition-colors duration-300 cursor-pointer"
                                onClick={() => onFormClick(form)} 
                            >
                                <td className="font-medium text-center text-gray-800 py-2">
                                    {form.title}
                                </td>
                                <td className="text-center text-gray-700 py-2">
                                    {form.responses}
                                </td>
                                <td className="text-center text-gray-700 py-2">
                                    {form.createdAt}
                                </td>
                                <td className="text-center py-2">
                                

                                <div className="flex justify-center gap-7">
                                    <button
                                        className="bg-blue-500 text-white p-2 rounded-md mr-2 flex items-center justify-center"
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            onShare(form); 
                                        }}
                                    >
                                        <AiOutlineShareAlt className="h-5 w-5" />
                                    </button>
                                    
                                    <button
                                        className="bg-red-500 text-white p-2 rounded-md flex items-center justify-center"
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            onDelete(form); 
                                        }}
                                    >
                                        <AiOutlineDelete className="h-5 w-5" />
                                    </button>
                                </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FormTable;
