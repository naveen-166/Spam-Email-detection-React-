import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { Line } from 'react-chartjs-2';
import Lottie  from 'lottie-react';
import animationData from './assets/mail.json';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Test from './Test';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 500 }); // Initialize AOS with a faster default animation duration
    fetch('/src/assets/spam.csv')
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          complete: (result) => {
            const firstFiveRows = result.data.slice(0, 5);
            setData(firstFiveRows);
          },
          skipEmptyLines: true,
        });
      })
      .catch(error => {
        console.error('Error fetching or parsing the CSV file:', error);
      });
  }, []);

  // Graph Data
  const graphData = {
    labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%'] ,
    datasets: [
        {
            label: 'Training Accuracy',
            data: [100.0, 99.76, 99.52, 99.34, 99.43, 99.4, 99.28, 99.25, 99.34] ,
            borderColor: '#4287f5',
            backgroundColor: 'rgba(66, 135, 245, 0.2)',
            tension: 0.1,
        },
        {
            label: 'Testing Accuracy',
            data: [96.12, 97.7, 98.13, 98.35, 98.56, 98.64, 98.64, 98.71, 98.85] ,
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

        {/* Second Section: Dataset */}
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

          {/* Add additional content */}
          <div className='mt-12 w-full max-w-2xl text-center'>
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

          {/* Category Information */}
          <div className='mt-12 w-full max-w-3xl text-left'>
            <h3 className='text-2xl font-semibold mb-4' data-aos='fade-up' data-aos-delay='2000'>
              Category Information
            </h3>
            <p className='text-lg text-gray-300' data-aos='fade-up' data-aos-delay='2200'>
              The "Category" column is crucial for training machine learning models. It is used to label emails as either "ham" (legitimate) or "spam" (unwanted). This classification helps the model understand the features associated with spam emails and make predictions based on those patterns.
            </p>
            <p className='text-lg text-gray-300 mt-4' data-aos='fade-up' data-aos-delay='2400'>
              The Naive Bayes algorithm, which is often used for text classification, relies heavily on this labeled data to calculate probabilities of each email being "ham" or "spam" based on various features such as subject, sender, and message content.
            </p>
          </div>

          {/* Insights/Conclusion Section */}
          <div className='mt-12 w-full max-w-3xl text-center'>
            <h3 className='text-2xl font-semibold mb-4' data-aos='fade-up' data-aos-delay='2600'>
              Conclusion
            </h3>
            <p className='text-lg text-gray-300' data-aos='fade-up' data-aos-delay='2800'>
              This dataset is an integral part of building an effective spam email detection system. By understanding the patterns of spam emails and using machine learning techniques like Naive Bayes, we can significantly improve email management systems, saving time and reducing risks associated with malicious emails.
            </p>
          </div>
        </div>

        {/* Third Section: Graph */}
        <div id='section-3' className='min-h-screen w-full flex flex-col items-center justify-center py-12 bg-gradient-to-r from-black via-gray-900 to-gray-800'>
          <h2 className='text-3xl font-semibold text-center mb-6 text-white' data-aos='fade-up'>
            Spam Detection Over Time
          </h2>

          {/* Graph Component */}
          <div className='w-full ml-60 max-w-3xl' data-aos='zoom-in' data-aos-delay='200'>
            <Line data={graphData} options={graphOptions} />
          </div>

          {/* Graph Insights */}
          <div className='mt-12 w-full max-w-3xl text-center' data-aos='fade-up' data-aos-delay='400'>
            <h3 className='text-2xl font-semibold mb-4 text-white'>Graph Insights</h3>
            <p className='text-lg text-gray-300'>
              The graph above illustrates the improvement of our spam detection model over time. As the model is exposed to more training data, its performance steadily increases. We can observe that in the initial stages, the accuracy is lower, but with more iterations, the model starts correctly classifying spam and ham emails with higher precision.
            </p>
            <p className='text-lg text-gray-300 mt-6'>
              The x-axis shows the training time, either by iteration or over weeks of model refinement. The y-axis represents the detection accuracy, where a higher value indicates better performance. This helps in measuring how well our algorithm generalizes to new, unseen data.
            </p>
          </div>

          {/* Key Takeaways from the Graph */}
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

          {/* Explanation of Potential Model Enhancements */}
          <div className='mt-12 w-full max-w-3xl text-center' data-aos='fade-up' data-aos-delay='1600'>
            <h3 className='text-2xl font-semibold mb-4 text-white'>Potential Enhancements for the Model</h3>
            <p className='text-lg text-gray-300'>
              While the current model demonstrates good performance, there are several ways to further enhance its capabilities:
            </p>
            <ul className='list-disc list-inside text-left text-lg text-gray-300 mt-6'>
              <li data-aos='fade-up' data-aos-delay='1800'>
                Incorporating additional features such as email metadata (e.g., sender reputation, time of email) could improve accuracy.
              </li>
              <li data-aos='fade-up' data-aos-delay='2000'>
                The use of deep learning techniques, like recurrent neural networks (RNNs) or transformers, can capture more complex patterns in the data.
              </li>
              <li data-aos='fade-up' data-aos-delay='2200'>
                Real-time model updates using fresh data could help the model adapt to new types of spam emails as they evolve.
              </li>
            </ul>
          </div>

          {/* Conclusion and Call to Action */}
          <div className='mt-16 w-full max-w-3xl text-center' data-aos='fade-up' data-aos-delay='2400'>
            <h3 className='text-2xl font-semibold mb-4 text-white'>Conclusion & Next Steps</h3>
            <p className='text-lg text-gray-300'>
              The spam detection model shows significant promise, with its performance improving steadily over time. However, there is always room for improvement. By continuously expanding the dataset and exploring new techniques, we can create a more robust and accurate system that can handle an ever-growing influx of spam emails.
            </p>
            <p className='text-lg text-gray-300 mt-6'>
              In the future, we plan to test the model with larger datasets, implement real-time spam filtering, and experiment with cutting-edge algorithms to make email systems even more efficient and secure.
            </p>
          </div>
        </div>
        <div id='section-4'>
          <Test/>

        </div>
      </div>
    </div>
  );
}

export default Home;
