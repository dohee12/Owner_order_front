import { LoginRequest } from "@/entities/auth/api/type";
import { http, HttpResponse } from "msw";

// 더미 사용자 데이터
const User = [
  {
    id: "admin",
    password: "admin",
    storeName: "Tesla",
    storeId: "store-001",
    role: "admin",
  },
  {
    id: "manager",
    password: "manager",
    storeName: "ZeroStore",
    storeId: "store-002",
    role: "manager",
  },
  {
    id: "staff",
    password: "staff",
    storeName: "LeoShop",
    storeId: "store-003",
    role: "staff",
  },
];

// 로그인 API 핸들러
export const handlers = [
  http.post<never, LoginRequest>("/api/login", async ({ request }) => {
    const data = await request.json(); // JSON 응답의 타입을 명확히 지정

    // data가 null인 경우 처리
    if (!data) {
      return new HttpResponse(JSON.stringify({ error: "잘못된 요청입니다." }), {
        status: 400,
      });
    }

    const user = User.find((user) => user.id === data.id);

    // 아이디가 틀린 경우
    if (!user) {
      return new HttpResponse(
        JSON.stringify({ error: "아이디가 존재하지 않습니다." }),
        { status: 404 }
      );
    }

    // 비밀번호가 틀린 경우
    if (data.password !== user.password) {
      return new HttpResponse(
        JSON.stringify({ error: "비밀번호가 틀렸습니다." }),
        { status: 401 }
      );
    }

    // 로그인 성공 시
    return HttpResponse.json(
      {
        data: {
          id: user.id,
          storeName: user.storeName,
          storeId: user.storeId,
          role: user.role,
        },
        status: 200,
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie; HttpOnly; Path=/",
        },
      }
    );
  }),
];
