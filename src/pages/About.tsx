import { Button } from '@mui/material';

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 max-w-xl w-full text-center">
        <h1 className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 mb-4">
          About
        </h1>
        <Button
          href="https://loan-calculator-eta-murex.vercel.app/"
          className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
        >
          Live Link
        </Button>
      </div>
    </div>
  );
}
