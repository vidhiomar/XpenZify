import { motion } from 'framer-motion';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-primary mb-8 text-center"
        >
          About XpenZify
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <p className="text-gray-600 mb-6">
            XpenZify is a cutting-edge financial intelligence platform designed to revolutionize
            how individuals and companies manage their finances. Our platform combines advanced
            analytics with user-friendly interfaces to provide meaningful insights into your
            financial data.
          </p>
          <p className="text-gray-600">
            Whether you're a growing business or an individual looking to better manage your
            finances, XpenZify provides the tools and insights you need to make informed
            financial decisions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default About;