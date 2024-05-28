import { Link } from "react-router-dom";

export default function ThankyouPage() {
  return (
    <div className="thankpage">
      <h1>Thank you for your purchase, visit us again</h1>
      <Link to="/" className="btn-place-order">
        Home
      </Link>
    </div>
  );
}
