import React, { useEffect, useState } from "react";
import { addProduct, listProducts, updateProduct, deleteProduct, uploadProductImage } from "../../api/product";

export default function VendorProductPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", quantity: "", image: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (user.id && user.role_id == 2) {
      listProducts(user.id).then(setProducts);
    }
  }, [user.id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = async e => {
    const file = e.target.files[0];
    if (file) {
      const res = await uploadProductImage(file);
      if (res.success) setForm(f => ({ ...f, image: res.url }));
      else alert(res.error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = { vendor_id: user.id, ...form };
    if (editId) {
      await updateProduct({ ...data, id: editId });
    } else {
      await addProduct(data);
    }
    setForm({ name: "", description: "", price: "", quantity: "", image: "" });
    setEditId(null);
    listProducts(user.id).then(setProducts);
  };

  const handleEdit = p => {
    setForm({ ...p });
    setEditId(p.id);
  };

  const handleDelete = async id => {
    await deleteProduct(id, user.id);
    listProducts(user.id).then(setProducts);
  };

  if (!user.id || Number(user.role_id) !== 2) return <div>Vendor access only</div>;

  return (
    <div>
      <h2>Your Products</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="price" placeholder="Price" value={form.price} type="number" onChange={handleChange} required />
        <input name="quantity" placeholder="Quantity" value={form.quantity} type="number" onChange={handleChange} required />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {form.image && <img src={form.image} alt="product" style={{ height: 40 }} />}
        <button type="submit">{editId ? "Update" : "Add"} Product</button>
      </form>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.image && <img src={p.image} alt="" style={{ height: 30 }} />}
            {p.name} - ₹{p.price} (Qty: {p.quantity})
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
