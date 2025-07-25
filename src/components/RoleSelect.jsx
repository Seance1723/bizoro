// A reusable dropdown for role selection (if you want to use it in multiple places)
import React from "react";

export default function RoleSelect({ value, onChange }) {
  return (
    <select name="role_id" value={value} onChange={onChange}>
      <option value="1">Buyer</option>
      <option value="2">Vendor</option>
    </select>
  );
}
