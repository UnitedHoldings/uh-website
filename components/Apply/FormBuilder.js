import { useState, useEffect } from "react";
import DynamicFormField from "./DynamicFormField";

const FormBuilder = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [savedData, setSavedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    fetchFormCategories();
  }, []);

  const fetchFormCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://uh-server-staging-688256516165.asia-east1.run.app/api/form-categories"
      );
      const result = await response.json();

      if (result.success) {
        setCategories(result.data);
        if (result.data.length > 0) {
          setSelectedCategory(result.data[0]);
        }
      } else {
        setError("Failed to load form categories");
      }
    } catch (err) {
      setError("Error fetching form categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFormData({});
    setSavedData(null);
  };

  const handleFieldChange = (fieldKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldKey]: value,
    }));
  };

  const handleSaveProcess = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      // Transform formData to match the backend FormField structure
      const formFields = Object.entries(formData).map(([key, value]) => {
        const field = selectedCategory?.formFields.find(
          (f) => f.fieldKey === key
        );
        return {
          fieldKey: key,
          label: field?.label || key,
          value: value,
          type: field?.type || "text",
        };
      });

      const applicationData = {
        product: selectedCategory?.categoryName || "",
        formFields: formFields,
        companyCode: "", // Optional: can be set based on category
      };

      const response = await fetch(
        "https://uh-server-staging-688256516165.asia-east1.run.app/api/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applicationData),
        }
      );

      const result = await response.json();

      if (result.success) {
        const processedData = {
          category: selectedCategory?.categoryName,
          categoryKey: selectedCategory?.categoryKey,
          submittedAt: new Date().toLocaleString(),
          formData: formData,
        };
        setSavedData(processedData);
        setFormData({});
      } else {
        setSubmitError(result.message || "Failed to submit application");
      }
    } catch (err) {
      setSubmitError("Error submitting application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getFieldLabel = (fieldKey) => {
    const field = selectedCategory?.formFields.find(
      (f) => f.fieldKey === fieldKey
    );
    return field?.label || fieldKey;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading forms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Category Pills */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
          Select Category
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 transform hover:scale-105 ${
                selectedCategory?._id === category._id
                  ? "bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:border hover:border-[#9b1c20]"
              }`}
            >
              {category.categoryName}
            </button>
          ))}
        </div>
      </div>

      {/* Form Container */}
      {selectedCategory && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-oswald">
              {selectedCategory.categoryName}
            </h2>
            <p className="text-gray-600 text-lg">{selectedCategory.description}</p>
          </div>

          <form onSubmit={handleSaveProcess} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedCategory.formFields
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((field) => (
                  <div
                    key={field.fieldKey}
                    className={field.type === "textarea" ? "md:col-span-2" : ""}
                  >
                    <DynamicFormField
                      field={field}
                      value={formData[field.fieldKey] || ""}
                      onChange={(value) =>
                        handleFieldChange(field.fieldKey, value)
                      }
                    />
                  </div>
                ))}
            </div>

            <div className="pt-6 border-t border-gray-200">
              {submitError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{submitError}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#9b1c20] to-[#7a1619] text-white hover:shadow-xl transform hover:scale-[1.02]"
                }`}
              >
                {submitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  "Save & Process Application"
                )}
              </button>
            </div>
          </form>

          {/* Saved Data Display */}
          {savedData && (
            <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-900 font-oswald">
                  Application Processed Successfully!
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-green-200">
                  <span className="font-semibold text-gray-700">Category:</span>
                  <span className="text-gray-900 font-medium">{savedData.category}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-green-200">
                  <span className="font-semibold text-gray-700">
                    Submitted At:
                  </span>
                  <span className="text-gray-900 font-medium">{savedData.submittedAt}</span>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">
                    Application Details:
                  </h4>
                  <div className="bg-white rounded-lg p-4 space-y-3 border border-gray-200">
                    {Object.entries(savedData.formData).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="font-medium text-gray-600 capitalize">
                          {getFieldLabel(key)}:
                        </span>
                        <span className="text-gray-900 text-right ml-4 font-medium">
                          {String(value) || "Not provided"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-green-200">
                <p className="text-sm text-green-700 text-center">
                  Thank you for your application! Our team will review it and contact you shortly.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Categories Message */}
      {!loading && categories.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Forms Available</h3>
          <p className="text-gray-600">There are currently no application forms available.</p>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;