import React, { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
      setEmail("");
    } else {
      setError(data.error || "Algo salió mal. Intenta nuevamente.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          ¿Quieres estar informado sobre GETINDYCA?
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Enviando..." : "Quiero estar informado"}
          </button>
        </form>
        {success && (
          <p className="mt-4 text-green-600 text-sm text-center">
            ✅ Gracias. Revisa tu correo para confirmar tu suscripción.
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-sm text-center">❌ {error}</p>
        )}
      </div>
    </div>
  );
}
