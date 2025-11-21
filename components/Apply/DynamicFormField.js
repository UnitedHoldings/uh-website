const DynamicFormField = ({ field, value, onChange }) => {
  const { fieldKey, label, type, required, placeholder, helpText, selectOptions, validation } = field;

  const baseInputClasses =
    "w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#9b1c20] focus:ring-2 focus:ring-[#9b1c20]/20 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500 bg-white";

  const renderField = () => {
    switch (type) {
      case "text":
      case "email":
      case "tel":
        return (
          <input
            type={type}
            id={fieldKey}
            name={fieldKey}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            pattern={validation?.pattern || undefined}
            minLength={validation?.minLength || undefined}
            maxLength={validation?.maxLength || undefined}
            className={baseInputClasses}
          />
        );

      case "number":
        return (
          <input
            type="number"
            id={fieldKey}
            name={fieldKey}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            min={validation?.minValue || undefined}
            max={validation?.maxValue || undefined}
            className={baseInputClasses}
          />
        );

      case "date":
        return (
          <input
            type="date"
            id={fieldKey}
            name={fieldKey}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={baseInputClasses}
          />
        );

      case "textarea":
        return (
          <textarea
            id={fieldKey}
            name={fieldKey}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            minLength={validation?.minLength || undefined}
            maxLength={validation?.maxLength || undefined}
            className={`${baseInputClasses} resize-none`}
            rows={4}
          />
        );

      case "select":
        return (
          <select
            id={fieldKey}
            name={fieldKey}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={`${baseInputClasses} cursor-pointer appearance-none bg-white`}
          >
            <option value="" className="text-gray-400">
              {placeholder || "Select an option..."}
            </option>
            {selectOptions
              ?.sort((a, b) => a.displayOrder - b.displayOrder)
              .map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={fieldKey}
              name={fieldKey}
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              required={required}
              className="w-5 h-5 text-[#9b1c20] border-2 border-gray-300 rounded focus:ring-[#9b1c20] focus:ring-2"
            />
            <label htmlFor={fieldKey} className="ml-3 text-gray-700">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {selectOptions
              ?.sort((a, b) => a.displayOrder - b.displayOrder)
              .map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`${fieldKey}-${option.value}`}
                    name={fieldKey}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    className="w-4 h-4 text-[#9b1c20] border-2 border-gray-300 focus:ring-[#9b1c20] focus:ring-2"
                  />
                  <label htmlFor={`${fieldKey}-${option.value}`} className="ml-3 text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
          </div>
        );

      default:
        return (
          <input
            type="text"
            id={fieldKey}
            name={fieldKey}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={baseInputClasses}
          />
        );
    }
  };

  // For checkbox type, we handle the label differently since it's part of the control
  if (type === "checkbox") {
    return (
      <div className="space-y-2">
        {renderField()}
        {helpText && <p className="text-xs text-gray-500 mt-1 ml-8">{helpText}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {type !== "checkbox" && (
        <label htmlFor={fieldKey} className="block text-sm font-semibold text-gray-800">
          {label}
          {required && <span className="text-[#9b1c20] ml-1">*</span>}
        </label>
      )}
      {renderField()}
      {helpText && type !== "checkbox" && (
        <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded border-l-4 border-[#9b1c20]">
          {helpText}
        </p>
      )}
    </div>
  );
};

export default DynamicFormField;