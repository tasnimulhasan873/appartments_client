import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApartmentDetails from "../../../hooks/useApartmentDetails";

const ApartmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: apartment, isLoading, error } = useApartmentDetails(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-white text-xl">Loading apartment details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-danger text-xl font-bold">
          Error loading apartment details.
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-danger text-xl font-bold">
          Apartment not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary p-8">
      <div className="glass-dark rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-primary">
          {apartment.buildingName || "Apartment Details"}
        </h1>
        <p className="mb-6 text-muted">
          <span className="font-mono text-secondary">{apartment._id}</span>
        </p>
        <div className="mb-4">
          <strong>Location:</strong> {apartment.area}, {apartment.city}
        </div>
        <div className="mb-4">
          <strong>Owner:</strong> {apartment.ownerName}
        </div>
        <div className="mb-4">
          <strong>Rent:</strong> ৳{apartment.rent?.toLocaleString()} /month
        </div>
        <button className="btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ApartmentDetails;
