import { http, HttpResponse } from "msw";

// Option 인터페이스 정의
interface Option {
  id: number;
  name: string;
  price: number;
  required: boolean;
  storeId: number;
}

// in-memory 옵션 데이터 저장소
const options: Option[] = [
  { id: 1, name: "옵션 A", price: 100, required: false, storeId: 1 },
  { id: 2, name: "옵션 B", price: 200, required: true, storeId: 1 },
];

export const optionHandlers = [
  // GET /api/v1/owner/option/list
  http.get("/api/v1/owner/option/list", () => {
    return HttpResponse.json(options);
  }),

  // POST /api/v1/owner/option/add
  http.post("/api/v1/owner/option/add", async ({ request }: { request: Request }) => {
    // 요청 본문에서 새 옵션 정보를 받음
    const { name, price, required, storeId } = (await request.json()) as {
      name: string;
      price: number;
      required: boolean;
      storeId: number;
    };
    const newId = options.length ? Math.max(...options.map((o) => o.id)) + 1 : 1;
    const newOption: Option = { id: newId, name, price, required, storeId };
    options.push(newOption);
    return HttpResponse.json(
      { message: "옵션이 등록되었습니다.", option: newOption },
      { status: 201 }
    );
  }),

  // PUT /api/v1/owner/option/edit
  http.put("/api/v1/owner/option/edit", async ({ request }: { request: Request }) => {
    // 요청 본문에서 수정할 옵션 정보를 받음
    const { option_id, name, price, required } = (await request.json()) as {
      option_id: number;
      name: string;
      price: number;
      required: boolean;
    };
    const optionIndex = options.findIndex((o) => o.id === option_id);
    if (optionIndex === -1) {
      return new HttpResponse(JSON.stringify({ error: "옵션을 찾을 수 없습니다." }), {
        status: 404,
      });
    }
    options[optionIndex] = { ...options[optionIndex], name, price, required };
    return HttpResponse.json({ message: "옵션이 수정되었습니다.", option: options[optionIndex] });
  }),

  // DELETE /api/v1/owner/option/delete
  http.delete("/api/v1/owner/option/delete", ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const option_id = url.searchParams.get("option_id");
    if (!option_id) {
      return new HttpResponse(JSON.stringify({ error: "option_id parameter is required" }), {
        status: 400,
      });
    }
    const optionIndex = options.findIndex((o) => o.id === Number(option_id));
    if (optionIndex === -1) {
      return new HttpResponse(JSON.stringify({ error: "옵션을 찾을 수 없습니다." }), {
        status: 404,
      });
    }
    options.splice(optionIndex, 1);
    return HttpResponse.json({ message: "옵션이 삭제되었습니다." });
  }),
];
