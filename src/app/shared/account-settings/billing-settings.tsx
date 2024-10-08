'use client';

import { useState } from 'react';
import { Button, Title, Text, RadioGroup, AdvancedRadio } from 'rizzui';
import cn from '@/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import {
  PiCheckCircleFill,
  PiDownloadSimpleBold,
  PiFire,
  PiLightning,
  PiPlusBold,
  PiStackSimple,
} from 'react-icons/pi';
import BillingHistoryTable from '@/app/shared/account-settings/billing-history/table';
// import AddBillingCardModalView from '@/app/shared/account-settings/modal/add-billing-card';
import MasterCardIcon from '@/components/icons/mastercard';
import VisaIcon from '@/components/icons/visa';
import ApplePayIcon from '@/components/icons/apple-pay';
import { billingHistoryData } from '@/data/billing-history';
import { exportToCSV } from '@/utils/export-to-csv';

const plansOptions = [
  {
    icon: <PiStackSimple className="h-4 w-4 text-gray-900" />,
    title: 'Basic plan $10/month',
    description:
      'Includes up to 10 users, 20GB individual data and access to all features.',
    value: 'basic',
  },
  {
    icon: <PiFire className="h-4 w-4 text-gray-900" />,
    title: 'Premium plan $20/month',
    description:
      'Includes up to 20 users, 40GB individual data and access to all features.',
    value: 'premium',
  },
  {
    icon: <PiLightning className="h-4 w-4 text-gray-900" />,
    title: 'Enterprise plan $40/month',
    description:
      'Unlimited users, unlimited individual data and access to all features.',
    value: 'enterprise',
  },
];


export default function BillingSettingsView() {
  function handleExportData() {
    exportToCSV(
      billingHistoryData,
      'Title,Amount,Date,Status,Shared',
      'billing_history'
    );
  }

  return (
    <>
      {/* <HorizontalFormBlockWrapper
        childrenWrapperClassName="gap-0 @lg:gap-0"
        title="Account Plans"
        titleClassName="text-xl font-semibold"
        description="Pick an account plan that fits your workflow."
      /> */}
      <HorizontalFormBlockWrapper
        title="Current Plan"
        description="We’ll credit your account if you need to downgrade during the billing cycle."
        descriptionClassName="max-w-md"
        childrenWrapperClassName="@3xl:grid-cols-1 max-w-5xl w-full"
      >
        <div>
          <CurrentPlans />
        </div>
      </HorizontalFormBlockWrapper>
      <div className="mt-8 xl:mt-10">
        <div className="mb-5 flex items-center justify-between">
          <Title as="h5" className="text-[17px] font-semibold">
            Billing History
          </Title>
          <Button onClick={() => handleExportData()}>
            <PiDownloadSimpleBold className="me-2 h-4 w-4" />
            Download
          </Button>
        </div>
        <BillingHistoryTable data={billingHistoryData} />
      </div>
    </>
  );
}

export function CurrentPlans() {
  const [currentPlan, setCurrentPlan] = useState('basic');

  return (
    <RadioGroup
      value={currentPlan}
      setValue={setCurrentPlan}
      className="flex flex-col gap-5"
    >
      {plansOptions.map((plan, index) => (
        <AdvancedRadio
          key={`plan-${index}`}
          name="current_plans"
          value={plan.value}
          onChange={() => setCurrentPlan(plan.value)}
          checked={plan.value === currentPlan}
          className="flex flex-col rounded-xl text-sm hover:cursor-pointer hover:border-primary"
          inputClassName="[&:checked~span_div>.icon]:block [&~span]:rounded-xl [&:checked~span]:ring-offset-0 [&~span:hover]:border-primary [&:checked~.rizzui-advanced-checkbox]:border-primary [&:checked~.rizzui-advanced-checkbox]:ring-primary [&:checked~.rizzui-advanced-checkbox]:ring-1"
        >
          <div className="flex items-center justify-between gap-3 px-1.5 py-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              {plan.icon}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <Title
                  as="h6"
                  className="mb-1 text-sm font-medium text-gray-900"
                >
                  {plan.title}
                </Title>
                <PiCheckCircleFill className="icon hidden h-6 w-6 flex-shrink-0 text-primary" />
              </div>
              <Text className="text-gray-500">{plan.description}</Text>
            </div>
          </div>
        </AdvancedRadio>
      ))}
    </RadioGroup>
  );
}
