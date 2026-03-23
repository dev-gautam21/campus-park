import { ParkingSlot, ParkingZone } from '../types';

const API_BASE = 'http://localhost:5001/api';

export const storageService = {
  /* -------------------- SLOTS -------------------- */

  // Load all slots
  loadSlots: async (): Promise<ParkingSlot[]> => {
  try {
    const res = await fetch(`${API_BASE}/slots`);
    if (!res.ok) throw new Error('Failed to load slots');

    const data = await res.json();

    // ✅ MAP _id → id
    return data.map((slot: any) => ({
      ...slot,
      id: slot._id,
    }));
  } catch (error) {
    console.error('Error loading slots:', error);
    return [];
  }
},


  // Add a new slot
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

  // Update slot (reserve / free)
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

  // Delete slot
  deleteSlot: async (id: string) => {
    try {
      await fetch(`${API_BASE}/slots/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  },

  /* -------------------- ZONES -------------------- */

  // Load all zones
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


  // // Add zone (FIXED)
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