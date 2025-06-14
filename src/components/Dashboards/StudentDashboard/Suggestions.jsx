import { useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Suggestions() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const titleChange = (e) => setTitle(e.target.value);
  const descChange = (e) => setDesc(e.target.value);

  const registerSuggestions = async (e) => {
    e.preventDefault();
    const student = JSON.parse(localStorage.getItem("student"));
    
    try {
      const response = await fetch(`${mainUri}/api/suggestion/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: student._id,
          hostel: student.hostel,
          title,
          description: desc
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success("Suggestion registered successfully");
        setTitle("");
        setDesc("");
      } else {
        toast.error("Suggestion registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const suggestionTitle = {
    name: "suggestion title",
    placeholder: "Enter suggestion title",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };

  return (
    <div className="w-full min-h-screen bg-[#f3e8ff] px-4 sm:px-6 md:px-8 py-6">
      <div className="max-w-4xl mx-auto pt-16 sm:pt-20 md:pt-24">
        <h1 className="text-[#4f46e5] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-10">
          Share Your Suggestions
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
          <form 
            onSubmit={registerSuggestions}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Input field={suggestionTitle} />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="suggestion"
                className="block text-sm font-medium text-[#4f46e5]"
              >
                Suggestion Details
              </label>
              <textarea
                id="suggestion"
                name="suggestion"
                placeholder="Describe your suggestion in detail..."
                rows="5"
                className="w-full p-3 border-2 border-[#4f46e5]/20 rounded-lg
                         text-gray-900 placeholder:text-gray-400
                         focus:ring-2 focus:ring-[#4f46e5]/50 focus:border-[#4f46e5]
                         outline-none transition duration-200
                         text-sm sm:text-base resize-y min-h-[120px]"
                onChange={descChange}
                value={desc}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4f46e5] text-white py-2.5 sm:py-3 px-5
                       rounded-lg text-base sm:text-lg font-semibold
                       hover:bg-[#4338ca] focus:ring-4 focus:ring-[#4f46e5]/50
                       transition duration-200 ease-in-out
                       disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!title.trim() || !desc.trim()}
            >
              Submit Suggestion
            </button>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="light"
        className="mt-16"
      />
    </div>
  );
}

export default Suggestions;