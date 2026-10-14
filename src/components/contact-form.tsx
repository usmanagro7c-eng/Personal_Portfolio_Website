import { useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, CheckCircle2, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { contactSchema } from '@/lib/contact-schema';
import { submitEnquiry } from '@/lib/contact.functions';

export function ContactForm() {
  const send = useServerFn(submitEnquiry);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map(issue => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({}); setPending(true);
    try { await send({ data: parsed.data }); setSent(true); toast.success('Your message has been received.'); }
    catch { toast.error('Unable to save your message. Please try again or email me directly.'); }
    finally { setPending(false); }
  }
  if (sent) return <div className="form-success" role="status"><CheckCircle2 size={30} /><h3>Thank you for reaching out.</h3><p>Your enquiry has been received. I look forward to learning more about your project.</p><Button variant="outline" onClick={() => setSent(false)}>Send another message <ArrowUpRight /></Button></div>;
  function field(name: string, label: string, placeholder: string, max: number, type = 'text') {
    return <div className="field"><label htmlFor={`contact-${name}`}>{label}</label><input id={`contact-${name}`} name={name} type={type} placeholder={placeholder} maxLength={max} required aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} />{errors[name] && <span id={`${name}-error`} className="field-error">{errors[name]}</span>}</div>;
  }
  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="form-row">{field('name', 'Your name', 'Alex Johnson', 100)}{field('email', 'Email address', 'alex@company.com', 255, 'email')}</div>
    {field('subject', 'Subject', 'Let’s build something great', 150)}
    <div className="field"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" placeholder="Tell me a little about your project or opportunity…" maxLength={5000} minLength={10} required aria-invalid={!!errors['message']} aria-describedby={errors['message'] ? 'message-error' : undefined} />{errors['message'] && <span id="message-error" className="field-error">{errors['message']}</span>}</div>
    <div className="spam-trap" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <Button type="submit" className="submit-button" disabled={pending}>{pending ? <><Loader2 className="animate-spin" /> Sending…</> : <>Send message <Send /></>}</Button>
  </form>;
}