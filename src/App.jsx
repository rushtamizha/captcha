import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, 
  TrendingUp, 
  Wallet, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Trophy,
  Zap,
  DollarSign
} from 'lucide-react';

export default function CaptchaEarningApp() {
  const [captcha, setCaptcha] = useState('');
  const [userInput, setUserInput] = useState('');
  const [points, setPoints] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [withdrawTimer, setWithdrawTimer] = useState(5);
  const [streak, setStreak] = useState(0);

  const MINIMUM_WITHDRAW = 50;
  const POINTS_PER_CAPTCHA = 5;

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
    setUserInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAttempts(attempts + 1);

    if (userInput === captcha) {
      const earnedPoints = POINTS_PER_CAPTCHA + (streak > 0 ? streak : 0);
      setPoints(points + earnedPoints);
      setStreak(streak + 1);
      setMessage(`🎉 Correct! +${earnedPoints} points! ${streak > 2 ? `🔥 ${streak} streak!` : ''}`);
      setMessageType('success');
      generateCaptcha();
      
      setTimeout(() => setMessage(''), 3000);
    } else {
      setStreak(0);
      setMessage('❌ Incorrect! Try again.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  const handleVerifyUPI = () => {
    if (!upiId || !upiId.includes('@')) {
      setMessage('⚠️ Please enter a valid UPI ID');
      setMessageType('error');
      return;
    }

    setIsVerifying(true);
    setCanWithdraw(false);
    setWithdrawTimer(5);

    const interval = setInterval(() => {
      setWithdrawTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsVerifying(false);
          setCanWithdraw(true);
          setMessage('✅ UPI Verified! You can now withdraw.');
          setMessageType('success');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleWithdraw = () => {
    if (points >= MINIMUM_WITHDRAW && canWithdraw) {
      // Replace with your Telegram channel link
      const telegramChannel = 'https://telegram.me/powerhouse700'; // CHANGE THIS TO YOUR CHANNEL
      
      setMessage(`🎊 Redirecting to Telegram for withdrawal...`);
      setMessageType('success');
      
      // Redirect to Telegram channel after 1 second
      setTimeout(() => {
        window.open(telegramChannel, '_blank');
        
        // Reset after redirect
        setPoints(0);
        setShowWithdraw(false);
        setUpiId('');
        setCanWithdraw(false);
        setMessage('');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl relative z-10"
      >
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
                <Trophy className="text-white" size={24} />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Rupees</p>
                <p className="text-3xl font-bold text-white">₹{points}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl">
                <Zap className="text-white" size={24} />
              </div>
              <div>
                <p className="text-white/60 text-sm">Attempts</p>
                <p className="text-3xl font-bold text-white">{attempts}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-white/60 text-sm">Streak</p>
                <p className="text-3xl font-bold text-white">{streak} 🔥</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Captcha Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Solve Captcha</h2>
            </div>

            {/* Captcha Display */}
            <motion.div
              key={captcha}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              className="relative mb-6 bg-gradient-to-br from-white to-gray-100 rounded-2xl p-8 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl" />
              <div className="relative">
                <p className="text-4xl font-bold text-center tracking-wider select-none"
                   style={{
                     fontFamily: 'monospace',
                     letterSpacing: '8px',
                     textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                     background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent'
                   }}>
                  {captcha}
                </p>
              </div>
            </motion.div>

            <button
              onClick={generateCaptcha}
              className="w-full mb-4 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw size={20} />
              New Captcha
            </button>

            <div className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter captcha here..."
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 text-center text-xl tracking-wider"
                autoComplete="off"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-bold text-lg shadow-lg"
              >
                Submit & Earn {POINTS_PER_CAPTCHA} Points
              </motion.button>
            </div>

            {/* Message */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-4 rounded-xl flex items-center gap-2 ${
                    messageType === 'success' 
                      ? 'bg-green-500/20 border border-green-400/30 text-green-200' 
                      : 'bg-red-500/20 border border-red-400/30 text-red-200'
                  }`}
                >
                  {messageType === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  <span className="font-semibold">{message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Withdrawal Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <Wallet className="text-green-400" size={24} />
              <h2 className="text-2xl font-bold text-white">Withdraw Earnings</h2>
            </div>

            <div className="mb-6 p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70">Available Balance</span>
                <DollarSign className="text-green-400" size={20} />
              </div>
              <p className="text-4xl font-bold text-white">₹{points}</p>
              <p className="text-sm text-white/60 mt-2">
                Minimum withdrawal: ₹{MINIMUM_WITHDRAW}
              </p>
              <div className="mt-3 bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((points / MINIMUM_WITHDRAW) * 100, 100)}%` }}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                />
              </div>
            </div>

            {!showWithdraw ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowWithdraw(true)}
                disabled={points < MINIMUM_WITHDRAW}
                className={`w-full px-6 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${
                  points >= MINIMUM_WITHDRAW
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                    : 'bg-gray-500/50 cursor-not-allowed'
                }`}
              >
                {points >= MINIMUM_WITHDRAW ? 'Withdraw Now' : `Earn ${MINIMUM_WITHDRAW - points} more points`}
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID (e.g., user@paytm)"
                  className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                {!isVerifying && !canWithdraw && (
                  <button
                    onClick={handleVerifyUPI}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-white font-bold shadow-lg transition-all"
                  >
                    Verify UPI ID
                  </button>
                )}

                {isVerifying && (
                  <div className="p-6 bg-yellow-500/20 border border-yellow-400/30 rounded-xl text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-yellow-400 border-t-transparent mb-3" />
                    <p className="text-white font-semibold">Verifying UPI...</p>
                    <p className="text-white/70 text-sm mt-2">Please wait {withdrawTimer} seconds</p>
                  </div>
                )}

                {canWithdraw && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWithdraw}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.37-.49 1.02-.74 4-1.74 6.68-2.88 8.03-3.43 3.82-1.59 4.61-1.87 5.13-1.87.11 0 .37.03.53.17.14.11.17.27.19.38.01.06.03.24.01.38z"/>
                    </svg>
                    Join Telegram to Withdraw ₹{points}
                  </motion.button>
                )}

                <button
                  onClick={() => {
                    setShowWithdraw(false);
                    setUpiId('');
                    setCanWithdraw(false);
                    setIsVerifying(false);
                  }}
                  className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl text-white font-semibold transition-all"
                >
                  Cancel
                </button>
              </motion.div>
            )}

            {/* Earnings Info */}
            <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
              <h3 className="text-white font-semibold mb-3">💡 Earning Tips</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Base reward: {POINTS_PER_CAPTCHA} rupess per captcha</li>
                <li>• Build streaks for bonus rupees! 🔥</li>
                <li>• Minimum withdrawal: ₹{MINIMUM_WITHDRAW}</li>
                <li>• Instant UPI withdrawals available</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}