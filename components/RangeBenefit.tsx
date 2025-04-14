import { Accordion, AccordionItem } from '@heroui/react';
import { InfoIcon } from './icons';
import { PercentageBenefitTable } from './PercentageBenefitTable';

export const RangeBenefit = () => {
  return (
    <Accordion>
      <AccordionItem
        key="1"
        aria-label="Beneficio por plazo"
        classNames={{
          heading: 'max-w-md mx-auto',
        }}
        title={
          <p className="flex gap-1 items-center">
            Beneficio por plazo
            <InfoIcon className="text-warning" />
          </p>
        }
      >
        <PercentageBenefitTable />
      </AccordionItem>
    </Accordion>
  );
};
