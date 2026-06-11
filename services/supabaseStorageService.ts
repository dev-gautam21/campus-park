import { supabase } from './supabaseClient';
import { ParkingSlot, ParkingZone } from '../types';

export const supabaseStorageService = {
  /* -------------------- SLOTS -------------------- */

  // Load all slots
  loadSlots: async (): Promise<ParkingSlot[]> => {
    try {
      const { data, error } = await supabase
        .from('slots')
        .select('*')
        .order('number', { ascending: true });

      if (error) throw error;

      return (data || []).map((slot: any) => ({
        id: slot.id,
        number: slot.number,
        zone: slot.zone,
        status: slot.status,
        updatedAt: slot.updated_at,
        assignedTo: slot.assigned_to,
      }));
    } catch (error) {
      console.error('Supabase — Error loading slots:', error);
      return [];
    }
  },

  // Add a new slot
  addSlot: async (slot: ParkingSlot) => {
    try {
      const { data, error } = await supabase
        .from('slots')
        .insert({
          number: slot.number,
          zone: slot.zone,
          status: slot.status,
          updated_at: slot.updatedAt,
          assigned_to: slot.assignedTo || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Supabase — Error adding slot:', error);
    }
  },

  // Update slot (reserve / free)
  updateSlot: async (id: string, updates: Partial<ParkingSlot>) => {
    try {
      const mapped: Record<string, any> = {};
      if (updates.status !== undefined) mapped.status = updates.status;
      if (updates.updatedAt !== undefined) mapped.updated_at = updates.updatedAt;
      if (updates.assignedTo !== undefined) mapped.assigned_to = updates.assignedTo;
      if (updates.number !== undefined) mapped.number = updates.number;
      if (updates.zone !== undefined) mapped.zone = updates.zone;

      const { data, error } = await supabase
        .from('slots')
        .update(mapped)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Supabase — Error updating slot:', error);
    }
  },

  // Delete slot
  deleteSlot: async (id: string) => {
    try {
      const { error } = await supabase
        .from('slots')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Supabase — Error deleting slot:', error);
    }
  },

  /* -------------------- ZONES -------------------- */

  // Load all zones
  loadZones: async (): Promise<ParkingZone[]> => {
    try {
      const { data, error } = await supabase
        .from('zones')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      // Also fetch slot counts per zone
      const { data: slots } = await supabase
        .from('slots')
        .select('zone');

      const slotCounts: Record<string, number> = {};
      (slots || []).forEach((s: any) => {
        slotCounts[s.zone] = (slotCounts[s.zone] || 0) + 1;
      });

      return (data || []).map((zone: any) => ({
        id: zone.id,
        name: zone.name,
        description: zone.description || '',
        totalSlots: slotCounts[zone.id] || 0,
      }));
    } catch (error) {
      console.error('Supabase — Error loading zones:', error);
      return [];
    }
  },

  // Add zone
  addZone: async (name: string, description: string = '') => {
    try {
      const { data, error } = await supabase
        .from('zones')
        .insert({ name, description })
        .select()
        .single();

      if (error) throw error;

      // Map to match what App.tsx expects (it reads _id for MongoDB compat)
      return { _id: data.id, name: data.name, description: data.description };
    } catch (error) {
      console.error('Supabase — Error adding zone:', error);
      return null;
    }
  },
};
