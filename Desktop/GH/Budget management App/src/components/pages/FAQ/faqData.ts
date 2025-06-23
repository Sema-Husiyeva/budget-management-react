export interface IFAQItem {
  question: string;
  answer: string;
}

const faqData: IFAQItem[] = [
  {
    question: "Why should I choose Budget app to manage my budget?",
    answer: "Budget app helps you track your expenses, create budgets, and reach your financial goals easily."
  },
  {
    question: "Is using Budget app free?",
    answer: "Yes, Budget offers a free version with core features. Premium features are also available."
  },
  {
    question: "How can I register on the app?",
    answer: "Download the app and follow the sign-up instructions using your email or Google account."
  },
  {
    question: "What operations can I perform?",
    answer: "You can add, edit, and delete transactions, create budgets, and view financial reports."
  },
  {
    question: "Which devices support the app?",
    answer: "The app is available on iOS, Android, and via web browsers on desktop."
  },
  {
    question: "What should I do if my expenses exceed my income?",
    answer: "Review your expenses, adjust your budget, and consider setting spending limits."
  },
  {
    question: "What to do when transaction currency differs from selected settings?",
    answer: "You can manually update the currency or use the currency converter inside the app."
  },
  {
    question: "What should I do with recurring transactions?",
    answer: "You can set them as recurring and the app will automatically log them for you."
  },
  {
    question: "How can I protect my account and secure my data?",
    answer: "Enable two-factor authentication and regularly update your password."
  },
  {
    question: "How can I delete my user account?",
    answer: "Go to Settings > Account > Delete Account and follow the instructions."
  }
];

export default faqData;