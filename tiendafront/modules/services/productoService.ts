import { Product } from "../../modules/entity/product";
import { authorization, authorizationCreateProduct } from "./authorization/authorization";

const API_PRODUCT: String = "http://127.0.0.1:8080/api/v1/";

export const findProductPage = async (id: number): Promise<Response | undefined> => {

    try {
        let resonse: Response = await fetch(API_PRODUCT + "products/page/" + id, {
            method: "GET",
            headers: authorization()
        });

        return resonse;
    } catch (error) {

    }
}

export const findProduct = async (): Promise<Response | undefined> => {

    try {
        let resonse: Response = await fetch(API_PRODUCT + "products", {
            method: "GET",
            headers: authorization()
        });

        return resonse;
    } catch (error) {

    }
}

export const findProductIdApi = async (id: number): Promise<Response | undefined> => {

    try {
        let resonse: Response = await fetch(API_PRODUCT + "product/" + id, {
            method: "GET",
            headers: authorization()
        });
        return resonse;

    } catch (error) {

    }
}

export const createProducts = async (product: Product | any): Promise<Response | undefined> => {
    try {
        let resonse: Response = await fetch(API_PRODUCT + "product/c", {
            headers: authorizationCreateProduct(),
            method: "POST",
            body: product
        });
        return resonse;

    } catch (error) {

    }
}

export const updateProductId = async (id: number, product: JSON | any): Promise<Response | undefined> => {

    try {
        let resonse: Response = await fetch(API_PRODUCT + "product/u/" + id, {
            method: "PUT",
            headers: authorizationCreateProduct(),
            body: product
        });
        return resonse;

    } catch (error) {

    }
}
export const deleteProductId = async (id: number): Promise<Response | undefined> => {

    try {
        let resonse = await fetch(API_PRODUCT + "product/d/" + id, {
            method: "DELETE",
            headers: authorizationCreateProduct()
        });

        return resonse;

    } catch (error) {

    }
}

export const createImage = async (data: any): Promise<Response | undefined> => {

    try {
        let response = await fetch(API_PRODUCT + "product/upload", {
            method: "POST",
            headers: authorization(),
            body: data
        });
        return response;
    } catch (error) {

    }
}