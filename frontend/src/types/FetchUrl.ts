import type { AsyncThunk, AsyncThunkConfig } from '@reduxjs/toolkit'

export type FetchUrl<T> = AsyncThunk<
	{
		pageResult: T[];
		totalPages: number;
		totalValues: number;
		actualPage: number;
		limit: number;
	},
	{
		page?: number | undefined;
		limit?: number | undefined;
		filters?: string | undefined;
	} | undefined, AsyncThunkConfig
	>
