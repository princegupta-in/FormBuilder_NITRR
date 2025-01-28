import React from 'react';

const FormResponsesTable = ({ responses, questions = [] }) => {
  // If no responses, show a simple message
  if (!responses || responses.length === 0) {
    return <div className="p-4 text-gray-500">No responses available.</div>;
  }

  // Use the correct property name for the question text (e.g. "title", "question", etc.)
  const questionMap = questions.reduce((acc, q) => {
    acc[q._id] = q.title || q.questionText || `Question ${q._id}`;
    return acc;
  }, {});

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Response #
            </th>
            {questions.map((question) => (
              <th
                key={question._id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {questionMap[question._id]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {responses.map((singleResponse, responseIndex) => (
            <tr key={singleResponse._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {responseIndex + 1}
              </td>
              {questions.map((question) => {
                const answerObj = singleResponse.responses.find(
                  (answer) => answer.questionId === question._id
                );
                return (
                  <td
                    key={question._id}
                    className="px-6 py-4 whitespace-normal text-sm text-gray-900"
                  >
                    {answerObj?.answer || "N/A"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormResponsesTable;