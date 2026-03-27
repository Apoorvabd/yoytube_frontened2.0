import React, { useEffect, useState } from "react";

function EditComments({
  initialValue = "",
  loading = false,
  onSave,
  onCancel,
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    const finalValue = value.trim();
    if (!finalValue) return;
    onSave?.(finalValue);
  };

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        rows={3}
        className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-500"
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading || !value.trim()}
          className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditComments;
