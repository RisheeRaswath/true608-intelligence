import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: 'I already use ServiceTitan/Jobber/ArionERP. Why do I need True608?',
    answer: 'General ERPs handle invoices, not Federal Liability. Mixing your financial data with your legal compliance logs is a risk. True608 provides a "clean" audit trail, keeping the government out of your accounting books. We are the specialized scalpel—not a Swiss Army knife.',
  },
  {
    question: 'Is my data safe?',
    answer: 'We use Bank-Level 256-bit AES encryption. Your records are stored for the mandatory 3-year retention period in our Federal-Grade Vault. All data is encrypted at rest and in transit, with SOC 2 Type II compliance.',
  },
  {
    question: 'What happens on January 1, 2026?',
    answer: 'The AIM Act expands significantly. Small systems under 15 lbs will require the same rigorous tracking as commercial units. Penalties increase and enforcement becomes mandatory. True608 is already programmed for this regulatory shift—protecting you before it happens.',
  },
  {
    question: 'How long does setup take?',
    answer: 'Under 5 minutes. Create an account, add your technicians, and start logging. No hardware required. No IT department needed. Your first compliance record can be created today.',
  },
  {
    question: 'What if I get audited?',
    answer: 'True608 generates audit-ready reports with a single click. All timestamps are cryptographically verified, all data is immutable, and your 3-year history is instantly accessible. Your auditor will have everything they need.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Common Questions
            </h2>
            <p className="text-muted-foreground">
              What HVAC contractors ask before securing their compliance
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
