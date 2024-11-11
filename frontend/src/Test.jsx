import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot } from 'react-icons/fa';
import Lottie  from 'lottie-react';
import animationData from './assets/mail.json'; // Adjust path as needed

function Test() {
  const [emailText, setEmailText] = useState(''); // To store the email text
  const [response, setResponse] = useState(''); // To store the backend response
  const [showResponse, setShowResponse] = useState(false); // To control when to show the response
  const [dipemail, setDipemail] = useState('Enter email text ...'); // To store the email text for display

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    setDipemail(emailText); // Update the email text for display
    setEmailText(''); // Clear the text area after submission

    try {
      const res = await axios.post('http://localhost:5000/predict', { emails: [emailText] });
      setResponse(res.data.predictions[0]);
      setShowResponse(true);
    } catch (error) {
      console.error('There was an error!', error);
      setResponse('An error occurred. Please try again.');
      setShowResponse(true); // Show error message if there's an issue
    }
  };

  return (
    <div className='bg-black h-screen text-white flex flex-col'>
      <div className='h-16 flex justify-between items-center p-5'>
        <p className='font-semibold text-lg font-mono'>Spam Detection</p>
        <a href='/'><svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-7 h-7'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
          />
        </svg></a>
      </div>
      <div className='h-0.5 bg-lime-300'></div>
      <div className='flex-grow flex flex-col ml-28 mt-20'>
        <p className='text-4xl font-bold mb-4'>Spam Email Classifier</p>
        <p className='text-lg font-mono mb-8'>Enter your email text</p>
        <form className='flex flex-col space-y-8 w-full max-w-2xl' onSubmit={handleSubmit}>
          <textarea
            className='h-60 w-full bg-white bg-opacity-15 rounded-md p-4 text-white placeholder-gray-400 resize-none'
            placeholder={dipemail}
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            rows='5'
          />
          <button
            type='submit'
            className='border-2 rounded-lg border-neutral-600 w-40 h-8 hover:bg-rose-600 transition duration-300 hover:shadow-red-300 hover:shadow-sm text-white font-semibold'
          >
            Classify
          </button>
        </form>

        {showResponse && (
          <div className='bg-black w-full p-6 mt-8'>
            <p className='text-2xl font-semibold text-neutral-400 mb-4'>Prediction</p>
            <div className='flex items-center'>
              <FaRobot className='w-8 h-8 text-neutral-400' />
              <span className='ml-4 text-lg font-mono'>{response}</span>
            </div>
          </div>
        )}
      </div>

      {/* Lottie animation on the right side, centered vertically */}
      <div className='absolute top-1/2 right-8 transform -translate-y-1/2'>
        {/* <Lottie animationData={animationData} loop={true} autoplay={true} 
                    style={{
                      width: '50%',
                      height: '50%',
                      objectFit: 'cover',
                      right:300
                    }}
                     /> */}
      </div>
    </div>
  );
}

export default Test;
