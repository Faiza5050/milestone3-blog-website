"use client";

import { useState, useEffect } from "react";

const MailForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submissions, setSubmissions] = useState<
    { name: string; comment: string }[]
  >([]);
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    const storedSubmissions = localStorage.getItem("submissions");
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);

  useEffect(() => {
    if (submissions.length > 0) {
      localStorage.setItem("submissions", JSON.stringify(submissions));
    }
  }, [submissions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && comment) {
      const newSubmission = { name, comment };
      const updatedSubmissions = [...submissions, newSubmission];

      setSubmissions(updatedSubmissions);

      setName("");
      setEmail("");
      setComment("");
    } else {
      alert("Please fill in both your name and comment.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-black text-white rounded-md shadow-md mt-10">
      <h2 className="text-4xl font-bold mb-4">Comment Here</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 relative bg-cover bg-center"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-bold text-gray-400"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 text-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-400"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email not visible to anyone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 text-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-bold text-gray-400"
          >
            Comment:
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            placeholder="Write Your Comment Here..."
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 text-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 text-xl font-bold rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Post Your Comment
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-bold">All Comments</h3>

        <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-300 shadow-sm">
          {submissions.length > 0 ? (
            (showAllComments ? submissions : submissions.slice(0, 3)).map(
              (submission, index) => (
                <div key={index} className="p-4 border-b border-gray-200">
                  {submission.name && submission.comment ? (
                    <>
                      <p className="font-bold text-gray-800">
                        {submission.name}
                      </p>
                      <p className="text-gray-600">{submission.comment}</p>
                    </>
                  ) : (
                    <p className="text-red-600">Invalid submission data.</p>
                  )}
                </div>
              )
            )
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
        </div>

        {submissions.length > 3 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="mt-4 text-blue-500 hover:text-blue-700 font-bold"
          >
            {showAllComments ? "See Less" : "See More..."}
          </button>
        )}
      </div>
    </div>
  );
};

export default MailForm;
