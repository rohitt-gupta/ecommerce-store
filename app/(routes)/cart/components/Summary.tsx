"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// import Button from "@/components/ui/button";
// import Currency from "@/components/ui/currency";
// import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/useCart";
import Currency from "@/components/ui/Currency";
import Button from "@/components/ui/Button";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  /**
   * this use effect runs whenever the searchParams changes
   * first check inthe url if tere are any query with success as a parameter, i.e , do we have "{url}?success=somerandomvalue"
   * if yes then payment is completed so clear the cart.
   * otherwise if searchparams is cancelled then something went wrong.
   */
  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);

  /**
   * onCheckout click we will call the api /checkout provided by the administrator and send the productIds to the api.
   * also the same api will return response and the response will have the url.
   * after this function we add the url to the search params and use effect will be 
   * called then the check will happen and accoring to that we will toast out the result.
   */
  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id)
    });

    window.location = response.data.url;
  }

  return (
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}

export default Summary;