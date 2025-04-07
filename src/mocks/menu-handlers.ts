import { http, HttpResponse } from "msw";

// in-memory 데이터 저장소
const menus = [
  {
    id: 1,
    menuName: "메뉴1",
    price: 1000,
    menuImg: "img1.png",
    storeId: 1,
    o_list: [{ id: 101, name: "옵션1", price: 100, required: true, storeId: 1 }],
  },
  {
    id: 2,
    menuName: "메뉴2",
    price: 2000,
    menuImg: "img2.png",
    storeId: 1,
    o_list: [{ id: 102, name: "옵션2", price: 200, required: false, storeId: 1 }],
  },
];

export const menuHandlers = [
  // GET /api/v1/owner/menuList
  http.get("/api/v1/owner/menuList", () => {
    return HttpResponse.json(menus);
  }),

  // GET /api/v1/owner/menu/detail
  http.get("/api/v1/owner/menu/detail", ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const menu_id = url.searchParams.get("menu_id");
    if (!menu_id) {
      return new HttpResponse(JSON.stringify({ error: "menu_id parameter is required" }), {
        status: 400,
      });
    }
    const menu = menus.find((m) => m.id === Number(menu_id));
    if (!menu) {
      return new HttpResponse(JSON.stringify({ error: "메뉴를 찾을 수 없습니다." }), {
        status: 404,
      });
    }
    return HttpResponse.json(menu);
  }),

  // POST /api/v1/owner/menu/create
  http.post("/api/v1/owner/menu/create", async ({ request }: { request: Request }) => {
    const { menu_name, price, opt_list } = await request.json();
    const newId = menus.length ? Math.max(...menus.map((m) => m.id)) + 1 : 1;
    const newMenu = {
      id: newId,
      menuName: menu_name,
      price,
      menuImg: "default.png", // 기본 이미지, 필요에 따라 변경 가능
      storeId: 1,
      o_list: opt_list || [],
    };
    menus.push(newMenu);
    return HttpResponse.json(
      { message: "메뉴가 정상적으로 추가되었습니다.", menu: newMenu },
      { status: 201 }
    );
  }),

  // PUT /api/v1/owner/menu/edit
  http.put("/api/v1/owner/menu/edit", async ({ request }: { request: Request }) => {
    const { menu_id, menu_name, price, opt_list } = await request.json();
    const menuIndex = menus.findIndex((m) => m.id === menu_id);
    if (menuIndex === -1) {
      return new HttpResponse(JSON.stringify({ error: "메뉴를 찾을 수 없습니다." }), {
        status: 404,
      });
    }
    menus[menuIndex] = {
      ...menus[menuIndex],
      menuName: menu_name,
      price,
      o_list: opt_list,
    };
    return HttpResponse.json({
      message: "메뉴가 정상적으로 수정되었습니다.",
      menu: menus[menuIndex],
    });
  }),

  // DELETE /api/v1/owner/menu/delete
  http.delete("/api/v1/owner/menu/delete", ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const menu_id = url.searchParams.get("menu_id");
    if (!menu_id) {
      return new HttpResponse(JSON.stringify({ error: "menu_id parameter is required" }), {
        status: 400,
      });
    }
    const menuIndex = menus.findIndex((m) => m.id === Number(menu_id));
    if (menuIndex === -1) {
      return new HttpResponse(JSON.stringify({ error: "메뉴를 찾을 수 없습니다." }), {
        status: 404,
      });
    }
    menus.splice(menuIndex, 1);
    return HttpResponse.json({ message: "메뉴가 정상적으로 삭제되었습니다." });
  }),

  // POST /api/v1/owner/menu/option/add
  http.post("/api/v1/owner/menu/option/add", async ({ request }: { request: Request }) => {
    const { menu_id, opt_list } = await request.json();
    const menu = menus.find((m) => m.id === menu_id);
    if (!menu) {
      return new HttpResponse(JSON.stringify({ error: "메뉴를 찾을 수 없습니다." }), {
        status: 404,
      });
    }
    // 기존 옵션 목록에 새 옵션을 추가합니다.
    menu.o_list = [...menu.o_list, ...opt_list];
    return HttpResponse.json({
      message: "메뉴에 옵션이 추가되었습니다.",
      menu,
    });
  }),

  // DELETE /api/v1/owner/menu/option/remove
  http.delete("/api/v1/owner/menu/option/remove", ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const menu_id = url.searchParams.get("menu_id");
    const option_id = url.searchParams.get("option_id");
    if (!menu_id || !option_id) {
      return new HttpResponse(
        JSON.stringify({ error: "menu_id and option_id parameters are required" }),
        { status: 400 }
      );
    }
    const menu = menus.find((m) => m.id === Number(menu_id));
    if (!menu) {
      return new HttpResponse(JSON.stringify({ error: "메뉴를 찾을 수 없습니다." }), {
        status: 404,
      });
    }
    const optionIndex = menu.o_list.findIndex((o) => o.id === Number(option_id));
    if (optionIndex === -1) {
      return new HttpResponse(JSON.stringify({ error: "옵션을 찾을 수 없습니다." }), {
        status: 404,
      });
    }
    menu.o_list.splice(optionIndex, 1);
    return HttpResponse.json({
      message: "메뉴에서 옵션이 제거되었습니다.",
      menu,
    });
  }),
];
