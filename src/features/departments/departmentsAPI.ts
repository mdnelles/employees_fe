import { apiPost } from "../../utilities/ApiRequest";

export function fetchDepartments(token: string) {
   return new Promise<{ data: number }>(async (resolve) =>
      resolve(await apiPost("/depman_list", { token }))
   );
}
