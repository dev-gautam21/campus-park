/**
 * Storage Service — Backend Switcher
 *
 * Uses VITE_BACKEND env var to decide which backend to use:
 *   - 'supabase' (default) → Direct Supabase SDK calls (fast, no cold starts)
 *   - 'express'            → Existing Express/MongoDB API on localhost:5001
 */

import { ParkingSlot, ParkingZone } from '../types';
import { supabaseStorageService } from './supabaseStorageService';

const BACKEND = import.meta.env.VITE_BACKEND || 'supabase';
const API_BASE = 'http://localhost:5001/api';

/* -------------------- EXPRESS (MongoDB) SERVICE -------------------- */
const expressStorageService = {
  loadSlots: async (): Promise<ParkingSlot[]> => {
    try {
      const res = await fetch(`${API_BASE}/slots`);
      if (!res.ok) throw new Error('Failed to load slots');
      const data = await res.json();
      return data.map((slot: any) => ({
        ...slot,
        id: slot._id,
      }));
    } catch (error) {
      console.error('Error loading slots:', error);
      return [];
    }
  },

  addSlot: async (slot: ParkingSlot) => {
    try {
      const res = await fetch(`${API_BASE}/slots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slot),
      });
      return await res.json();
    } catch (error) {
      console.error('Error adding slot:', error);
    }
  },

  updateSlot: async (id: string, data: Partial<ParkingSlot>) => {
    try {
      const res = await fetch(`${API_BASE}/slots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      console.error('Error updating slot:', error);
    }
  },

  deleteSlot: async (id: string) => {
    try {
      await fetch(`${API_BASE}/slots/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  },

  loadZones: async (): Promise<ParkingZone[]> => {
    try {
      const res = await fetch(`${API_BASE}/zones`);
      if (!res.ok) throw new Error('Failed to load zones');
      const data = await res.json();
      return data.map((zone: any) => ({
        ...zone,
        id: zone._id,
      }));
    } catch (error) {
      console.error('Error loading zones:', error);
      return [];
    }
  },

  addZone: async (name: string, description: string = '') => {
    try {
      const res = await fetch(`${API_BASE}/zones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      if (!res.ok) {
        throw new Error('Failed to add zone');
      }
      return await res.json();
    } catch (error) {
      console.error('Error adding zone:', error);
      return null;
    }
  },
};

/* -------------------- EXPORT ACTIVE SERVICE -------------------- */

export const storageService =
  BACKEND === 'express' ? expressStorageService : supabaseStorageService;

console.log(`🔌 CampusPark backend: ${BACKEND.toUpperCase()}`);