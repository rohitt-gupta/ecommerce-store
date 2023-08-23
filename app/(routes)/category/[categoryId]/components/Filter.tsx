"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
};

const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  /**
   * searchParams.get(valueKey) will return the key of the "valueKey" params.
for example your url is "localhost:8080/route1" and you have localhost:8080/route1?username=1234
now if you do searchParams.get(username) you will get "1234" as a string 
   */
  const selectedValue = searchParams.get(valueKey);
  /**
   * In this onlick function we are adding the id as query param , i.e
   * adding the "?sizeId={{id}}"" to the current existig url.
   * 
   * @param id id is the id of selected filter. if we selected "large" then id is id of large size from db
   */
  const onClick = (id: string) => {
    // first we get the current searchParams
    // that is a check to get if there are any searparams already or not
    // current is an object that contains all the previous key value pair of the search params
    // {
    //   hello: '1234',
    //     sizeId:
    //   '1f5744c6-44f3-4d99-894b-4d8e44f2e106'
    // }
    // here before clicking on different filter there is already hello and sizeId
    const current = qs.parse(searchParams.toString());

    // create a new query by adding our query to existing one
    const query = {
      ...current,
      [valueKey]: id
    };

    // check if we already have the same id, if yes then remove the existing one.
    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    // otherwise create new url by first getting what we currently have and then adding our query to it
    // skip null is for type safety that a null values doesnt go inthe query
    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, { skipNull: true });
    // now push the new url, i.e add the current url to the existing route
    router.push(url);
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">
        {name}
      </h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
                selectedValue === filter.id && 'bg-black text-white'
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;