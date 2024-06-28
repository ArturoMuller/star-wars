import { dbInit } from '$lib/store/db-store';
import { browser } from '$app/environment';

if (browser) {
  await dbInit();
}
