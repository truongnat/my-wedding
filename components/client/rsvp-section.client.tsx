'use client';

import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Heart, Users } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { useRSVPMutation } from '@/hooks/use-rsvp-mutation';

// Zod validation schema
const rsvpSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  attending: z.enum(['yes', 'no']).refine((val) => val === 'yes' || val === 'no', {
    message: 'Please select if you will attend',
  }),
  guests: z.coerce.number().min(1).max(10, 'Maximum 10 guests allowed'),
  dietary_restrictions: z.string().max(500, 'Dietary restrictions too long').optional(),
  message: z.string().max(1000, 'Message is too long').optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

interface FormErrors {
  name?: string;
  email?: string;
  attending?: string;
  guests?: string;
  dietary_restrictions?: string;
  message?: string;
}

export function RSVPSection() {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    guests: 1,
    attending: undefined as any,
    dietary_restrictions: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useRSVPMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = rsvpSchema.safeParse(formData);

    if (!result.success) {
      // Convert Zod errors to form errors
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Submit to Supabase
    try {
      await mutation.mutateAsync({
        name: result.data.name,
        email: result.data.email,
        attending: result.data.attending === 'yes',
        guests: result.data.guests,
        dietary_restrictions: result.data.dietary_restrictions,
        message: result.data.message,
      });

      // Show success state
      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          guests: 1,
          attending: undefined as any,
          dietary_restrictions: '',
          message: '',
        });
      }, 5000);
    } catch (error) {
      // Error is already handled by the mutation hook with toast notification
      console.error('RSVP submission error:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  return (
    <section id="rsvp" className="py-20 bg-gradient-to-br from-rose-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
            RSVP
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please confirm your attendance by August 15th. We're excited to celebrate with you!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {!isSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-100"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.name}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.email}
                    </p>
                  )}
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="guests" className="block text-gray-700 mb-2 font-medium">
                    Number of Guests *
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.guests}
                    aria-describedby={errors.guests ? 'guests-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all ${
                      errors.guests ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7">7 Guests</option>
                    <option value="8">8 Guests</option>
                    <option value="9">9 Guests</option>
                    <option value="10">10 Guests</option>
                  </select>
                  {errors.guests && (
                    <p id="guests-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.guests}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="attending" className="block text-gray-700 mb-2 font-medium">
                    Will you attend? *
                  </label>
                  <select
                    id="attending"
                    name="attending"
                    value={formData.attending || ''}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.attending}
                    aria-describedby={errors.attending ? 'attending-error' : undefined}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all ${
                      errors.attending ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Please select</option>
                    <option value="yes">Yes, I'll be there! 🎉</option>
                    <option value="no">Sorry, can't make it 😢</option>
                  </select>
                  {errors.attending && (
                    <p id="attending-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.attending}
                    </p>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <label
                  htmlFor="dietary_restrictions"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Dietary Restrictions
                </label>
                <input
                  type="text"
                  id="dietary_restrictions"
                  name="dietary_restrictions"
                  value={formData.dietary_restrictions}
                  onChange={handleChange}
                  aria-invalid={!!errors.dietary_restrictions}
                  aria-describedby={errors.dietary_restrictions ? 'dietary-error' : undefined}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all ${
                    errors.dietary_restrictions ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Any dietary restrictions or allergies?"
                />
                {errors.dietary_restrictions && (
                  <p id="dietary-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.dietary_restrictions}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                  Special Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Leave us a message or song request!"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.message}
                  </p>
                )}
              </motion.div>

              <motion.button
                type="submit"
                disabled={mutation.isPending}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: mutation.isPending ? 1 : 1.02 }}
                whileTap={{ scale: mutation.isPending ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  mutation.isPending
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-rose-500 to-blue-500 hover:shadow-lg'
                } text-white`}
                aria-busy={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    Submit RSVP
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6 lg:p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl mb-2 text-green-800 font-semibold">Thank You!</h3>
              <p className="text-green-700">
                Your RSVP has been submitted successfully. We can't wait to celebrate with you!
              </p>
            </motion.div>
          )}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Users,
              number: '150',
              label: 'Invited Guests',
              color: 'from-rose-500 to-pink-500',
            },
            {
              icon: Calendar,
              number: '42',
              label: 'Days Until Wedding',
              color: 'from-blue-500 to-indigo-500',
            },
            {
              icon: Heart,
              number: '100%',
              label: 'Excitement Level',
              color: 'from-purple-500 to-pink-500',
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
              >
                <div
                  className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-bold">
                  {stat.number}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
