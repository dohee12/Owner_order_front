import { http, HttpResponse } from "msw";

// 메뉴 항목 타입 정의
interface MenuItem {
  id: string;
  name: string;
  price: number;
}

// 더미 메뉴 데이터
const menuItems: MenuItem[] = [
  { id: "item-001", name: "버거", price: 5000 },
  { id: "item-002", name: "피자", price: 8000 },
  { id: "item-003", name: "샐러드", price: 4000 },
];

// 메뉴 관련 API 핸들러
export const handlers = [
  // 메뉴 목록 조회
  http.get<never, never, { data: MenuItem[] }>("/api/menu", () => {
    return HttpResponse.json({ data: menuItems }, { status: 200 });
  }),

  // 메뉴 항목 추가
  http.post<never, MenuItem, { data: MenuItem }>(
    "/api/menu",
    async ({ request }) => {
      const newItem: MenuItem = await request.json();
      menuItems.push(newItem);
      return HttpResponse.json({ data: newItem }, { status: 201 });
    }
  ),

  // 메뉴 항목 수정
  http.put<
    { id: string },
    Partial<MenuItem>,
    { data?: MenuItem; error?: string }
  >("/api/menu/:id", async ({ request, params }) => {
    const updatedItem: Partial<MenuItem> = await request.json();
    const index = menuItems.findIndex((item) => item.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { error: "메뉴 항목을 찾을 수 없습니다." },
        { status: 404 }
      );
    }
    menuItems[index] = { ...menuItems[index], ...updatedItem };
    return HttpResponse.json({ data: menuItems[index] }, { status: 200 });
  }),

  // 메뉴 항목 삭제
  http.delete<{ id: string }, never, { message?: string; error?: string }>(
    "/api/menu/:id",
    ({ params }) => {
      const index = menuItems.findIndex((item) => item.id === params.id);
      if (index === -1) {
        return HttpResponse.json(
          { error: "메뉴 항목을 찾을 수 없습니다." },
          { status: 404 }
        );
      }
      menuItems.splice(index, 1);
      return HttpResponse.json(
        { message: "메뉴 항목이 삭제되었습니다." },
        { status: 200 }
      );
    }
  ),
];
