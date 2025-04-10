"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SupportMessage {
  name: string;
  email: string;
  feedbackText: string;
  starRating: number;
}

interface SupportThread {
  _id: string;
  createdAt: string;
  messages: SupportMessage[];
}

interface FeedbackItem extends SupportMessage {
  _id?: string;
  createdAt: string;
  threadId: string;
}

const AdminDashboard = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch("http://localhost:3000/customerSupport");
        if (!res.ok) throw new Error("Failed to fetch feedback");
  
        const threads = await res.json();
  
        const flattenedMessages: FeedbackItem[] = (threads as SupportThread[]).flatMap((thread) =>
          thread.messages.map((msg) => ({
            ...msg,
            createdAt: thread.createdAt,
            threadId: thread._id,
          }))
        );
  
        setFeedbackList(flattenedMessages);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchFeedback();
  }, []);

  const navButtonStyle = `font-sans 
                       font-weight-thin 
                       text-xl 
                       text-[#F0E7A1]
                       m-2
                       rounded-sm 
                       btn-soft 
                       md:subpixel-antialiased 
                       hover:bg-[#F0E7A1] 
                       hover:text-[#1A1A1A]
                       transition 
                       delay-150 
                       duration-100
                       ease-in-out 
                       hover:-translate-y-1`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xl ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#F0E7A1]">
      {/* Header */}
      <div className="navbar bg-black shadow-sm text-xl">
        <div className="m-2 flex-1">
          <Button variant="ghost" className={navButtonStyle}>
            <Link to="/Portfolio">W4LLET</Link>
          </Button>
        </div>
        <Button variant="ghost" className="text-white">
          <Link to="/CustomerSupport">Customer Support</Link>
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm p-4">
          <h2 className="text-xl font-semibold mb-4 text-neutral-800">Admin</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-neutral-800 hover:bg-neutral-100"
                >
                  Feedback Reviews
                </Button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-neutral-800">
              Customer Feedback{" "}
              {loading
                ? "(Loading...)"
                : `(${feedbackList.length})`}
            </h2>

            {error && (
              <p className="text-red-600 font-medium mb-4">
                Error: {error}
              </p>
            )}

            <div className="space-y-4">
              {feedbackList.map((item) => (
                <div
                  key={item._id}
                  className="p-6 bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800">
                        {item.name}
                      </h3>
                      <p className="text-neutral-600">{item.email}</p>
                      <p className="text-sm text-neutral-500 mt-1">
                        Submitted on: {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(item.starRating)}
                      <span className="text-lg font-medium text-neutral-800">
                        {item.starRating}/5
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium text-neutral-800 mb-2">
                      Feedback:
                    </h4>
                    <p className="text-neutral-800 whitespace-pre-line bg-neutral-100 p-3 rounded">
                      {item.feedbackText || "No feedback text provided"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
