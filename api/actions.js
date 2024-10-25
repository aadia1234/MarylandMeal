import { fetchAPI } from ".";

export function create(payload) {
    fetchAPI(endPoints.create, payload, "POST")
}