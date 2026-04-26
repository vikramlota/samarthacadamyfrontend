import { useState } from 'react';
import { api } from '@/lib/api';

const PHONE_REGEX = /^[6-9]\d{9}$/;

const INITIAL = {
  name: '', phone: '', email: '', course: '',
  preferredTime: '', message: '',
  website: '', // honeypot — must stay empty
};

/**
 * Form state + validation + submission for lead capture forms.
 *
 * @param {object} options
 * @param {string}   options.source     - Lead source tag (e.g. 'home-hero')
 * @param {function} options.onSuccess  - Called with API response on success
 */
export function useLeadForm({ source, onSuccess } = {}) {
  const [formData,    setFormData]    = useState(INITIAL);
  const [errors,      setErrors]      = useState({});
  const [isSubmitting,setIsSubmitting]= useState(false);
  const [isSuccess,   setIsSuccess]   = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const validate = () => {
    const e = {};
    if (!formData.name?.trim() || formData.name.trim().length < 2) {
      e.name = 'Please enter your name';
    }
    const clean = formData.phone.replace(/^(\+91|91)/, '').replace(/[\s-]/g, '');
    if (!PHONE_REGEX.test(clean)) {
      e.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    // Honeypot — silently succeed (bot filled the hidden field)
    if (formData.website) { setIsSuccess(true); return; }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { website, ...submitData } = formData;
      const response = await api.post('/lead', { ...submitData, source });

      if (response.success) {
        setIsSuccess(true);
        onSuccess?.(response);
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'lead_submission', { source });
        }
      } else {
        throw new Error(response.error || 'Submission failed');
      }
    } catch (error) {
      setSubmitError(error.message || 'Could not submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setFormData(INITIAL);
    setErrors({});
    setIsSuccess(false);
    setSubmitError(null);
  };

  return { formData, errors, isSubmitting, isSuccess, submitError, handleChange, handleSubmit, reset };
}
