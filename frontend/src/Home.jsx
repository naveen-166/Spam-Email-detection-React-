import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { Line } from 'react-chartjs-2';
import Lottie from 'lottie-react';
import animationData from './assets/mail.json';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Test from './Test';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 500 });

    // Importing CSV as an asset URL
    const csvUrl = '/assets/spam.csv';  // Correct path for production

    // Fetch and parse the CSV file
    fetch(csvUrl)
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (result) => {
            const firstFiveRows = result.data.slice(0, 5);
            setData(firstFiveRows);
          },
          skipEmptyLines: true,
        });
      })
      .catch((error) => {
        console.error('Error fetching or parsing the CSV file:', error);
      });
  }, []);

  const graphData = {
    labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%'],
    datasets: [
      {
        label: 'Training Accuracy',
        data: [100.0, 99.76, 99.52, 99.34, 99.43, 99.4, 99.28, 99.25, 99.34],
        borderColor: '#4287f5',
        backgroundColor: 'rgba(66, 135, 245, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Testing Accuracy',
        data: [96.12, 97.7, 98.13, 98.35, 98.56, 98.64, 98.64, 98.71, 98.85],
        borderColor: '#ff6347',
        backgroundColor: 'rgba(255, 99, 71, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white'>
      {/* Navbar - Horizontal, Transparent Background */}
      <nav className='fixed top-0 left-10 w-full bg-transparent text-white shadow-md z-50'>
        <div className='max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center'>
          {/* Logo */}
          <div className='flex items-center space-x-3'>
            <span className='text-2xl font-bold'>Spam Detector</span>
          </div>

          {/* Navbar Links */}
          <ul className='flex font-semibold space-x-8'>
            <li>
              <a href='#section-1' className='text-white hover:text-gray-400'>
                Project Title
              </a>
            </li>
            <li>
              <a href='#section-2' className='text-white hover:text-gray-400'>
                Dataset
              </a>
            </li>
            <li>
              <a href='#section-3' className='text-white hover:text-gray-400'>
                Graph
              </a>
            </li>
            <li>
              <a href='#section-4' className='text-white hover:text-gray-400'>
                Test Model
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className='pt-20 ml-0 md:ml-1/5 px-6'>
        {/* First Section: Project Title and Description */}
        <div id='section-1' className='min-h-screen flex flex-col items-center mt-6 justify-center py-12'>
          <Lottie animationData={animationData} loop={true} autoplay={true} 
                  style={{
                    width: '80%',
                    height: '80%',
                    bottom:170,
                    objectFit: 'cover',
                    position:"absolute",
                    
                  }}
          />
          <h1 className='text-4xl font-extrabold text-center' data-aos='fade-up'>
            Spam Email Detection System
          </h1>
          <p className='text-xl text-center mt-6 px-6' data-aos='fade-up' data-aos-delay='200'>
            An innovative approach to distinguishing spam from legitimate emails using machine learning.
          </p>
          <p className='w-3/4 text-lg text-center mt-6 opacity-90' data-aos='fade-up' data-aos-delay='400'>
            This project aims to build an intelligent spam detection system leveraging the Naive Bayes algorithm. The system efficiently categorizes emails as either "ham" (non-spam) or "spam" (unwanted), optimizing email management and enhancing user productivity.
          </p>
        </div>

        {/* Dataset Section */}
        <div id='section-2' className='min-h-screen w-full flex flex-col items-center justify-start py-12'>
          <h2 className='text-3xl font-semibold text-center mb-6' data-aos='fade-up'>
            Dataset Snapshot
          </h2>
          <div className='flex justify-center mt-10'>
            {data.length > 0 ? (
              <table className='min-w-full table-auto border-separate border-spacing-2' data-aos='zoom-in' data-aos-delay='200'>
                <thead>
                  <tr className='bg-gradient-to-r from-gray-700 to-gray-600'>
                    {Object.keys(data[0]).map((key, index) => (
                      <th key={index} className='text-white py-3 px-6'>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className='text-gray-200'>
                      {Object.values(row).map((value, cellIndex) => (
                        <td key={cellIndex} className='border-b-2 py-2 px-4'>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className='mt-4 text-center' data-aos='fade-up' data-aos-delay='400'>Loading data...</p>
            )}
          </div>

          <div className='mt-2 w-full max-w-2xl text-center'>
            <h3 className='text-2xl font-semibold mb-4' data-aos='fade-up' data-aos-delay='600'>
              Dataset Columns Explanation
            </h3>
            <p className='text-lg text-gray-300' data-aos='fade-up' data-aos-delay='800'>
              The dataset used in this project contains multiple columns that are vital for determining whether an email is "spam" or "ham" (non-spam). Below is an overview of the key columns in the dataset:
            </p>
            <ul className='list-disc list-inside text-left mt-6'>
              <li className='text-lg text-gray-300' data-aos='fade-up' data-aos-delay='1000'>
                <strong>Message:</strong> The content of the email message, which will be analyzed for spam indicators.
              </li>
              <li className='text-lg text-gray-300' data-aos='fade-up' data-aos-delay='1200'>
                <strong>Category:</strong> The label for the email, which is either "ham" (non-spam) or "spam" (unwanted). This column serves as the target variable for the model.
              </li>
            </ul>
          </div>
        </div>

        {/* Graph Section */}
        <div id='section-3' className='min-h-screen w-full flex flex-col items-center justify-center py-12 bg-gradient-to-r from-black via-gray-900 to-gray-800'>
          <h2 className='text-3xl font-semibold text-center mb-6 text-white' data-aos='fade-up'>
            Spam Detection Over Time
          </h2>
          <div className='w-full ml-60 max-w-3xl' data-aos='zoom-in' data-aos-delay='200'>
            <Line data={graphData} options={graphOptions} />
          </div>
          <div className='mt-12 w-full max-w-3xl text-left' data-aos='fade-up' data-aos-delay='600'>
            <h3 className='text-2xl font-semibold mb-4 text-white'>Key Takeaways from the Graph</h3>
            <ul className='list-disc list-inside text-left text-lg text-gray-300'>
              <li data-aos='fade-up' data-aos-delay='800'>
                The model’s accuracy increases over time, showing that more data and longer training periods lead to improved spam detection.
              </li>
              <li data-aos='fade-up' data-aos-delay='1000'>
                Initially, the model struggles to correctly classify emails, but this improves drastically as more features are incorporated into the training process.
              </li>
              <li data-aos='fade-up' data-aos-delay='1200'>
                After reaching an optimal accuracy level, the graph plateaus, suggesting the model has reached its performance limit given the current dataset and features.
              </li>
              <li data-aos='fade-up' data-aos-delay='1400'>
                Future improvements might involve expanding the dataset or utilizing advanced techniques such as deep learning for even higher accuracy.
              </li>
            </ul>
          </div>
        </div>

        {/* Test Component */}
        <div id='section-4'>
          <Test />
        </div>
      </div>
    </div>
  );
}

export default Home;
