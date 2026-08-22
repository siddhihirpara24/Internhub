import { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axiosInstance";

export const ProfileContext = createContext();

const API_ORIGIN = "http://localhost:8081"; // your Spring Boot backend origin

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({ name: "", photoUrl: "" });

  const refreshProfile = useCallback(async () => {
    try {
      const res = await api.get("/student/profile");
      const photoUrl = res.data.photoUrl
        ? `${API_ORIGIN}${res.data.photoUrl}`
        : "";
      setProfile({ name: res.data.name, photoUrl });
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  return (
    <ProfileContext.Provider value={{ profile, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};