"use client";
import * as React from "react";
import axios from "axios";

export const Feedback: React.FC = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    feedbackText: "",
    starRating: "5"
  });

  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/customerSupport/create-thread", {
        name: formData.name,
        email: formData.email,
        starRating: Number(formData.starRating),
        feedbackText: formData.feedbackText
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      alert("There was an error submitting your feedback.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center h-full overflow-y-auto">
        <div className="text-center p-8 bg-neutral-100 rounded-lg my-8">
          <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
          <p className="text-neutral-600 mb-4">
            Your feedback has been received. We appreciate your input.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2 bg-black text-[#F0E7A1] rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-neutral-100 rounded-lg p-8 my-8">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Share Your Feedback
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="starRating"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Rating
              </label>
              <select
                id="starRating"
                name="starRating"
                value={formData.starRating}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="feedbackText"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Your Feedback
              </label>
              <textarea
                id="feedbackText"
                name="feedbackText"
                value={formData.feedbackText}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Tell us about your experience..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-black text-[#F0E7A1] rounded-lg hover:bg-neutral-800 transition-colors font-semibold"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
