import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      const response = await fetch("https://api.mailersend.com/v1/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mlsn.e26b5e350124c21c42e9b30a3bf9bd1476caefc2005fdb999beff304a707ace9",
        },
        body: JSON.stringify({
          from: { email: "no-reply@getindyca.com", name: "GETINDYCA Team" },
          to: [{ email, name: "Usuario Getindyca" }],
          subject: "Gracias por unirte a GETINDYCA 💚",
          text: "Tu suscripción ha sido registrada correctamente. Te mantendremos informado.",
          html: "<p>Hola,</p><p>Gracias por suscribirte a <strong>GETINDYCA</strong>. Te mantendremos informado con todas las novedades.</p><p>¡Un abrazo del equipo! 💚</p>",
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setEmail("");
      } else throw new Error("No se pudo enviar el email");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Suscríbete a GETINDYCA</h1>
      <p style={{ marginBottom: "1rem", maxWidth: "400px" }}>
        Introduce tu correo para recibir las novedades del proyecto más revolucionario del siglo XXI.
      </p>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Tu email" style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "4px", border: "1px solid #ccc" }} />
        <button type="submit" style={{ width: "100%", background: "black", color: "white", padding: "0.5rem", borderRadius: "4px" }}>
          Quiero estar informado
        </button>
      </form>
      {success && <p style={{ color: "green", marginTop: "1rem" }}>✅ Email de confirmación enviado correctamente.</p>}
      {error && <p style={{ color: "red", marginTop: "1rem" }}>❌ Ha ocurrido un error. Inténtalo de nuevo.</p>}
    </div>
  );
}
