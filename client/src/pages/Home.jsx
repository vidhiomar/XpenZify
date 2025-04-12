import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi';

function Home() {
  const [showUserType, setShowUserType] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const navigate = useNavigate();

  const handleUserTypeClick = () => {
    setShowUpload(true);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    navigate('/coming-soon');
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-yellow-900/20 via-black to-black"></div>
        
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative z-10">
          <motion.div 
            className="lg:w-1/2 text-left mb-12 lg:mb-0"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-6xl font-bold text-yellow-500 mb-6">
              Empower Your
              <span className="block text-yellow-400">Finance</span>
            </h1>
            <p className="text-xl text-yellow-100/80 mb-8 max-w-lg">
              Transform your financial management with AI-powered insights and intelligent analytics
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserType(true)}
              className="bg-yellow-500 text-black px-8 py-4 rounded-full hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 font-semibold"
            >
              Get Started
            </motion.button>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 grid grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="col-span-2">
              <div className="bg-gray-900 rounded-2xl p-6 shadow-[0_4px_20px_rgba(234,179,8,0.1)] hover:shadow-[0_4px_20px_rgba(234,179,8,0.2)] transition-shadow duration-300 border border-yellow-500/20">
                <div className="flex items-center justify-between mb-4">
                  <FiTrendingUp className="text-yellow-500 text-2xl" />
                  <span className="text-sm text-yellow-100/60">Last 30 days</span>
                </div>
                <h3 className="text-lg font-semibold text-yellow-500">Smart Analytics</h3>
                <p className="text-yellow-100/80">Real-time insights for better financial decisions</p>
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 shadow-[0_4px_20px_rgba(234,179,8,0.1)] hover:shadow-[0_4px_20px_rgba(234,179,8,0.2)] transition-shadow duration-300 border border-yellow-500/20">
              <FiBarChart2 className="text-yellow-500 text-2xl mb-4" />
              <h3 className="text-lg font-semibold text-yellow-500">Investment Tracking</h3>
              <p className="text-yellow-100/80">Monitor your portfolio growth</p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 shadow-[0_4px_20px_rgba(234,179,8,0.1)] hover:shadow-[0_4px_20px_rgba(234,179,8,0.2)] transition-shadow duration-300 border border-yellow-500/20">
              <FiPieChart className="text-yellow-500 text-2xl mb-4" />
              <h3 className="text-lg font-semibold text-yellow-500">Expense Analysis</h3>
              <p className="text-yellow-100/80">Understand your spending patterns</p>
            </div>
          </motion.div>
        </div>
      </section>

      {showUserType && (
        <motion.section 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-gray-900 p-8 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.2)] max-w-md w-full mx-4 border border-yellow-500/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-3xl font-bold text-yellow-500 mb-8 text-center">Choose Your Account Type</h2>
            <div className="space-y-4">
              <button
                onClick={handleUserTypeClick}
                className="w-full bg-yellow-500 text-black py-4 rounded-xl hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 font-semibold"
              >
                Company Account
              </button>
              <button
                onClick={handleUserTypeClick}
                className="w-full bg-gray-800 text-yellow-500 py-4 rounded-xl hover:bg-gray-700 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)] transition-all duration-300 font-semibold border border-yellow-500/30"
              >
                Individual Account
              </button>
            </div>
          </motion.div>
        </motion.section>
      )}

      {showUpload && (
        <motion.section 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-gray-900 p-8 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.2)] max-w-md w-full mx-4 border border-yellow-500/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-3xl font-bold text-yellow-500 mb-8 text-center">Upload Your Document</h2>
            <form onSubmit={handleFileUpload} className="space-y-6">
              <div className="border-2 border-dashed border-yellow-500/30 p-8 rounded-xl hover:border-yellow-500/50 transition-colors duration-300">
                <input
                  type="file"
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer text-yellow-100/60 flex flex-col items-center"
                >
                  <span className="text-yellow-500 mb-2">Click to upload</span>
                  <span>or drag and drop your files here</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black py-4 rounded-xl hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 font-semibold"
              >
                Upload & Continue
              </button>
            </form>
          </motion.div>
        </motion.section>
      )}
    </div>
  );
}

export default Home;