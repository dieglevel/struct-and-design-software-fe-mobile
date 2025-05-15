import { AxiosError } from "axios";
import { BaseResponse } from "@/types";

/**
 * Hàm dùng chung để gọi API an toàn, xử lý lỗi rõ ràng
 * @param apiCall - Hàm trả về `Promise<{ data: BaseResponse<T> }>`
 * @param fallbackEmptyData - Dữ liệu mặc định nếu xảy ra lỗi (thường là mảng rỗng hoặc null)
 */
export async function safeApiCall<T>(
	apiCall: () => Promise<{ data: BaseResponse<T> }>,
	fallbackEmptyData?: T,
): Promise<BaseResponse<T>> {
	try {
		const response = await apiCall();
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError<BaseResponse<null>>;

		if (axiosError.response && axiosError.response.status === 404) {
			return {
				message: "Không tìm thấy kết quả",
				data: fallbackEmptyData ?? (null as T),
				statusCode: 404,
				success: false,
			};
		}

		if (axiosError.response) {
			return {
				...axiosError.response.data,
				data: fallbackEmptyData ?? (null as T),
				success: false,
			};
		}

		return {
			message: "Không thể kết nối đến server",
			data: fallbackEmptyData ?? (null as T),
			statusCode: 500,
			success: false,
		};
	}
}
