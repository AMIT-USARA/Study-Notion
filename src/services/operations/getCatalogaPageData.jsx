import React from 'react'
import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { catalogData } from '../api';

async function getCatalogaPageData(categoryId) {
    const toastId = toast.loading("Loading.....");
    let result = [];
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, { categoryId: categoryId });

       // console.log("CATALOG page DATA API response.....", response);



        if (!response?.data?.success) {
            throw new Error("Could not Fetch Category page data");
        }

        result = response?.data;
    }
    catch (error) {
       // console.log("CATALOG page DATA API ERROR.....", error);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}

export default getCatalogaPageData
