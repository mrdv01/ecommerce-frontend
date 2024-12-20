import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrandsAction, fetchBrandsAction } from "../../../redux/slices/categories/brandsSlice";



export default function BrandsList() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBrandsAction());
    }, [dispatch]);

    //get data from store
    const { brands: { brands } } = useSelector((state) => state?.brands);

    //delete brand handler
    const deleteBrandHandler = (id) => {
        dispatch(deleteBrandsAction(id));
        window.location.reload();
    };
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center"></div>

            <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
                All Brands[{brands?.length}]
            </h3>
            <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Brand Name
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                No. Products
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                Added By
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Created At
                            </th>


                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Delete
                            </th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {brands?.map((brand) => (
                            <tr key={brand?._id}>
                                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                                    {brand?.name}

                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                    {brand?.products?.length}
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                    {brand?.user?.fullname}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500">
                                    {new Date(brand?.createdAt).toLocaleDateString()}
                                </td>

                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                                    <button
                                        onClick={() => deleteBrandHandler(brand?._id)}
                                        className="text-indigo-600 hover:text-indigo-900">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}