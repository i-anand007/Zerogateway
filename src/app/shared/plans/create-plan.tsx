'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input, Button, ActionIcon, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { createPlanSchema, CreatePlanSchema } from '@/utils/validators/create-plan.schema';
import appwriteService from '@/app/appwrite';
import toast from 'react-hot-toast';
export default function CreatePlan() {
  const { closeModal } = useModal();
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [basePrice, setBasePrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  const handleBasePriceChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value;
    setBasePrice(value);
    calculateSellingPrice(value, discount);
  };

  const handleDiscountChange = (e: { target: { value: string; }; }) => {
    const value = e.target.value;
    setDiscount(value);
    calculateSellingPrice(basePrice, value);
  };

  const calculateSellingPrice = (basePrice: string, discount: string) => {
    const base = parseFloat(basePrice);
    const disc = parseFloat(discount);
    if (!isNaN(base) && !isNaN(disc)) {
      const calculatedPrice = base * (1 - disc / 100);
      const roundedPrice = Math.round(calculatedPrice);
      setSellingPrice(roundedPrice.toString());
    } else {
      setSellingPrice('');
    }
  };

  const onSubmit: SubmitHandler<CreatePlanSchema> = async (data) => {
    const FormattedData = {
      plan_name: data.plan_name,
      plan_base_price: Number(data.plan_base_price),
      plan_discount: Number(data.plan_discount),
      plan_price: Number(data.plan_price),
      payment_pages: Number(data.payment_pages),
      platform_fees: Number(data.platform_fees),
      validity: Number(data.validity),
    }

    setTimeout(async () => {

    console.log(FormattedData)
    setLoading(true);
    await appwriteService.createPlan(FormattedData)
    toast.success("Plan Created")
    setLoading(false);
    setReset({
      roleName: '',
      roleColor: '',
    });
    closeModal();
  }, 600);
  };

  return (
    <Form<CreatePlanSchema>
      resetValues={reset}
      onSubmit={onSubmit}
      validationSchema={createPlanSchema}
      className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
    >
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div className="col-span-full flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                Add a new Plan
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>


            <Input
              label="Plan Name"
              placeholder="Enter Plan name"
              {...register('plan_name')}
              className="col-span-full"
              error={errors.plan_name?.message}
            />

            <Input
              type="number"
              label="Base Price"
              placeholder="Enter user's Email Address"
              {...register('plan_base_price')}
              error={errors.plan_base_price?.message}
              value={basePrice}
              onChange={handleBasePriceChange}
            />

            <Input
              type="number"
              label="Discount %"
              placeholder="Enter Discount Amount"
              {...register('plan_discount')}
              error={errors.plan_discount?.message}
              value={discount}
              onChange={handleDiscountChange}
            />

            <Input
              type="number"
              className='placeholder-gray-500 placeholder-opacity-100 focus:placeholder-gray-40'
              label="Selling Price"
              placeholder={sellingPrice}
              {...register('plan_price')}
              error={errors.plan_price?.message}
            />

            <Input
              type="number"
              label="Payment Pages"
              placeholder="Payment Pages"
              {...register('payment_pages')}
              error={errors.payment_pages?.message}
            />

            <Input
              type="number"
              label="Platform Fees %"
              placeholder="Platform Fees"
              {...register('platform_fees')}
              error={errors.platform_fees?.message}
            />

            <Input
              type="number"
              label="Validity in Days"
              placeholder="Validity"
              {...register('validity')}
              error={errors.validity?.message}
            />

            <div className="col-span-full flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={closeModal}
                className="w-full @xl:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                Create Plan
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
