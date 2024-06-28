import { dbInit } from '$lib/store/db-store';
export async function load({ browser }) {
  if (browser) {
    await dbInit();
  }
}
