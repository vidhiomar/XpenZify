import { motion } from 'framer-motion';

function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-primary mb-4">Coming Soon</h1>
        <p className="text-xl text-gray-600">
          We're working hard to bring you something amazing!
        </p>
      </motion.div>
    </div>
  );
}

export default ComingSoon;