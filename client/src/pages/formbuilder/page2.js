import React, { useState } from 'react';
import "../../app/globals.css"
import { FaDeleteLeft } from 'react-icons/fa6';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'C:/Users/ASUS/Downloads/formBuilderAnimations.css';

const FormBuilder = () => {
  const [formName, setFormName] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionName: '', questionType: 'single', options: [''], required: false }]);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleDuplicateQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, { ...questions[index] });
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push('');
    setQuestions(updatedQuestions);
  };

  const optionDeleteHandler = (index, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[index].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  const renderOptions = (qIndex) => {
    return questions[qIndex].options.map((option, oIndex) => (
      <div key={oIndex} className="mt-2 flex group">
        <input
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
          placeholder={`Option ${oIndex + 1}`}
          className="w-[96%] px-3 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Delete button handle */}
        <div>
          {questions[qIndex].options.length > 1 ? (
            <button
              onClick={() => optionDeleteHandler(qIndex, oIndex)}
              className="p-2 rounded-full text-transparent group-hover:text-white"
            >
              <FaDeleteLeft className="text-2xl" />
            </button>
          ) : null}
        </div>
      </div>
    ));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      formName,
      questions,
    };

    console.log('Form Data being sent:', formData);

    try {
      const response = await fetch('https:/localhost5147/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Form submitted successfully');
      } else {
        console.error('Error submitting the form');
        alert('Error submitting the form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Form</h1>
      <input
        type="text"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        placeholder="Form Name"
        className="w-full mb-6 px-4 py-2 border bg-gray-900 border-gray-300 rounded-md text-lg focus:outline-none focus:ring focus:ring-blue-300"
      />

      <TransitionGroup>
        {questions.map((question, qIndex) => (
          <CSSTransition key={qIndex} timeout={300} classNames="fade">
            <div className="mb-6 p-6 border border-gray-200 rounded-md shadow-sm">
              <input
                type="text"
                value={question.questionName}
                onChange={(e) => handleQuestionChange(qIndex, 'questionName', e.target.value)}
                placeholder="Question Name"
                className="w-full mb-4 px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />

              <select
                value={question.questionType}
                onChange={(e) => handleQuestionChange(qIndex, 'questionType', e.target.value)}
                className="w-full mb-4 px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="single">Single Choice</option>
                <option value="multiple">Multiple Choice</option>
                <option value="text">Text Answer</option>
                <option value="email">Email</option>
                <option value="phoneNum">Contact Number</option>
                <option value="Document">Document Upload</option>
              </select>

              {question.questionType === 'multiple' ? (
                <div>
                  <input
                    type="number"
                    min={1}
                    placeholder="Enter the number of allowed choices"
                    className="w-full px-3 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              ) : null}

              {question.questionType === 'single' || question.questionType === 'multiple' ? (
                <div>
                  {renderOptions(qIndex)}
                  <button
                    onClick={() => handleAddOption(qIndex)}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Option
                  </button>
                </div>
              ) : null}

              {question.questionType === 'Document' ? (
                <div className="ml-1">
                  <label htmlFor="docSize">Maximum file size: </label>
                  <select
                    name="size"
                    id="docSize"
                    className="mb-4 px-4 py-2 border bg-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option value="1">1 MB</option>
                    <option value="10">10 MB</option>
                    <option value="100">100 MB</option>
                  </select>
                </div>
              ) : null}

              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  checked={question.required}
                  onChange={(e) => handleQuestionChange(qIndex, 'required', e.target.checked)}
                  className="mr-2"
                />
                <label>Required</label>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleDuplicateQuestion(qIndex)}
                  className="relative px-6 py-3 bg-green-500 text-white font-bold rounded-lg overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-green-700 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
                  <span className="relative">Duplicate Question</span>
                </button>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleDeleteQuestion(qIndex)}
                  className="relative px-6 py-3 bg-red-500 text-white font-bold rounded-lg overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-red-700 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
                  <span className="relative">Delete Question</span>
                </button>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <div className="flex gap-4">
        <button
          onClick={handleAddQuestion}
          className="relative px-6 py-3 bg-blue-500 text-white font-bold rounded-lg overflow-hidden group"
        >
          <span className="absolute inset-0 bg-blue-700 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
          <span className="relative">Add Question</span>
        </button>
        <button
          className="relative px-6 py-3 bg-gray-500 text-white font-bold rounded-lg overflow-hidden group"
          onClick={handleSubmit}
        >
          <span className="absolute inset-0 bg-gray-700 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></span>
          <span className="relative">Save or Upload</span>
        </button>
      </div>
    </div>
  );
};

export default FormBuilder;
