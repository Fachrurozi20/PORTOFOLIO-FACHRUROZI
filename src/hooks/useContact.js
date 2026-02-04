"use client";

import { useEffect, useState } from "react";
import {
  getContact,
  updateContact,
} from "@/services/contact.service";

export function useContact() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContact();
  }, []);

  async function loadContact() {
    try {
      const data = await getContact();
      setContact(data);
    } finally {
      setLoading(false);
    }
  }

  async function saveContact(payload) {
    setSaving(true);

    try {
      const updated = await updateContact({
        id: contact.id,
        ...payload,
      });

      setContact(updated);
    } finally {
      setSaving(false);
    }
  }

  return {
    contact,
    loading,
    saving,
    saveContact,
  };
}
